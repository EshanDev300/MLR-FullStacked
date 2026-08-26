import React from 'react';
import { ChefHat, ArrowRight, Sparkles } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';

export const CategoriesPage = ({ categories, recipes, onSelectRecipe, setActiveTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-6">
        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-rose-500/20 text-rose-400 border border-rose-500/30">
          Recipe Taxonomy Navigator
        </span>
        <h1 className="text-4xl font-black font-display text-white">
          Recipe Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Organized into Breakfast, Lunch, Dinner, Snacks, Desserts, and Vegan plant-based collections.
        </p>
      </div>

      {/* Category Sections */}
      <div className="space-y-16">
        {categories.map((cat) => {
          const categoryRecipes = recipes.filter((r) => r.category.toLowerCase() === cat.id.toLowerCase());
          return (
            <div key={cat.id} className="space-y-6">
              
              {/* Category Header Bar */}
              <div className={`p-6 rounded-3xl glass-panel border ${cat.border} flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${cat.gradient} ${cat.accent}`}>
                    <ChefHat className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black font-display text-white">{cat.name}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-bold">
                    {categoryRecipes.length} Dishes
                  </span>
                </div>
              </div>

              {/* Recipes Grid under this Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryRecipes.slice(0, 3).map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
