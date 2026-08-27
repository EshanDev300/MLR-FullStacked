import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle, Sparkles, Image, ChefHat } from 'lucide-react';
import { addCustomRecipe } from '../utils/db';
import { soundSynth } from '../utils/sound';

export const AddRecipeModal = ({ isOpen, onClose, onRecipeAdded }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('dinner');
  const [cuisine, setCuisine] = useState('Home Cooking');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(25);
  const [servings, setServings] = useState(4);
  const [difficulty, setDifficulty] = useState('Medium');
  const [calories, setCalories] = useState(450);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const ingredients = ingredientsText
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const parts = line.split('-');
        return {
          name: parts[0] ? parts[0].trim() : line.trim(),
          amount: parts[1] ? parseFloat(parts[1]) || 1 : 1,
          unit: parts[2] ? parts[2].trim() : 'item'
        };
      });

    const instructions = instructionsText
      .split('\n')
      .filter(Boolean)
      .map((s) => s.trim());

    const newRecipe = {
      title,
      category,
      cuisine,
      prepTime: parseInt(prepTime) || 10,
      cookTime: parseInt(cookTime) || 20,
      totalTime: (parseInt(prepTime) || 10) + (parseInt(cookTime) || 20),
      servings: parseInt(servings) || 4,
      difficulty,
      calories: parseInt(calories) || 400,
      image: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
      description,
      ingredients,
      instructions,
      nutrition: { protein: '25g', carbs: '35g', fat: '15g', fiber: '5g' },
      tags: ['Custom Recipe', 'Home Crafted']
    };

    addCustomRecipe(newRecipe);
    soundSynth.playClick();
    setSubmitted(true);

    if (onRecipeAdded) onRecipeAdded(newRecipe);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn overflow-y-auto overscroll-contain"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        className="relative w-full max-w-2xl glass-panel-glow border border-amber-500/40 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[92vh] sm:max-h-[88vh] overflow-y-auto custom-scrollbar overscroll-contain bg-[#140406]/98"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Create Custom Recipe</h3>
              <p className="text-xs text-slate-400">Save your personal recipe into the CookSmart database</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Recipe Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Saffron Garlic Chicken"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
                <option value="desserts">Desserts</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Prep Mins</label>
              <input
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Cook Mins</label>
              <input
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Servings</label>
              <input
                type="number"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Cover Image URL (Optional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Short Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Brief mouth-watering description..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Ingredients (One per line: <span className="text-amber-400 font-mono">Ingredient - Amount - Unit</span>)
            </label>
            <textarea
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              rows={3}
              placeholder={`Chicken Breast - 2 - pieces\nGarlic Cloves - 4 - minced\nHeavy Cream - 1 - cup`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Instructions (One step per line)
            </label>
            <textarea
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
              rows={3}
              placeholder={`Season chicken with salt and pepper.\nSear in hot skillet for 5 mins per side.\nAdd garlic and cream, simmer until thick.`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-teal-500 text-dark-900 font-extrabold text-sm shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
          >
            {submitted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Recipe Saved Successfully!</span>
              </>
            ) : (
              <>
                <ChefHat className="w-5 h-5" />
                <span>Save Custom Recipe</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
