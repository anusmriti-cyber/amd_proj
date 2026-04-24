import { useState, useEffect } from 'react';
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
  const evaluateBadges = (data) => {
    const earned = checkBadges(data);
    const earnedIds = badges.map(b => b.id);
    const newlyEarned = earned.filter(b => !earnedIds.includes(b.id));
    
    if (newlyEarned.length > 0) {
      newlyEarned.forEach(b => storage.addBadge(b));
      setBadges(storage.getBadges());
      setNewBadges(newlyEarned);
      
      // Auto-clear new badges notification after 5 seconds
      setTimeout(() => {
        setNewBadges([]);
      }, 5000);
    }
  };

  const clearNewBadges = () => setNewBadges([]);

  return { streak, badges, newBadges, evaluateBadges, clearNewBadges };
};
