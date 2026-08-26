import React, { useState } from 'react';
import { Sparkles, Globe, ChefHat, Clock, Flame, CheckCircle, ArrowRight, RefreshCw, Send } from 'lucide-react';
import { generateAIRecipe, SUPPORTED_LANGUAGES } from '../utils/aiEngine';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import { TypingText } from '../components/FloatingAIWidget';

export const AIAgentPage = ({ onSelectRecipe }) => {
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [category, setCategory] = useState('dinner');
  const [diet, setDiet] = useState('none');
  const [maxTime, setMaxTime] = useState(30);
  const [language, setLanguage] = useState('en');

  const [loading, setLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);

  // Quick Preset Ingredient Suggestions
  const presets = [
    { label: '🍗 Chicken & Garlic', text: 'Chicken breast, garlic, olive oil, spinach, cream' },
    { label: '🥑 Avocado & Eggs', text: 'Avocado, sourdough bread, eggs, lemon, chili flakes' },
    { label: '🐟 Salmon & Herbs', text: 'Salmon fillet, dill, lemon, garlic, asparagus' },
    { label: '🌿 Vegan Tofu Bowl', text: 'Tofu, quinoa, chickpeas, cucumber, tahini' }
  ];

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!ingredientsInput.trim()) return;

    setLoading(true);
    setGeneratedRecipe(null);

    const recipe = await generateAIRecipe({
      ingredients: ingredientsInput,
      category,
      diet,
      maxTime,
      language
    });

    setGeneratedRecipe(recipe);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-extrabold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>Multilingual AI Culinary Agent</span>
        </div>
        <h1 className="text-4xl font-black font-display text-white">
          Smart AI Recipe Creator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Select your language and type ingredients available in your kitchen. The AI Chef will create a unique, structured recipe tailored to your preferences!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CONTROL FORM */}
        <div className="lg:col-span-5 glass-panel-glow border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          
          <form onSubmit={handleGenerate} className="space-y-5">
            
            {/* Language Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>AI Language / اللغة / Idioma</span>
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/15 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.code.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {/* Ingredients Text Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Available Home Ingredients
              </label>
              <textarea
                value={ingredientsInput}
                onChange={(e) => setIngredientsInput(e.target.value)}
                rows={3}
                placeholder="e.g., chicken breast, garlic, spinach, heavy cream, parmesan..."
                className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Quick Ingredient Combos</span>
              <div className="flex flex-wrap gap-2">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setIngredientsInput(p.text)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category & Diet Selectors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Meal Type</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snacks">Snack</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Dietary Need</label>
                <select
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white"
                >
                  <option value="none">Standard</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="gluten-free">Gluten-Free</option>
                </select>
              </div>
            </div>

            {/* Max Cook Time Slider */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400 mb-1">
                <span>Max Preparation Time</span>
                <span className="text-amber-400">{maxTime} Mins</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={maxTime}
                onChange={(e) => setMaxTime(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-dark-900 font-black text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>AI Chef is Formulating Recipe...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Custom AI Recipe</span>
                </>
              )}
            </button>

          </form>

        </div>

        {/* RIGHT COLUMN: GENERATED OUTPUT DISPLAY */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="p-12 text-center glass-panel rounded-3xl border border-amber-500/30 space-y-4 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <ChefHat className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Crafting Your Recipe...</h3>
              <p className="text-xs text-slate-400">
                Analyzing flavor matrix, cooking times, and translating instructions into your selected language.
              </p>
            </div>
          ) : generatedRecipe ? (
            <div className="p-8 rounded-3xl glass-panel-glow border border-amber-500/40 space-y-6 shadow-2xl animate-fadeIn">
              
              {/* Output Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500 text-dark-900">
                    AI Generated Recipe
                  </span>
                  <span className="text-xs font-bold text-rose-400">
                    {generatedRecipe.category}
                  </span>
                </div>
                <button
                  onClick={() => onSelectRecipe(generatedRecipe)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                >
                  Open Full View ➔
                </button>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                  <TypingText text={generatedRecipe.title} />
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <TypingText text={generatedRecipe.description} />
                </p>
              </div>

              {/* Ingredients List */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  Calculated Ingredients
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {generatedRecipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="p-3 rounded-xl glass-card flex items-center justify-between text-xs">
                      <span className="text-slate-200">{ing.name}</span>
                      <span className="font-bold text-amber-400">{ing.amount} {ing.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">
                  Step-by-Step Guidance
                </h3>
                <div className="space-y-2.5">
                  {generatedRecipe.instructions.map((step, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl glass-card text-xs text-slate-200 flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chef Notes */}
              {generatedRecipe.chefNotes && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed">
                  💡 {generatedRecipe.chefNotes}
                </div>
              )}

            </div>
          ) : (
            <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 text-slate-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Ready for Your Ingredients</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Type what you have in your fridge or pantry on the left panel to generate a custom recipe.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
