import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Grid, List, Clock, Star, ChefHat, RotateCcw } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';

export const Recipes = ({ recipes, onSelectRecipe }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [maxTime, setMaxTime] = useState(60);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'time', 'calories'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Search term matching
      const query = searchTerm.toLowerCase();
      const matchesSearch = 
        !query ||
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query) ||
        (recipe.ingredients && recipe.ingredients.some((i) => i.name.toLowerCase().includes(query)));

      // Category matching
      const matchesCategory = selectedCategory === 'all' || recipe.category.toLowerCase() === selectedCategory.toLowerCase();

      // Difficulty matching
      const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      // Max Cook Time matching
      const matchesTime = (recipe.totalTime || recipe.cookTime) <= maxTime;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesTime;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'time') return (a.totalTime || a.cookTime) - (b.totalTime || b.cookTime);
      if (sortBy === 'calories') return a.calories - b.calories;
      return 0;
    });
  }, [recipes, searchTerm, selectedCategory, selectedDifficulty, maxTime, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setMaxTime(60);
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-6">
        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/30">
          Recipe Database Library
        </span>
        <h1 className="text-4xl font-black font-display text-white">
          Explore Culinary Delights
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Search by ingredients, filter by preparation time, difficulty, or category to discover your next meal.
        </p>
      </div>

      {/* SEARCH & FILTERS CONTROL BAR */}
      <div className="p-5 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-2xl">
        
        {/* Row 1: Search Bar & View Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search recipes by name, ingredient (e.g. salmon, garlic, avocado)..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-dark-900/90 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${
                viewMode === 'grid' ? 'bg-amber-500 text-dark-900 shadow-md' : 'glass-card text-slate-400'
              }`}
              title="Grid View"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all ${
                viewMode === 'list' ? 'bg-amber-500 text-dark-900 shadow-md' : 'glass-card text-slate-400'
              }`}
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Row 2: Filter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          
          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Categories</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
              <option value="desserts">Desserts</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="rating">Highest Rating ★</option>
              <option value="time">Fastest Cook Time</option>
              <option value="calories">Lowest Calories</option>
            </select>
          </div>

          {/* Max Cook Time Slider */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400 mb-1">
              <span>Max Time</span>
              <span className="text-amber-400">{maxTime} Mins</span>
            </div>
            <input
              type="range"
              min={10}
              max={90}
              step={5}
              value={maxTime}
              onChange={(e) => setMaxTime(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

        </div>

        {/* Active Filters Bar & Reset */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-400 border-t border-white/10">
          <span>Found <strong className="text-white font-mono">{filteredRecipes.length}</strong> matching recipes</span>
          <button
            onClick={handleResetFilters}
            className="flex items-center space-x-1 text-slate-400 hover:text-amber-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

      </div>

      {/* RECIPE RESULTS GRID OR LIST */}
      {filteredRecipes.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-400">{recipe.category}</span>
                    <h3 className="text-base font-bold text-white font-display">{recipe.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{recipe.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-xs text-slate-300 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{recipe.totalTime || recipe.cookTime}m</span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">No Recipes Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn't find recipes matching your current filters. Try resetting filters or searching another ingredient.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-dark-900 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
