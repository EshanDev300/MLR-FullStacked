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
  ShoppingBag,
  Copy,
  Check
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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings || 4);
      const favs = getFavouriteIds();
      setIsFav(favs.includes(recipe.id));
      setCheckedIngredients({});
      setActiveStep(0);
    }
  }, [recipe]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!recipe) return undefined;
    
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
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
    if (!plan.Monday) plan.Monday = {};
    plan.Monday.dinner = recipe.id;
    saveMealPlan(plan);
    setAddedToPlanner(true);
    soundSynth.playClick();
    setTimeout(() => setAddedToPlanner(false), 3000);
  };

  const handleAddToShoppingList = () => {
    const currentList = getShoppingList();
    const newItems = (recipe.ingredients || []).map((ing) => ({
      id: `${recipe.id}-${ing.name}-${Date.now()}`,
      recipeTitle: recipe.title,
      name: ing.name,
      amount: Math.round((ing.amount * multiplier) * 10) / 10,
      unit: ing.unit,
      checked: false
    }));

    const combined = [...newItems, ...currentList];
    saveShoppingList(combined);
    setAddedToShopping(true);
    soundSynth.playClick();
    setTimeout(() => setAddedToShopping(false), 3000);
  };

  const handleShare = async () => {
    const shareText = `Check out this recipe for ${recipe.title} on CookSmart!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: recipe.title, text: shareText, url: window.location.href });
      } catch (e) { /* user cancel */ }
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn overflow-y-auto overscroll-contain"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl glass-panel-glow border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] sm:max-h-[88vh] flex flex-col overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar */}
        <div className="relative h-44 sm:h-64 w-full overflow-hidden bg-dark-800 flex-shrink-0">
          <img
            src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80'}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140406] via-[#140406]/50 to-transparent" />

          {/* Close & Action Buttons */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center space-x-2 z-10">
            <button
              onClick={handleShare}
              title="Share Recipe"
              className="p-2.5 rounded-full bg-dark-900/80 text-white hover:text-amber-400 backdrop-blur-md transition-all border border-white/10"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleToggleFav}
              title="Toggle Favorite"
              className={`p-2.5 rounded-full backdrop-blur-md transition-all border border-white/10 ${
                isFav ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40' : 'bg-dark-900/80 text-white hover:text-rose-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              title="Close modal"
              className="p-2.5 rounded-full bg-dark-900/80 text-white hover:bg-rose-500 hover:text-white transition-all backdrop-blur-md border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Tag on Hero */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1.5 sm:space-y-2">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase bg-amber-500 text-dark-900">
                {recipe.category || 'Special'}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-rose-400">
                {recipe.cuisine || 'International'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-display leading-tight text-white line-clamp-2">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 overflow-y-auto custom-scrollbar flex-1 overscroll-contain bg-[#140406]/95">
          
          {/* Key Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="p-3 rounded-2xl glass-card flex items-center space-x-2.5 sm:space-x-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold truncate">Total Time</span>
                <span className="text-xs sm:text-sm font-black text-white">{recipe.totalTime || recipe.cookTime || 25} Mins</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl glass-card flex items-center space-x-2.5 sm:space-x-3">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 flex-shrink-0">
                <ChefHat className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold truncate">Difficulty</span>
                <span className="text-xs sm:text-sm font-black text-white">{recipe.difficulty || 'Easy-Medium'}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl glass-card flex items-center space-x-2.5 sm:space-x-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 flex-shrink-0">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-purple-400" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold truncate">Rating</span>
                <span className="text-xs sm:text-sm font-black text-white">{recipe.rating || 5.0} ★</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl glass-card flex items-center space-x-2.5 sm:space-x-3">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 flex-shrink-0">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold truncate">Calories</span>
                <span className="text-xs sm:text-sm font-black text-white">{recipe.calories || 420} kcal</span>
              </div>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl glass-panel border border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleAddToMealPlan}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-dark-900 font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{addedToPlanner ? '✓ Added to Monday' : 'Add to Plan'}</span>
              </button>

              <button
                onClick={handleAddToShoppingList}
                className="px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-rose-500/30 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{addedToShopping ? '✓ Added to Grocery' : 'Add to Checklist'}</span>
              </button>
            </div>

            {/* Serving Size Adjuster */}
            <div className="flex items-center space-x-2.5 bg-dark-900/80 px-3 py-1.5 rounded-xl border border-white/10">
              <span className="text-xs text-slate-400 font-medium">Servings:</span>
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                title="Decrease Servings"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs sm:text-sm font-extrabold text-amber-400 w-4 text-center">{servings}</span>
              <button
                onClick={() => setServings(servings + 1)}
                className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                title="Increase Servings"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Description & Tags */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-bold text-white font-display">About This Recipe</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {recipe.description}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {(recipe.tags || []).map((tag, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-white/5 border border-white/10 text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients & Instructions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Ingredients Checklist */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
                  <span className="text-amber-400">🥘</span>
                  <span>Ingredients</span>
                </h3>
                <span className="text-[10px] sm:text-xs text-slate-400">
                  Adjusted for {servings} servings
                </span>
              </div>

              <div className="space-y-2">
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
                      <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                          isChecked ? 'bg-rose-500 border-rose-500 text-dark-900' : 'border-white/20'
                        }`}>
                          {isChecked && <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                        </div>
                        <span className="text-xs font-medium text-slate-200 truncate">{ing.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400 flex-shrink-0">
                        {calculatedAmount} {ing.unit}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
                <span className="text-rose-400">🔪</span>
                <span>Cooking Steps</span>
              </h3>

              <div className="space-y-2.5">
                {(recipe.instructions || []).map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-3.5 sm:p-4 rounded-2xl glass-card border transition-all cursor-pointer ${
                      activeStep === idx 
                        ? 'border-amber-500/50 bg-amber-500/10 shadow-lg' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start space-x-2.5 sm:space-x-3">
                      <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-extrabold flex-shrink-0 ${
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
            <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                Nutritional Breakdown per Serving
              </h4>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5">
                  <span className="block text-[9px] sm:text-[10px] text-slate-400">Protein</span>
                  <span className="text-xs sm:text-sm font-bold text-rose-400">{recipe.nutrition.protein}</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5">
                  <span className="block text-[9px] sm:text-[10px] text-slate-400">Carbs</span>
                  <span className="text-xs sm:text-sm font-bold text-amber-400">{recipe.nutrition.carbs}</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5">
                  <span className="block text-[9px] sm:text-[10px] text-slate-400">Fat</span>
                  <span className="text-xs sm:text-sm font-bold text-rose-400">{recipe.nutrition.fat}</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5">
                  <span className="block text-[9px] sm:text-[10px] text-slate-400">Fiber</span>
                  <span className="text-xs sm:text-sm font-bold text-cyan-400">{recipe.nutrition.fiber}</span>
                </div>
              </div>
            </div>
          )}

          {(recipe.chefNotes || recipe.chefNote) && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-start space-x-2.5 sm:space-x-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-amber-400 mt-0.5" />
              <span>{recipe.chefNotes || recipe.chefNote}</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
