export const coachResponses = [
  {
    trigger: 'greeting_morning',
    condition: (data) => data.timeOfDay === 'morning',
    responses: [
      "Good morning! ☀️ Ready to crush your goals today?",
      "Rise and shine! Have you logged your breakfast yet?",
      "Morning! Let's make today a healthy one. Hydration first! 💧"
    ]
  },
  {
    trigger: 'greeting_afternoon',
    condition: (data) => data.timeOfDay === 'afternoon',
    responses: [
      "Good afternoon! How are your energy levels holding up?",
      "Afternoon check-in! Don't forget to grab a healthy snack if you're hungry.",
      "Hope your day is going well! Remember to stay hydrated."
    ]
  },
  {
    trigger: 'greeting_evening',
    condition: (data) => data.timeOfDay === 'evening',
    responses: [
      "Good evening! Time to wind down. How was your nutrition today?",
      "Evening! Have you logged your dinner?",
      "Almost time to rest. Great job tracking your meals today!"
    ]
  },
  {
    trigger: 'low_calories',
    condition: (data) => data.remainingCalories > 600 && data.timeOfDay === 'evening',
    responses: [
      "I noticed you have quite a few calories ({remainingCalories} cal) left for today. It's important to fuel your body enough, especially to maintain your metabolism! 🍎",
      "You're running a bit low on calories today. If you're hungry, a healthy evening snack like Greek yogurt or almonds would be great!"
    ]
  },
  {
    trigger: 'high_calories',
    condition: (data) => data.remainingCalories < 0,
    responses: [
      "Looks like you've gone slightly over your calorie goal today. Don't stress it! One day doesn't ruin progress. Let's get back on track tomorrow! 💪",
      "You're over your calorie target for today. It happens! Focus on hydration and getting a good night's sleep."
    ]
  },
  {
    trigger: 'low_protein',
    condition: (data) => data.totals.protein < (data.targets.protein * 0.7) && data.timeOfDay === 'evening',
    responses: [
      "You're a bit low on protein today ({totals.protein}g / {targets.protein}g). A protein shake, some cottage cheese, or eggs would help you hit your goal! 🍗",
      "Protein is crucial for recovery and muscle maintenance. Try to include a protein source in your next meal or snack!"
    ]
  },
  {
    trigger: 'good_progress',
    condition: (data) => data.remainingCalories >= 0 && data.totals.protein >= (data.targets.protein * 0.8),
    responses: [
      "You're doing fantastic today! Hitting your macros nicely and staying within your calorie budget. Keep it up! 🌟",
      "Great job today! Your nutrition is on point. Proud of you! 👏"
    ]
  },
  {
    trigger: 'low_water',
    condition: (data) => data.water < 4 && data.timeOfDay === 'afternoon',
    responses: [
      "Hydration check! 💧 You've only logged {water} glasses so far. Grab a glass of water right now!",
      "Don't forget to drink water! It helps with energy and digestion. Aim for 8 glasses a day."
    ]
  },
  {
    trigger: 'streak_active',
    condition: (data) => data.streak.count >= 3,
    responses: [
      "You're on a {streak.count}-day streak! 🔥 Consistency is the key to results. Keep this momentum going!",
      "Wow, a {streak.count}-day logging streak! You're building incredible habits. Keep tracking! 📈"
    ]
  }
];

export const getFallbackResponse = () => {
  const fallbacks = [
    "I'm here to help you hit your nutrition goals! Ask me for a snack suggestion or a progress update.",
    "Tracking your food is the best way to understand your habits. Keep logging!",
    "Remember that nutrition is about balance, not perfection. You're doing great! 🌿"
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
