import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, Trash2, Plus, Download, Printer, CheckSquare, Square, Edit3, Copy, Share2, ArrowUpDown, Filter } from 'lucide-react';
import { getShoppingList, saveShoppingList } from '../utils/db';
import { soundSynth } from '../utils/sound';

const ShoppingItem = ({ item, onToggle, onDelete, onEdit }) => (
  <div
    onClick={() => onToggle(item.id)}
    className={`p-4 rounded-2xl glass-card border flex items-center justify-between cursor-pointer transition-all ${
      item.checked ? 'opacity-50 border-rose-500/30' : 'border-white/10'
    }`}
  >
    <div className="flex items-center space-x-3 min-w-0">
      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
        item.checked ? 'bg-rose-500 border-rose-500 text-dark-900' : 'border-white/20'
      }`}>
        {item.checked && <CheckCircle className="w-3.5 h-3.5" />}
      </div>
      <div className="min-w-0">
        <span className={`text-xs font-bold text-slate-200 truncate block ${item.checked ? 'line-through' : ''}`}>{item.name}</span>
        <span className="block text-[10px] text-slate-400 truncate">{item.recipeTitle}</span>
        {item.category && (
          <span className="inline-block mt-0.5 px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500/20 text-amber-400 uppercase">{item.category}</span>
        )}
      </div>
    </div>
    <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
      <span className="text-xs font-bold text-rose-400">{item.amount} {item.unit}</span>
      <button type="button" aria-label={`Edit ${item.name}`} onClick={(e) => { e.stopPropagation(); onEdit(item); }} className="text-slate-500 hover:text-amber-400 p-1">
        <Edit3 className="w-3.5 h-3.5" />
      </button>
      <button type="button" aria-label={`Delete ${item.name}`} onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} className="text-slate-500 hover:text-rose-400 p-1">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export const ShoppingListPage = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('item');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); // all, unchecked, checked
  const [sortMode, setSortMode] = useState('newest'); // newest, alpha, category

  const loadList = () => {
    setItems(getShoppingList());
  };

  useEffect(() => {
    loadList();
    window.addEventListener('cooksmart_shopping_changed', loadList);
    return () => window.removeEventListener('cooksmart_shopping_changed', loadList);
  }, []);

  const persist = (updated) => {
    setItems(updated);
    saveShoppingList(updated);
  };

  const handleToggleCheck = (id) => {
    persist(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
    soundSynth.playClick();
  };

  const handleDeleteItem = (id) => {
    persist(items.filter((item) => item.id !== id));
    soundSynth.playClick();
  };

  const handleClearAll = () => {
    persist([]);
  };

  const handleClearChecked = () => {
    persist(items.filter(item => !item.checked));
    soundSynth.playClick();
  };

  const handleCheckAll = () => {
    persist(items.map(item => ({ ...item, checked: true })));
    soundSynth.playClick();
  };

  const handleUncheckAll = () => {
    persist(items.map(item => ({ ...item, checked: false })));
    soundSynth.playClick();
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItemName(item.name);
    setNewItemAmount(item.amount || '');
    setNewItemUnit(item.unit || 'item');
    setNewItemCategory(item.category || '');
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    if (editingItem) {
      // Update existing item
      const updated = items.map(item => 
        item.id === editingItem.id
          ? { ...item, name: newItemName, amount: newItemAmount || '1', unit: newItemUnit, category: newItemCategory }
          : item
      );
      persist(updated);
      setEditingItem(null);
    } else {
      // Add new item
      const newItem = {
        id: `manual-${Date.now()}`,
        recipeTitle: 'Custom Grocery Item',
        name: newItemName,
        amount: newItemAmount || '1',
        unit: newItemUnit,
        category: newItemCategory || '',
        checked: false
      };
      persist([newItem, ...items]);
    }

    setNewItemName('');
    setNewItemAmount('');
    setNewItemUnit('item');
    setNewItemCategory('');
    soundSynth.playClick();
  };

  const handleDuplicateItem = (item) => {
    const duplicate = { ...item, id: `dup-${Date.now()}`, checked: false };
    persist([duplicate, ...items]);
    soundSynth.playClick();
  };

  const handlePrint = () => {
    const printContent = items
      .map(item => `${item.checked ? '✅' : '⬜'} ${item.name} — ${item.amount} ${item.unit}${item.category ? ` [${item.category}]` : ''}`)
      .join('\n');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>CookSmart Grocery List</title>
      <style>body{font-family:system-ui;padding:40px;line-height:2;} h1{color:#e11d48;} pre{font-size:14px;}</style>
      </head><body>
      <h1>🛒 CookSmart Grocery List</h1>
      <p style="color:#888;">Printed on ${new Date().toLocaleDateString()}</p>
      <pre>${printContent}</pre>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      doc.setFontSize(22);
      doc.setTextColor(225, 29, 72);
      doc.text('CookSmart Grocery List', 20, 25);
      
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(`Generated: ${new Date().toLocaleDateString()} | Items: ${items.length}`, 20, 33);
      
      doc.setDrawColor(225, 29, 72);
      doc.line(20, 37, 190, 37);

      let y = 45;
      const unchecked = items.filter(i => !i.checked);
      const checked = items.filter(i => i.checked);

      if (unchecked.length > 0) {
        doc.setFontSize(13);
        doc.setTextColor(245, 158, 11);
        doc.text('To Buy:', 20, y);
        y += 8;

        doc.setFontSize(11);
        unchecked.forEach((item) => {
          if (y > 270) { doc.addPage(); y = 20; }
          doc.setTextColor(40, 40, 40);
          doc.text(`⬜ ${item.name}`, 22, y);
          doc.setTextColor(120, 120, 120);
          doc.text(`${item.amount} ${item.unit}`, 140, y);
          if (item.category) {
            doc.setTextColor(200, 150, 50);
            doc.text(`[${item.category}]`, 170, y);
          }
          y += 7;
        });
      }

      if (checked.length > 0) {
        y += 5;
        doc.setFontSize(13);
        doc.setTextColor(100, 100, 100);
        doc.text('Already Got:', 20, y);
        y += 8;

        doc.setFontSize(11);
        checked.forEach((item) => {
          if (y > 270) { doc.addPage(); y = 20; }
          doc.setTextColor(160, 160, 160);
          doc.text(`✅ ${item.name} — ${item.amount} ${item.unit}`, 22, y);
          y += 7;
        });
      }

      doc.save('CookSmart_Grocery_List.pdf');
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
  };

  const handleCopyToClipboard = () => {
    const text = items.map(item => `${item.checked ? '✓' : '○'} ${item.name} — ${item.amount} ${item.unit}`).join('\n');
    navigator.clipboard.writeText(`🛒 CookSmart Grocery List\n${new Date().toLocaleDateString()}\n\n${text}`);
    soundSynth.playClick();
  };

  const handleShare = async () => {
    const text = items.map(item => `${item.checked ? '✓' : '○'} ${item.name} — ${item.amount} ${item.unit}`).join('\n');
    if (navigator.share) {
      try {
        await navigator.share({ title: 'CookSmart Grocery List', text: `🛒 Grocery List\n\n${text}` });
      } catch (err) { /* User cancelled */ }
    } else {
      handleCopyToClipboard();
    }
  };

  // Filter and sort items
  let displayItems = [...items];
  if (filterMode === 'unchecked') displayItems = displayItems.filter(i => !i.checked);
  if (filterMode === 'checked') displayItems = displayItems.filter(i => i.checked);
  
  if (sortMode === 'alpha') displayItems.sort((a, b) => a.name.localeCompare(b.name));
  if (sortMode === 'category') displayItems.sort((a, b) => (a.category || '').localeCompare(b.category || ''));

  const checkedCount = items.filter(i => i.checked).length;
  const totalCount = items.length;

  const categories = ['Produce', 'Dairy', 'Meat', 'Bakery', 'Pantry', 'Frozen', 'Beverages', 'Spices', 'Snacks', 'Other'];

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 lg:px-12 space-y-6 pb-20">
      
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

        {/* Stats Badge */}
        {totalCount > 0 && (
          <div className="flex items-center space-x-3">
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
              {checkedCount}/{totalCount} done
            </div>
            <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-500"
                style={{ width: totalCount > 0 ? `${(checkedCount / totalCount) * 100}%` : '0%' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons Bar */}
      {totalCount > 0 && (
        <div className="flex flex-wrap gap-2">
          <button onClick={handleCheckAll} className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-emerald-500/25 transition-all">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Check All</span>
          </button>
          <button onClick={handleUncheckAll} className="px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-bold text-xs flex items-center space-x-1.5 hover:bg-white/10 transition-all">
            <Square className="w-3.5 h-3.5" />
            <span>Uncheck All</span>
          </button>
          <button onClick={handleClearChecked} className="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-amber-500/25 transition-all">
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Checked</span>
          </button>
          <button onClick={handleClearAll} className="px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-rose-500/25 transition-all">
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>

          <div className="w-px h-6 bg-white/10 self-center mx-1" />

          <button onClick={handleDownloadPDF} className="px-3 py-1.5 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-blue-500/25 transition-all">
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
          <button onClick={handlePrint} className="px-3 py-1.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-purple-500/25 transition-all">
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
          <button onClick={handleCopyToClipboard} className="px-3 py-1.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-cyan-500/25 transition-all">
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </button>
          <button onClick={handleShare} className="px-3 py-1.5 rounded-xl bg-pink-500/15 text-pink-400 border border-pink-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-pink-500/25 transition-all">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      )}

      {/* Filter & Sort Bar */}
      {totalCount > 0 && (
        <div className="flex flex-wrap items-center gap-3 glass-panel p-3 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-bold uppercase text-slate-400">Filter:</span>
            {['all', 'unchecked', 'checked'].map(mode => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all ${
                  filterMode === mode ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-white/10" />

          <div className="flex items-center space-x-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-bold uppercase text-slate-400">Sort:</span>
            {[{id: 'newest', label: 'Newest'}, {id: 'alpha', label: 'A-Z'}, {id: 'category', label: 'Category'}].map(mode => (
              <button
                key={mode.id}
                onClick={() => setSortMode(mode.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  sortMode === mode.id ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Manual Add / Edit Item Form */}
      <form onSubmit={handleAddItem} className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
        <div className="flex items-center space-x-2 mb-1">
          <Plus className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {editingItem ? 'Edit Item' : 'Add Custom Item'}
          </span>
          {editingItem && (
            <button type="button" onClick={() => { setEditingItem(null); setNewItemName(''); setNewItemAmount(''); setNewItemUnit('item'); setNewItemCategory(''); }} 
              className="text-[10px] text-rose-400 underline ml-2">Cancel Edit</button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_6rem_7rem_8rem_auto] gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Item name (e.g. Olive Oil, Sea Salt)..."
            className="px-4 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <input
            type="text"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            placeholder="Qty"
            className="px-3 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <select
            value={newItemUnit}
            onChange={(e) => setNewItemUnit(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white focus:outline-none focus:border-rose-500"
          >
            <option value="item">item</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="lb">lb</option>
            <option value="oz">oz</option>
            <option value="liter">liter</option>
            <option value="ml">ml</option>
            <option value="cup">cup</option>
            <option value="tbsp">tbsp</option>
            <option value="tsp">tsp</option>
            <option value="bottle">bottle</option>
            <option value="pack">pack</option>
            <option value="bunch">bunch</option>
            <option value="can">can</option>
            <option value="box">box</option>
          </select>
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-dark-900/90 border border-white/15 text-xs text-white focus:outline-none focus:border-rose-500"
          >
            <option value="">Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-rose-500 text-dark-900 font-extrabold text-xs flex items-center space-x-1 hover:brightness-110 whitespace-nowrap"
          >
            {editingItem ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{editingItem ? 'Update' : 'Add'}</span>
          </button>
        </div>
      </form>

      {/* Checklist Items */}
      {displayItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {displayItems.map((item) => (
            <ShoppingItem 
              key={item.id} 
              item={item} 
              onToggle={handleToggleCheck} 
              onDelete={handleDeleteItem}
              onEdit={handleEditItem}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-xl font-bold text-white font-display">
            {filterMode !== 'all' ? 'No Items Match Your Filter' : 'Grocery List is Empty'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {filterMode !== 'all' 
              ? 'Try changing the filter to see all items.'
              : 'Generate ingredients automatically from your Weekly Meal Planner or manually add items above!'
            }
          </p>
        </div>
      )}
    </div>
  );
};
