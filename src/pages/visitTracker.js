// visitTracker.js
const STORAGE_KEY = "pageVisits";

// 🔹 Increment visit count for a given page
export const incrementVisit = (pageName) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  data[pageName] = (data[pageName] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 🔹 Get all page visit data
export const getVisitData = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  return Object.entries(data).map(([name, value]) => ({ name, value }));
};

// 🔹 Get total visits across all pages
export const getTotalVisits = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  return Object.values(data).reduce((sum, val) => sum + val, 0);
};
