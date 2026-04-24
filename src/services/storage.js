const PREFIX = 'nutrivision_';

export const storage = {
  get(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch {}
  },
  remove(key) {
    localStorage.removeItem(PREFIX + key);
  },
  getProfile() { return this.get('profile'); },
  setProfile(p) { this.set('profile', p); },
  getMeals(date) { return this.get('meals_' + date) || []; },
  setMeals(date, meals) { this.set('meals_' + date, meals); },
  addMeal(date, meal) {
    const meals = this.getMeals(date);
    meals.push(meal);
    this.setMeals(date, meals);
    this.updateStreak(date);
    return meals;
  },
  removeMeal(date, mealId) {
    const meals = this.getMeals(date).filter(m => m.id !== mealId);
    this.setMeals(date, meals);
    return meals;
  },
  getWater(date) { return this.get('water_' + date) || 0; },
  setWater(date, count) { this.set('water_' + date, count); },
  getMoods(date) { return this.get('moods_' + date) || []; },
  addMood(date, mood) {
    const moods = this.getMoods(date);
    moods.push(mood);
    this.set('moods_' + date, moods);
    return moods;
  },
  getStreak() { return this.get('streak') || { count: 0, lastDate: null }; },
  updateStreak(date) {
    const s = this.getStreak();
    if (s.lastDate === date) return s;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];
    if (s.lastDate === yStr) {
      s.count += 1;
    } else if (s.lastDate !== date) {
      s.count = 1;
    }
    s.lastDate = date;
    this.set('streak', s);
    return s;
  },
  getBadges() { return this.get('badges') || []; },
  addBadge(badge) {
    const badges = this.getBadges();
    if (!badges.find(b => b.id === badge.id)) {
      badges.push({ ...badge, earnedAt: new Date().toISOString() });
      this.set('badges', badges);
    }
    return badges;
  },
  getChatHistory() { return this.get('chat_history') || []; },
  addChatMessage(msg) {
    const history = this.getChatHistory();
    history.push(msg);
    if (history.length > 50) history.shift();
    this.set('chat_history', history);
    return history;
  },
  clearChat() { this.set('chat_history', []); }
};
