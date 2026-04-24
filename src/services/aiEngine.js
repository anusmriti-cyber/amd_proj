import { coachResponses, getFallbackResponse } from '../data/coachResponses';
import { getTimeOfDay } from '../utils/helpers';
import { calculateTargets, calculateDailyTotals } from './nutritionCalc';
import { storage } from './storage';

// Helper to inject variables into templates
const injectVariables = (template, data) => {
  let result = template;
  
  // Extract all {variable} patterns
  const matches = result.match(/\{([\w.]+)\}/g);
  if (!matches) return result;

  matches.forEach(match => {
    const path = match.slice(1, -1).split('.'); // Remove { and } and split by .
    let value = data;
    
    // Traverse object path
    for (const key of path) {
      if (value[key] !== undefined) {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }

    if (value !== null) {
      // Format numbers
      if (typeof value === 'number') {
        value = Math.round(value);
      }
      result = result.replace(match, value);
    }
  });

  return result;
};

// Generates a response from the coach based on current user context
export const generateCoachResponse = (promptType = 'general') => {
  const date = new Date().toISOString().split('T')[0];
  const profile = storage.getProfile();
  
  if (!profile) {
    return "Hi there! Please complete your onboarding first so I can give you personalized advice.";
  }

  const meals = storage.getMeals(date);
  const water = storage.getWater(date);
  const streak = storage.getStreak();
  const targets = calculateTargets(profile);
  const totals = calculateDailyTotals(meals);
  
  const contextData = {
    profile,
    timeOfDay: getTimeOfDay(),
    meals,
    water,
    streak,
    targets,
    totals,
    remainingCalories: targets.calories - totals.calories
  };

  // Find all matching conditions
  const validTriggers = coachResponses.filter(r => {
    try {
      return r.condition(contextData);
    } catch (e) {
      return false;
    }
  });

  if (validTriggers.length === 0) {
    return getFallbackResponse();
  }

  // Pick a random valid trigger (prioritize specific prompts if requested)
  // For simplicity, just pick a random one from valid ones
  const selectedTrigger = validTriggers[Math.floor(Math.random() * validTriggers.length)];
  
  // Pick a random response from the selected trigger
  const selectedResponse = selectedTrigger.responses[Math.floor(Math.random() * selectedTrigger.responses.length)];

  // Inject variables
  return injectVariables(selectedResponse, contextData);
};

// Analyzes a meal composed of multiple foods and generates a health score and suggestions
export const analyzeMeal = (foods) => {
  if (!foods || foods.length === 0) return null;

  let totalCals = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;

  foods.forEach(f => {
    totalCals += f.nutrition.calories;
    totalProtein += f.nutrition.protein;
    totalCarbs += f.nutrition.carbs;
    totalFat += f.nutrition.fat;
    totalFiber += f.nutrition.fiber;
  });

  // Calculate health score out of 10
  let score = 7; // Base score
  
  const strengths = [];
  const warnings = [];
  const suggestions = [];

  // Fiber check
  if (totalFiber > 5) {
    score += 1;
    strengths.push("Great source of dietary fiber! Good for digestion.");
  } else if (totalFiber < 1) {
    score -= 1;
    warnings.push("Very low in fiber.");
    suggestions.push("Try adding some vegetables or whole grains to boost fiber.");
  }

  // Protein check
  if (totalProtein > 20) {
    score += 1;
    strengths.push("High protein content! Excellent for muscle maintenance.");
  }

  // Calorie check (arbitrary thresholds for a single meal)
  if (totalCals > 800) {
    score -= 1;
    warnings.push("High calorie density for a single meal.");
  } else if (totalCals < 200) {
    warnings.push("Very low calories, might not keep you full for long.");
  }

  // Fat check
  if (totalFat > 30) {
    score -= 1;
    warnings.push("Quite high in fat.");
  }

  // Processed food check based on tags
  const isJunk = foods.some(f => f.tags.includes('junk food') || f.tags.includes('fast food'));
  if (isJunk) {
    score -= 2;
    warnings.push("Contains highly processed or fast food items.");
    suggestions.push("Try to balance this with whole foods in your next meal.");
  } else {
    strengths.push("Made up of whole, unprocessed foods.");
    score += 1;
  }

  score = Math.max(1, Math.min(10, score)); // Clamp 1-10

  return {
    score,
    nutrition: {
      calories: totalCals,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat
    },
    strengths,
    warnings,
    suggestions
  };
};
