import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, ShoppingBag, Sparkles, Check, Clock } from 'lucide-react';
import { getMealPlan, saveMealPlan, getShoppingList, saveShoppingList } from '../utils/db';
import { soundSynth } from '../utils/sound';

export const MealPlannerPage = ({ recipes, onSelectRecipe, setActiveTab }) => {
  const [mealPlan, setMealPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    setMealPlan(getMealPlan());
  }, []);

  const handleAssignRecipe = (day, mealType, recipeId) => {
    const updated = {
      ...mealPlan,
      [day]: {
        ...mealPlan[day],
        [mealType]: recipeId
      }
    };
    setMealPlan(updated);
    saveMealPlan(updated);
    soundSynth.playClick();
  };

  const handleClearSlot = (day, mealType) => {
    handleAssignRecipe(day, mealType, null);
  };

    const handleGenerateShoppingList = () => {
    const currentList = getShoppingList();
    const recipeMap = new Map(recipes.map((r) => [r.id, r]));
    const newItems = [];
    const pdfLines = [];

    days.forEach((day) => {
      const dayPlan = mealPlan[day];
      if (dayPlan) {
        ['breakfast', 'lunch', 'dinner'].forEach((mealType) => {
          const recId = dayPlan[mealType];
          if (recId && recipeMap.has(recId)) {
            const recipe = recipeMap.get(recId);
            
            pdfLines.push(`- ${recipe.title} (${day} ${mealType})`);
            
            (recipe.ingredients || []).forEach((ing) => {
              newItems.push({
                id: `${day}-${mealType}-${ing.name}-${Math.random()}`,
                recipeTitle: `${day} ${mealType}: ${recipe.title}`,
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit,
                checked: false
              });
              
              pdfLines.push(`   [ ] ${ing.name} (${ing.amount} ${ing.unit})`);
            });
            pdfLines.push('');
          }
        });
      }
    });

    saveShoppingList([...currentList, ...newItems]);
    setGeneratedSuccess(true);
    soundSynth.playClick();
    
    // Generate PDF
    if (pdfLines.length > 0) {
      import('jspdf').then(({ jsPDF }) => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("CookSmart Weekly Grocery List", 20, 20);
        
        doc.setFontSize(12);
        let yPos = 35;
        
        pdfLines.forEach(line => {
          if (yPos > 280) {
            doc.addPage();
            yPos = 20;
          }
          doc.text(line, 20, yPos);
          yPos += 7;
        });
        
        doc.save("CookSmart-Grocery-List.pdf");
      });
    }

    setTimeout(() => setGeneratedSuccess(false), 3000);
  };

  const getRecipeById = (id) => recipes.find((r) => r.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>Weekly Nutrition Scheduler</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
            7-Day Weekly Meal Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Schedule your meals for the week and auto-generate your grocery list with one click.
          </p>
        </div>

        <button
          onClick={handleGenerateShoppingList}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-teal-500 text-dark-900 font-extrabold text-xs shadow-xl shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{generatedSuccess ? '✓ Grocery List Generated!' : 'Generate Grocery List'}</span>
        </button>
      </div>

      {/* Days Tabs Bar */}
      <div className="flex overflow-x-auto space-x-2 pb-2 custom-scrollbar">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all flex-shrink-0 ${
                isSelected
                  ? 'bg-amber-500 text-dark-900 shadow-lg shadow-amber-500/20'
                  : 'glass-card text-slate-300 hover:text-white'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected Day Schedule View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['breakfast', 'lunch', 'dinner'].map((mealType) => {
          const dayPlan = mealPlan[selectedDay] || {};
          const assignedRecipeId = dayPlan[mealType];
          const assignedRecipe = assignedRecipeId ? getRecipeById(assignedRecipeId) : null;

          return (
            <div key={mealType} className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  {mealType}
                </span>
                {assignedRecipe && (
                  <button
                    onClick={() => handleClearSlot(selectedDay, mealType)}
                    className="text-xs text-rose-400 hover:underline flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {assignedRecipe ? (
                <div className="space-y-3">
                  <div
                    onClick={() => onSelectRecipe(assignedRecipe)}
                    className="group cursor-pointer space-y-2"
                  >
                    <img
                      src={assignedRecipe.image}
                      alt={assignedRecipe.title}
                      className="w-full h-36 rounded-2xl object-cover group-hover:scale-105 transition-transform"
                    />
                    <h4 className="text-sm font-bold text-white font-display group-hover:text-amber-400">
                      {assignedRecipe.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{assignedRecipe.totalTime || assignedRecipe.cookTime} Mins</span>
                      <span className="text-amber-400 font-bold">★ {assignedRecipe.rating}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center glass-card rounded-2xl border border-dashed border-white/15 space-y-3">
                  <Plus className="w-6 h-6 text-slate-500 mx-auto" />
                  <span className="block text-xs text-slate-400 font-medium">No Recipe Assigned</span>
                  
                  {/* Select Recipe Dropdown */}
                  <select
                    onChange={(e) => {
                      if (e.target.value) handleAssignRecipe(selectedDay, mealType, e.target.value);
                    }}
                    defaultValue=""
                    className="w-full px-3 py-2 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white"
                  >
                    <option value="" disabled>+ Choose Recipe...</option>
                    {recipes.map((r) => (
                      <option key={r.id} value={r.id}>{r.title}</option>
                    ))}
                  </select>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
