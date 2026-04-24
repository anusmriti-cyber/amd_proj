import { useState, useEffect, useCallback } from 'react';
import { storage } from '../services/storage';
import { BADGES, checkBadges } from '../data/badges';

export const useStreaks = (date) => {
  const [streak, setStreak] = useState({ count: 0, lastDate: null });
  const [badges, setBadges] = useState([]);
  const [newBadges, setNewBadges] = useState([]);

  useEffect(() => {
    setStreak(storage.getStreak());
    setBadges(storage.getBadges());
  }, []);

  // Use this function to check for new badges whenever data changes
  const evaluateBadges = useCallback((data) => {
    // If no data passed, we try to construct it from storage for global checks
    const checkData = data || {
      meals: storage.getMeals(date),
      water: storage.getWater(date),
      streak: streak.count,
      protein: 0, // Simplified for global check
      targetProtein: 100
    };

    const earned = checkBadges(checkData);
    const earnedIds = badges.map(b => b.id);
    const newlyEarned = earned.filter(b => !earnedIds.includes(b.id));
    
    if (newlyEarned.length > 0) {
      newlyEarned.forEach(b => storage.addBadge(b));
      setBadges(storage.getBadges());
      setNewBadges(newlyEarned);
      
      setTimeout(() => {
        setNewBadges([]);
      }, 5000);
    }
  }, [badges, date, streak.count]);

  const clearNewBadges = () => setNewBadges([]);

  return { streak, badges, newBadges, evaluateBadges, clearNewBadges };
};
