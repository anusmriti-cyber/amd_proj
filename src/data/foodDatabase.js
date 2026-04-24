export const foodDatabase = [
  // Fruits
  { id: 'f1', name: 'Apple', category: 'Fruits', emoji: '🍎', servingSize: 100, servingUnit: 'g', nutrition: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10.4 }, tags: ['fruit', 'healthy', 'snack', 'vegan'] },
  { id: 'f2', name: 'Banana', category: 'Fruits', emoji: '🍌', servingSize: 100, servingUnit: 'g', nutrition: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sugar: 12.2 }, tags: ['fruit', 'energy', 'snack', 'vegan'] },
  { id: 'f3', name: 'Blueberries', category: 'Fruits', emoji: '🫐', servingSize: 100, servingUnit: 'g', nutrition: { calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fiber: 2.4, sugar: 10 }, tags: ['fruit', 'antioxidants', 'snack', 'vegan'] },
  
  // Vegetables
  { id: 'v1', name: 'Broccoli', category: 'Vegetables', emoji: '🥦', servingSize: 100, servingUnit: 'g', nutrition: { calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fiber: 2.6, sugar: 1.7 }, tags: ['vegetable', 'healthy', 'vegan', 'keto'] },
  { id: 'v2', name: 'Spinach', category: 'Vegetables', emoji: '🥬', servingSize: 100, servingUnit: 'g', nutrition: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4 }, tags: ['vegetable', 'healthy', 'vegan', 'iron'] },
  { id: 'v3', name: 'Carrot', category: 'Vegetables', emoji: '🥕', servingSize: 100, servingUnit: 'g', nutrition: { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, sugar: 4.7 }, tags: ['vegetable', 'snack', 'vegan'] },

  // Protein
  { id: 'p1', name: 'Chicken Breast (Grilled)', category: 'Protein', emoji: '🍗', servingSize: 100, servingUnit: 'g', nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0 }, tags: ['meat', 'protein', 'low-carb', 'keto'] },
  { id: 'p2', name: 'Salmon (Baked)', category: 'Protein', emoji: '🐟', servingSize: 100, servingUnit: 'g', nutrition: { calories: 206, protein: 22, carbs: 0, fat: 13, fiber: 0, sugar: 0 }, tags: ['fish', 'protein', 'omega-3', 'keto'] },
  { id: 'p3', name: 'Eggs (Boiled)', category: 'Protein', emoji: '🥚', servingSize: 100, servingUnit: 'g', nutrition: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, sugar: 1.1 }, tags: ['egg', 'protein', 'breakfast', 'keto'] },
  { id: 'p4', name: 'Tofu (Firm)', category: 'Protein', emoji: '🧊', servingSize: 100, servingUnit: 'g', nutrition: { calories: 144, protein: 16, carbs: 2.8, fat: 8.7, fiber: 2.3, sugar: 0 }, tags: ['soy', 'protein', 'vegan', 'vegetarian'] },

  // Grains
  { id: 'g1', name: 'Brown Rice (Cooked)', category: 'Grains', emoji: '🍚', servingSize: 100, servingUnit: 'g', nutrition: { calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, sugar: 0.4 }, tags: ['grain', 'carbs', 'vegan'] },
  { id: 'g2', name: 'Oats (Rolled)', category: 'Grains', emoji: '🥣', servingSize: 100, servingUnit: 'g', nutrition: { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6, sugar: 0 }, tags: ['grain', 'breakfast', 'carbs', 'vegan'] },
  { id: 'g3', name: 'Whole Wheat Bread', category: 'Grains', emoji: '🍞', servingSize: 100, servingUnit: 'g', nutrition: { calories: 247, protein: 13, carbs: 41, fat: 3.4, fiber: 7, sugar: 6 }, tags: ['bread', 'carbs'] },

  // Dairy
  { id: 'd1', name: 'Whole Milk', category: 'Dairy', emoji: '🥛', servingSize: 100, servingUnit: 'ml', nutrition: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, sugar: 5.1 }, tags: ['dairy', 'calcium', 'beverage'] },
  { id: 'd2', name: 'Greek Yogurt (Plain)', category: 'Dairy', emoji: '🥣', servingSize: 100, servingUnit: 'g', nutrition: { calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, sugar: 3.2 }, tags: ['dairy', 'protein', 'breakfast'] },
  { id: 'd3', name: 'Cheddar Cheese', category: 'Dairy', emoji: '🧀', servingSize: 100, servingUnit: 'g', nutrition: { calories: 402, protein: 25, carbs: 1.3, fat: 33, fiber: 0, sugar: 0.5 }, tags: ['dairy', 'fat', 'keto'] },

  // Indian Food
  { id: 'i1', name: 'Roti / Chapati', category: 'Indian Food', emoji: '🫓', servingSize: 50, servingUnit: 'g', nutrition: { calories: 150, protein: 4.5, carbs: 28, fat: 2, fiber: 4, sugar: 0 }, tags: ['indian', 'bread', 'carbs', 'vegan'] },
  { id: 'i2', name: 'Dal Tadka', category: 'Indian Food', emoji: '🍲', servingSize: 150, servingUnit: 'g', nutrition: { calories: 180, protein: 9, carbs: 22, fat: 6, fiber: 7, sugar: 2 }, tags: ['indian', 'lentils', 'protein', 'vegetarian'] },
  { id: 'i3', name: 'Paneer Butter Masala', category: 'Indian Food', emoji: '🥘', servingSize: 200, servingUnit: 'g', nutrition: { calories: 450, protein: 14, carbs: 15, fat: 38, fiber: 3, sugar: 5 }, tags: ['indian', 'curry', 'vegetarian'] },

  // Snacks & Fast Food
  { id: 's1', name: 'Almonds', category: 'Snacks', emoji: '🥜', servingSize: 30, servingUnit: 'g', nutrition: { calories: 173, protein: 6, carbs: 6, fat: 15, fiber: 3.5, sugar: 1.2 }, tags: ['nuts', 'snack', 'healthy fats', 'vegan'] },
  { id: 's2', name: 'Potato Chips', category: 'Snacks', emoji: '🥔', servingSize: 50, servingUnit: 'g', nutrition: { calories: 268, protein: 3.5, carbs: 26, fat: 17, fiber: 1.5, sugar: 0.2 }, tags: ['snack', 'junk food', 'salty'] },
  { id: 's3', name: 'Pizza (Margherita)', category: 'Fast Food', emoji: '🍕', servingSize: 100, servingUnit: 'g', nutrition: { calories: 266, protein: 11, carbs: 33, fat: 10, fiber: 2.3, sugar: 3.6 }, tags: ['fast food', 'carbs', 'cheese'] },
];

export const foodCategories = Array.from(new Set(foodDatabase.map(f => f.category)));
