import React, { useState, useEffect } from 'react';
import { Heart, Download, Trash2, BookOpen } from 'lucide-react';
import { getFavouriteIds } from '../utils/db';
import { RecipeCard } from '../components/RecipeCard';

export const FavouritesPage = ({ recipes, onSelectRecipe, setActiveTab }) => {
  const [favRecipes, setFavRecipes] = useState([]);

  const loadFavs = () => {
    const ids = getFavouriteIds();
    const filtered = recipes.filter((r) => ids.includes(r.id));
    setFavRecipes(filtered);
  };

  useEffect(() => {
    loadFavs();
    window.addEventListener('cooksmart_favs_changed', loadFavs);
    return () => window.removeEventListener('cooksmart_favs_changed', loadFavs);
  }, [recipes]);

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favRecipes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "CookSmart_Favorite_Recipes.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-4 h-4 fill-current" />
            <span>Personal Recipe Box</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
            Saved Favorite Recipes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Access your bookmarked recipes anytime. Persisted locally in your browser database.
          </p>
        </div>

        {favRecipes.length > 0 && (
          <button
            onClick={handleExportJSON}
            className="px-5 py-3 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/20 text-white font-bold text-xs flex items-center space-x-2 transition-all"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Export Favorites (JSON)</span>
          </button>
        )}
      </div>

      {/* Favorites Results Grid */}
      {favRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">No Favorites Saved Yet</h3>
          <p className="text-xs text-slate-400">
            Click the heart icon on any recipe card to save it into your personal favorite collection!
          </p>
          <button
            onClick={() => setActiveTab('recipes')}
            className="px-6 py-3 rounded-xl bg-amber-500 text-dark-900 font-bold text-xs"
          >
            Browse Recipe Library
          </button>
        </div>
      )}

    </div>
  );
};
