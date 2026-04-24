import { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { calculateDailyTotals, calculateTargets } from '../services/nutritionCalc';

export const useNutrition = (date) => {
  const [meals, setMeals] = useState([]);
  const [water, setWater] = useState(0);
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [targets, setTargets] = useState(null);

  useEffect(() => {
    const loadedMeals = storage.getMeals(date);
    const loadedWater = storage.getWater(date);
    const profile = storage.getProfile();
    
    setMeals(loadedMeals);
    setWater(loadedWater);
    setTotals(calculateDailyTotals(loadedMeals));
    setTargets(calculateTargets(profile));
  }, [date]);

  const addMeal = (meal) => {
    const updatedMeals = storage.addMeal(date, meal);
    setMeals(updatedMeals);
    setTotals(calculateDailyTotals(updatedMeals));
  };

  const removeMeal = (mealId) => {
    const updatedMeals = storage.removeMeal(date, mealId);
    setMeals(updatedMeals);
    setTotals(calculateDailyTotals(updatedMeals));
  };

  const updateWater = (amount) => {
    const newWater = Math.max(0, water + amount);
    storage.setWater(date, newWater);
    setWater(newWater);
  };

  return { meals, water, totals, targets, addMeal, removeMeal, updateWater };
};
