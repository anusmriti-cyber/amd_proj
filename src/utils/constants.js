export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9
};

export const GOAL_ADJUSTMENTS = {
  lose: -500,
  maintain: 0,
  gain: 300
};

export const MACRO_SPLITS = {
  lose: { protein: 0.40, carbs: 0.30, fat: 0.30 },
  maintain: { protein: 0.30, carbs: 0.40, fat: 0.30 },
  gain: { protein: 0.35, carbs: 0.45, fat: 0.20 }
};

export const CALORIES_PER_GRAM = { protein: 4, carbs: 4, fat: 9 };

export const WATER_GOAL = 8;

export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export const MOODS = [
  { emoji: '😊', label: 'Great', value: 5 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '😴', label: 'Tired', value: 2 },
  { emoji: '😤', label: 'Stressed', value: 1 }
];

export const DIETARY_PREFS = ['None', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Gluten-Free'];
