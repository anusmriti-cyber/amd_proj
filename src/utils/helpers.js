export const formatDate = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

export const getToday = () => formatDate(new Date());

export const getDayName = (date = new Date()) => {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ date: formatDate(d), day: getDayName(d) });
  }
  return days;
};

export const getTimeOfDay = () => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
};

export const roundTo = (num, dec = 1) => Math.round(num * (10 ** dec)) / (10 ** dec);

export const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

export const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
