import { useState, useEffect } from 'react';
import { storage } from '../services/storage';

export const useGoals = () => {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    setProfile(storage.getProfile());
  }, []);

  const saveProfile = (newProfile) => {
    storage.setProfile(newProfile);
    setProfile(newProfile);
  };

  return { profile, saveProfile };
};
