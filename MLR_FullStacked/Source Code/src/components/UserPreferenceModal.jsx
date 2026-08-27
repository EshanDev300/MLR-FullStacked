import React, { useState, useEffect } from 'react';
import { X, User, Heart, Sparkles, Check, ChefHat } from 'lucide-react';
import { getUserPreferences, saveUserPreferences } from '../utils/db';
import { soundSynth } from '../utils/sound';

export const UserPreferenceModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('all');
  const [diet, setDiet] = useState('none');
  const [skill, setSkill] = useState('intermediate');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const prefs = getUserPreferences();
      setName(prefs.name || '');
      setCategory(prefs.category || 'all');
      setDiet(prefs.diet || 'none');
      setSkill(prefs.skill || 'intermediate');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleSave = (e) => {
    e.preventDefault();
    saveUserPreferences({ name, category, diet, skill });
    soundSynth.playClick();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-fadeIn overflow-y-auto overscroll-contain"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        className="relative w-full max-w-md glass-panel-glow border border-amber-500/40 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[92vh] overflow-y-auto custom-scrollbar overscroll-contain bg-[#140406]/98"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">User Preference Setup</h3>
              <p className="text-xs text-slate-400">Personalize your CookSmart experience</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              First Name / Chef Handle
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Preferred Recipe Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Categories</option>
              <option value="breakfast">Breakfast & Brunch</option>
              <option value="lunch">Power Lunch</option>
              <option value="dinner">Gourmet Dinner</option>
              <option value="snacks">Quick Snacks</option>
              <option value="desserts">Sweet Desserts</option>
              <option value="vegan">Vegan & Plant-Based</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Dietary Preference
            </label>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-500"
            >
              <option value="none">No Restrictions</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto / Low Carb</option>
              <option value="gluten-free">Gluten-Free</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Culinary Skill Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['beginner', 'intermediate', 'master'].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setSkill(lvl)}
                  className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    skill === lvl 
                      ? 'bg-amber-500 text-dark-900 shadow-md' 
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-dark-900 font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Preferences Saved!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Save Preferences</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
