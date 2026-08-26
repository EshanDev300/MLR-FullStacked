import React, { useState, useEffect } from 'react';
import { Clock, Star, Heart, Flame, Users, ChefHat } from 'lucide-react';
import { toggleFavourite, getFavouriteIds } from '../utils/db';
import BorderGlow from './BorderGlow';

export const RecipeCard = ({ recipe, onSelectRecipe }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = getFavouriteIds();
    setIsFav(favs.includes(recipe.id));
  }, [recipe.id]);

  const handleToggleFav = (e) => {
    e.stopPropagation();
    const updatedState = toggleFavourite(recipe.id);
    setIsFav(updatedState);
  };

  return (
    <BorderGlow className="h-full shine-surface" animated={false}>
      <div
        onClick={() => onSelectRecipe(recipe)}
        className="group relative rounded-2xl glass-card overflow-hidden cursor-pointer flex flex-col h-full transform transition-all duration-300 hover:shadow-2xl border border-amber-500/20 hover:border-amber-400/50"
      >
      {/* Cover Image - Clean Focal Point (Issue 19 Fix: Only Category and Favorite heart on image) */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-dark-800">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0203] via-transparent to-transparent opacity-60" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-dark-900/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
            {recipe.category}
          </span>

          {/* Issue 20 Fix: Neutral white/slate outline for inactive state, active crimson rose state */}
          <button
            onClick={handleToggleFav}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
              isFav 
                ? 'bg-rose-600 text-white border-rose-400 shadow-rose-600/50 scale-105' 
                : 'bg-black/60 text-[#FFF8F0] border-white/20 hover:text-rose-400 hover:scale-105 hover:border-rose-400/40'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Body & Metadata (Issue 11 Fix: Spacious padding; Issue 19 Fix: Time & Difficulty cleanly arranged here) */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-amber-400 tracking-wide">
              {recipe.cuisine || 'International'}
            </span>
            <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>{recipe.rating}</span>
              <span className="text-slate-400 font-normal">({recipe.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 font-display">
            {recipe.title}
          </h3>

          <p className="text-xs text-amber-100/70 line-clamp-2 mt-1 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Clean Structured Bottom Metadata Row (Issue 11 & 19 Fix: Breathable spacing, clear hierarchy) */}
        <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">{recipe.totalTime || recipe.cookTime} mins</span>
          </div>
          <div className="flex items-center space-x-1.5 justify-end">
            <ChefHat className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
            <span className="truncate">{recipe.difficulty}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{recipe.servings} Servings</span>
          </div>
          <div className="flex items-center space-x-1.5 justify-end text-rose-400 font-semibold">
            <Flame className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{recipe.calories} kcal</span>
          </div>
        </div>
      </div>
      </div>
    </BorderGlow>
  );
};
