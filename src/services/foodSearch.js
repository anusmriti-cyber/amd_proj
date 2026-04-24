import { foodDatabase } from '../data/foodDatabase';

export const searchFoods = (query) => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase().trim();
  
  return foodDatabase
    .map(food => {
      let score = 0;
      const lowerName = food.name.toLowerCase();
      
      // Exact match gets highest score
      if (lowerName === lowerQuery) score += 100;
      // Starts with gets high score
      else if (lowerName.startsWith(lowerQuery)) score += 50;
      // Contains gets medium score
      else if (lowerName.includes(lowerQuery)) score += 20;
      
      // Tag match
      if (food.tags.some(tag => tag.toLowerCase() === lowerQuery)) score += 30;
      
      // Category match
      if (food.category.toLowerCase().includes(lowerQuery)) score += 10;
      
      return { ...food, score };
    })
    .filter(food => food.score > 0)
    .sort((a, b) => b.score - a.score);
};

export const getFoodsByCategory = (category) => {
  if (category === 'All') return foodDatabase;
  return foodDatabase.filter(food => food.category === category);
};

export const getFoodById = (id) => {
  return foodDatabase.find(food => food.id === id);
};
