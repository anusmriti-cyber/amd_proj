import { ACTIVITY_MULTIPLIERS, GOAL_ADJUSTMENTS, MACRO_SPLITS } from '../utils/constants';

export const calculateTargets = (profile) => {
  if (!profile || !profile.weight || !profile.height || !profile.age) return null;

  // Mifflin-St Jeor Equation
  let bmr;
  if (profile.gender === 'male') {
    bmr = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) + 5;
  } else {
    bmr = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) - 161;
  }

  const activityMultiplier = ACTIVITY_MULTIPLIERS[profile.activityLevel] || 1.2;
  const tdee = bmr * activityMultiplier;
  
  const goalAdjustment = GOAL_ADJUSTMENTS[profile.goal] || 0;
  const targetCalories = Math.round(tdee + goalAdjustment);

  const splits = MACRO_SPLITS[profile.goal] || MACRO_SPLITS.maintain;
  
  // Convert calories to grams (Protein: 4 cal/g, Carbs: 4 cal/g, Fat: 9 cal/g)
  const targetProtein = Math.round((targetCalories * splits.protein) / 4);
  const targetCarbs = Math.round((targetCalories * splits.carbs) / 4);
  const targetFat = Math.round((targetCalories * splits.fat) / 9);

  return {
    calories: targetCalories,
    protein: targetProtein,
    carbs: targetCarbs,
    fat: targetFat
  };
};

export const calculateMealNutrition = (food, portionMultiplier = 1) => {
  const n = food.nutrition;
  return {
    calories: Math.round(n.calories * portionMultiplier),
    protein: Math.round(n.protein * portionMultiplier * 10) / 10,
    carbs: Math.round(n.carbs * portionMultiplier * 10) / 10,
    fat: Math.round(n.fat * portionMultiplier * 10) / 10,
    fiber: Math.round(n.fiber * portionMultiplier * 10) / 10,
    sugar: Math.round(n.sugar * portionMultiplier * 10) / 10,
  };
};

export const calculateDailyTotals = (meals) => {
  return meals.reduce((acc, meal) => {
    return {
      calories: acc.calories + meal.nutrition.calories,
      protein: acc.protein + meal.nutrition.protein,
      carbs: acc.carbs + meal.nutrition.carbs,
      fat: acc.fat + meal.nutrition.fat,
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
};
