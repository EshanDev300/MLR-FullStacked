import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Star, 
  Users, 
  Flame, 
  Heart, 
  Play, 
  CheckCircle, 
  Plus, 
  Minus, 
  Calendar, 
  Share2, 
  Printer, 
  ChefHat,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { toggleFavourite, getFavouriteIds, getMealPlan, saveMealPlan, getShoppingList, saveShoppingList } from '../utils/db';
import { soundSynth } from '../utils/sound';

export const RecipeDetailModal = ({ recipe, onClose, onOpenPlanner }) => {
  const [servings, setServings] = useState(recipe?.servings || 4);
  const [isFav, setIsFav] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [addedToPlanner, setAddedToPlanner] = useState(false);
  const [addedToShopping, setAddedToShopping] = useState(false);

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings || 4);
      const favs = getFavouriteIds();
      setIsFav(favs.includes(recipe.id));
    }
  }, [recipe]);

  useEffect(() => {
    if (!recipe) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, recipe]);

  if (!recipe) return null;

  const multiplier = servings / (recipe.servings || 4);

  const handleToggleFav = () => {
    const state = toggleFavourite(recipe.id);
    setIsFav(state);
    soundSynth.playClick();
  };

  const toggleIngredientCheck = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
    soundSynth.playClick();
  };

  const handleAddToMealPlan = () => {
    const plan = getMealPlan();
    plan.Monday.dinner = recipe.id; // Assign to Monday dinner for quick plan add
    saveMealPlan(plan);
    setAddedToPlanner(true);
    soundSynth.playClick();
    setTimeout(() => setAddedToPlanner(false), 3000);
  };

  const handleAddToShoppingList = () => {
    const currentList = getShoppingList();
    const newItems = (recipe.ingredients || []).map((ing) => ({
      id: `${recipe.id}-${ing.name}`,
      recipeTitle: recipe.title,
      name: ing.name,
      amount: Math.round((ing.amount * multiplier) * 10) / 10,
      unit: ing.unit,
      checked: false
    }));

    const combined = [...currentList, ...newItems];
    saveShoppingList(combined);
    setAddedToShopping(true);
    soundSynth.playClick();
    setTimeout(() => setAddedToShopping(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto bg-dark-900/85 backdrop-blur-xl animate-fadeIn">
      
      <div className="relative w-full max-w-4xl glass-panel-glow border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[90vh] flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-dark-800 flex-shrink-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

          {/* Close & Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
            <button
              onClick={handleToggleFav}
              className={`p-3 rounded-full backdrop-blur-md transition-all ${
                isFav ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40' : 'bg-dark-900/80 text-white hover:text-rose-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-dark-900/80 text-white hover:bg-rose-500 hover:text-white transition-all backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Tag on Hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500 text-dark-900">
                {recipe.category}
              </span>
              <span className="text-xs font-semibold text-rose-400">
                {recipe.cuisine || 'International'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-display leading-tight text-white">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Key Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl glass-card flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase font-bold">Total Time</span>
                <span className="text-sm font-black text-white">{recipe.totalTime || recipe.cookTime} Mins</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-card flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase font-bold">Difficulty</span>
                <span className="text-sm font-black text-white">{recipe.difficulty}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-card flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <Star className="w-5 h-5 fill-current text-purple-400" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase font-bold">Rating</span>
                <span className="text-sm font-black text-white">{recipe.rating} ★</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-card flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase font-bold">Calories</span>
                <span className="text-sm font-black text-white">{recipe.calories} kcal</span>
              </div>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-white/10">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddToMealPlan}
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-dark-900 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>{addedToPlanner ? '✓ Added to Monday' : 'Add to Meal Plan'}</span>
              </button>

              <button
                onClick={handleAddToShoppingList}
                className="px-4 py-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center space-x-2 hover:bg-rose-500/30 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedToShopping ? '✓ Added to Grocery' : 'Add to Grocery List'}</span>
              </button>
            </div>

            {/* Serving Size Adjuster */}
            <div className="flex items-center space-x-3 bg-dark-900/80 px-3 py-1.5 rounded-xl border border-white/10">
              <span className="text-xs text-slate-400 font-medium">Servings:</span>
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-extrabold text-amber-400 w-4 text-center">{servings}</span>
              <button
                onClick={() => setServings(servings + 1)}
                className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description & Tags */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white font-display">About This Recipe</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {recipe.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {(recipe.tags || []).map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients & Instructions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Ingredients Checklist */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
                  <span className="text-amber-400">🥘</span>
                  <span>Ingredients</span>
                </h3>
                <span className="text-xs text-slate-400">
                  Adjusted for {servings} servings
                </span>
              </div>

              <div className="space-y-2.5">
                {(recipe.ingredients || []).map((ing, idx) => {
                  const calculatedAmount = Math.round((ing.amount * multiplier) * 10) / 10;
                  const isChecked = checkedIngredients[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredientCheck(idx)}
                      className={`p-3 rounded-xl glass-card flex items-center justify-between cursor-pointer transition-all ${
                        isChecked ? 'opacity-50 line-through border-rose-500/30' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-rose-500 border-rose-500 text-dark-900' : 'border-white/20'
                        }`}>
                          {isChecked && <CheckCircle className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs font-medium text-slate-200">{ing.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400">
                        {calculatedAmount} {ing.unit}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
                <span className="text-rose-400">🔪</span>
                <span>Cooking Steps</span>
              </h3>

              <div className="space-y-3">
                {(recipe.instructions || []).map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 rounded-2xl glass-card border transition-all cursor-pointer ${
                      activeStep === idx 
                        ? 'border-amber-500/50 bg-amber-500/10 shadow-lg' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0 ${
                        activeStep === idx ? 'bg-amber-500 text-dark-900' : 'bg-white/10 text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Nutritional Breakdown & Chef Notes */}
          {recipe.nutrition && (
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Nutritional Breakdown per Serving
              </h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-2.5 rounded-xl bg-white/5">
                  <span className="block text-[10px] text-slate-400">Protein</span>
                  <span className="text-sm font-bold text-rose-400">{recipe.nutrition.protein}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5">
                  <span className="block text-[10px] text-slate-400">Carbs</span>
                  <span className="text-sm font-bold text-amber-400">{recipe.nutrition.carbs}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5">
                  <span className="block text-[10px] text-slate-400">Fat</span>
                  <span className="text-sm font-bold text-rose-400">{recipe.nutrition.fat}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5">
                  <span className="block text-[10px] text-slate-400">Fiber</span>
                  <span className="text-sm font-bold text-cyan-400">{recipe.nutrition.fiber}</span>
                </div>
              </div>
            </div>
          )}

          {recipe.chefNotes && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-start space-x-3">
              <Sparkles className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
              <span>{recipe.chefNotes}</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
