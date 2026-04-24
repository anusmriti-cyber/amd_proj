export const BADGES = {
  first_log: { id: 'first_log', title: 'First Bite', description: 'Logged your very first meal', icon: '🍽️' },
  water_goal: { id: 'water_goal', title: 'Hydration Hero', description: 'Reached your daily water goal', icon: '💧' },
  streak_3: { id: 'streak_3', title: 'On Fire', description: 'Maintained a 3-day logging streak', icon: '🔥' },
  streak_7: { id: 'streak_7', title: 'Week Warrior', description: 'Maintained a 7-day logging streak', icon: '🏆' },
  protein_king: { id: 'protein_king', title: 'Protein King', description: 'Hit your protein target', icon: '💪' },
  analyzer: { id: 'analyzer', title: 'Analyzer Pro', description: 'Used the AI meal analyzer', icon: '🔬' }
};

export const checkBadges = (data) => {
  const earned = [];
  
  if (data.meals.length > 0) earned.push(BADGES.first_log);
  if (data.water >= 8) earned.push(BADGES.water_goal);
  if (data.streak >= 3) earned.push(BADGES.streak_3);
  if (data.streak >= 7) earned.push(BADGES.streak_7);
  if (data.protein >= data.targetProtein) earned.push(BADGES.protein_king);

  return earned;
};
