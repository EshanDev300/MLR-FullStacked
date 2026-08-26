import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, Trash2, Plus, Download, Printer } from 'lucide-react';
import { getShoppingList, saveShoppingList } from '../utils/db';
import { soundSynth } from '../utils/sound';

const ShoppingItem = ({ item, onToggle, onDelete }) => (
  <div
    onClick={() => onToggle(item.id)}
    className={`p-4 rounded-2xl glass-card border flex items-center justify-between cursor-pointer transition-all ${
      item.checked ? 'opacity-50 line-through border-rose-500/30' : 'border-white/10'
    }`}
  >
    <div className="flex items-center space-x-3 min-w-0">
      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
        item.checked ? 'bg-rose-500 border-rose-500 text-dark-900' : 'border-white/20'
      }`}>
        {item.checked && <CheckCircle className="w-3.5 h-3.5" />}
      </div>
      <div className="min-w-0">
        <span className="text-xs font-bold text-slate-200 truncate block">{item.name}</span>
        <span className="block text-[10px] text-slate-400 truncate">{item.recipeTitle}</span>
      </div>
    </div>
    <div className="flex items-center space-x-3 flex-shrink-0 ml-3">
      <span className="text-xs font-bold text-rose-400">{item.amount} {item.unit}</span>
      <button type="button" aria-label={`Delete ${item.name}`} onClick={(event) => { event.stopPropagation(); onDelete(item.id); }} className="text-slate-500 hover:text-rose-400 p-1">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export const ShoppingListPage = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');

  const loadList = () => {
    setItems(getShoppingList());
  };

  useEffect(() => {
    loadList();
    window.addEventListener('cooksmart_shopping_changed', loadList);
    return () => window.removeEventListener('cooksmart_shopping_changed', loadList);
  }, []);

  const handleToggleCheck = (id) => {
    const updated = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
    setItems(updated);
    saveShoppingList(updated);
    soundSynth.playClick();
  };

  const handleDeleteItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveShoppingList(updated);
    soundSynth.playClick();
  };

  const handleClearAll = () => {
    setItems([]);
    saveShoppingList([]);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem = {
      id: `manual-${Date.now()}`,
      recipeTitle: 'Custom Grocery Item',
      name: newItemName,
      amount: newItemAmount || '1',
      unit: 'item',
      checked: false
    };

    const updated = [newItem, ...items];
    setItems(updated);
    saveShoppingList(updated);
    setNewItemName('');
    setNewItemAmount('');
    soundSynth.playClick();
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 lg:px-12 space-y-8 pb-20">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Consolidated Grocery Checklist</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
            Smart Grocery List
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Auto-populated ingredients from your Meal Planner and custom added items.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-rose-500/30 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear List</span>
          </button>
        )}
      </div>

      {/* Manual Add Item Input Form */}
      <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-[1fr_10rem_auto] gap-3 glass-panel p-3 rounded-2xl border border-white/10">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add extra grocery item (e.g. Olive Oil, Sea Salt)..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
        />
        <input
          type="text"
          value={newItemAmount}
          onChange={(e) => setNewItemAmount(e.target.value)}
          placeholder="Qty (e.g. 2 bottles)"
          className="w-32 px-3 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-rose-500 text-dark-900 font-extrabold text-xs flex items-center space-x-1 hover:brightness-110"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Checklist Items */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {items.map((item) => <ShoppingItem key={item.id} item={item} onToggle={handleToggleCheck} onDelete={handleDeleteItem} />)}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-xl font-bold text-white font-display">Grocery List is Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Generate ingredients automatically from your Weekly Meal Planner or manually add items above!
          </p>
        </div>
      )}

    </div>
  );
};
