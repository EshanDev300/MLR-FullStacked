import recipesData from '../data/recipes.json';
import categoriesData from '../data/categories.json';
import tipsData from '../data/tips.json';
import quizData from '../data/quiz.json';

const STORAGE_KEYS = {
  PREFERENCES: 'cooksmart_user_prefs',
  FAVOURITES: 'cooksmart_fav_recipes',
  MEAL_PLANNER: 'cooksmart_meal_plan',
  CUSTOM_RECIPES: 'cooksmart_custom_recipes',
  SHOPPING_LIST: 'cooksmart_shopping_list',
  FEEDBACK: 'cooksmart_feedback_logs',
  QUIZ_SCORE: 'cooksmart_quiz_score'
};

export const getInitialRecipes = () => {
  const custom = getCustomRecipes();
  return [...recipesData, ...custom];
};

export const getInitialCategories = () => categoriesData;
export const getInitialTips = () => tipsData;
export const getInitialQuiz = () => quizData;

// --- USER PREFERENCES ---
export const getUserPreferences = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
  return data ? JSON.parse(data) : { name: '', category: 'all', diet: 'none', skill: 'intermediate' };
};

export const saveUserPreferences = (prefs) => {
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  window.dispatchEvent(new Event('cooksmart_prefs_changed'));
};

// --- FAVOURITES ---
export const getFavouriteIds = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FAVOURITES);
  return data ? JSON.parse(data) : ['recipe-1', 'recipe-3'];
};

export const toggleFavourite = (recipeId) => {
  const favs = getFavouriteIds();
  const index = favs.indexOf(recipeId);
  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push(recipeId);
  }
  localStorage.setItem(STORAGE_KEYS.FAVOURITES, JSON.stringify(favs));
  window.dispatchEvent(new Event('cooksmart_favs_changed'));
  return favs.includes(recipeId);
};

// --- MEAL PLANNER ---
export const getMealPlan = () => {
  const data = localStorage.getItem(STORAGE_KEYS.MEAL_PLANNER);
  if (data) return JSON.parse(data);
  return {
    Monday: { breakfast: 'recipe-2', lunch: 'recipe-3', dinner: 'recipe-1' },
    Tuesday: { breakfast: 'recipe-4', lunch: null, dinner: 'recipe-5' },
    Wednesday: { breakfast: null, lunch: 'recipe-3', dinner: null },
    Thursday: { breakfast: 'recipe-2', lunch: null, dinner: 'recipe-1' },
    Friday: { breakfast: null, lunch: 'recipe-3', dinner: 'recipe-5' },
    Saturday: { breakfast: 'recipe-4', lunch: null, dinner: 'recipe-6' },
    Sunday: { breakfast: 'recipe-2', lunch: 'recipe-3', dinner: 'recipe-1' }
  };
};

export const saveMealPlan = (plan) => {
  localStorage.setItem(STORAGE_KEYS.MEAL_PLANNER, JSON.stringify(plan));
  window.dispatchEvent(new Event('cooksmart_plan_changed'));
};

// --- SHOPPING LIST ---
export const getShoppingList = () => {
  const data = localStorage.getItem(STORAGE_KEYS.SHOPPING_LIST);
  return data ? JSON.parse(data) : [];
};

export const saveShoppingList = (list) => {
  localStorage.setItem(STORAGE_KEYS.SHOPPING_LIST, JSON.stringify(list));
  window.dispatchEvent(new Event('cooksmart_shopping_changed'));
};

// --- CUSTOM RECIPES ---
export const getCustomRecipes = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_RECIPES);
  return data ? JSON.parse(data) : [];
};

export const addCustomRecipe = (recipe) => {
  const existing = getCustomRecipes();
  const newRecipe = {
    ...recipe,
    id: `custom-${Date.now()}`,
    rating: 5.0,
    reviewsCount: 1,
    featured: false,
    popular: true
  };
  const updated = [newRecipe, ...existing];
  localStorage.setItem(STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(updated));
  window.dispatchEvent(new Event('cooksmart_recipes_changed'));
  return newRecipe;
};

// --- FEEDBACK ---
export const saveFeedback = (feedbackItem) => {
  const data = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
  const logs = data ? JSON.parse(data) : [];
  logs.push({ ...feedbackItem, timestamp: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(logs));
};

// --- QUIZ SCORES ---
export const getQuizScore = () => {
  const data = localStorage.getItem(STORAGE_KEYS.QUIZ_SCORE);
  return data ? JSON.parse(data) : { highestScore: 0, badges: [] };
};

export const saveQuizScore = (score, badge) => {
  const current = getQuizScore();
  const newHigh = Math.max(current.highestScore, score);
  const newBadges = new Set([...(current.badges || []), ...(badge ? [badge] : [])]);
  const updated = { highestScore: newHigh, badges: Array.from(newBadges) };
  localStorage.setItem(STORAGE_KEYS.QUIZ_SCORE, JSON.stringify(updated));
  return updated;
};
