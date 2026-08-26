import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  BookOpen, 
  Search, 
  Calendar, 
  Heart, 
  Timer, 
  User, 
  PlusCircle, 
  Menu, 
  X,
  ShoppingCart,
  Sparkles,
  ShieldCheck,
  Mail,
  HelpCircle,
  Video,
  CreditCard
} from 'lucide-react';
import { Logo } from './Logo';
import { getFavouriteIds, getUserPreferences } from '../utils/db';
import { getCurrentUser } from '../utils/auth';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  onOpenTimer, 
  onOpenAddRecipe 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [userPrefs, setUserPrefs] = useState({ name: '' });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const updateCounts = () => {
      setFavCount(getFavouriteIds().length);
      setUserPrefs(getUserPreferences());
      setCurrentUser(getCurrentUser());
    };
    updateCounts();

    window.addEventListener('cooksmart_favs_changed', updateCounts);
    window.addEventListener('cooksmart_prefs_changed', updateCounts);
    window.addEventListener('cooksmart_auth_changed', updateCounts);

    return () => {
      window.removeEventListener('cooksmart_favs_changed', updateCounts);
      window.removeEventListener('cooksmart_prefs_changed', updateCounts);
      window.removeEventListener('cooksmart_auth_changed', updateCounts);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'recipes', label: 'Recipes', icon: BookOpen },
    { id: 'categories', label: 'Categories', icon: Search },
    { id: 'ai-chef', label: 'AI Chef', icon: Sparkles },
    { id: 'meal-planner', label: 'Planner', icon: Calendar },
    { id: 'masterclass', label: 'Masterclass', icon: Video },
    { id: 'quiz', label: 'Culinary Quiz', icon: HelpCircle },
    { id: 'plans', label: 'Plans & Pricing', icon: CreditCard },
    { id: 'shopping-list', label: 'Checklist', icon: ShoppingCart },
    { id: 'favourites', label: 'Favorites', icon: Heart, count: favCount },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <header className="fixed top-2.5 left-0 right-0 z-[100] w-full max-w-[98%] mx-auto px-2 sm:px-4">
      {/* Sleek, Perfectly Balanced Luxury Glass Navbar Container */}
      <div className="glass-panel-glow shine-surface rounded-2xl border border-amber-500/40 shadow-xl gold-shine-border bg-[#140406]/95 backdrop-blur-2xl overflow-hidden">
        <div className="px-3.5 sm:px-5 h-16 sm:h-[68px] flex items-center justify-between gap-2 sm:gap-3">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Logo size="normal" onClick={() => setActiveTab('home')} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 whitespace-nowrap transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 text-white shadow-md border border-amber-400/40' 
                      : 'text-amber-100/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                  {item.count > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-black rounded-full bg-rose-600 text-white ml-0.5">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
            <button onClick={onOpenTimer} title="Kitchen Timer & Unit Converter" className="btn-secondary py-1.5 px-3 text-xs font-bold">
              <Timer className="w-3.5 h-3.5 text-amber-400" />
              <span>Timer</span>
            </button>

            <button onClick={onOpenAddRecipe} title="Add Custom Recipe" className="btn-accent py-1.5 px-3 text-xs font-bold">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Recipe</span>
            </button>

            {currentUser ? (
              <button onClick={() => setActiveTab('dashboard')} className="btn-primary py-1.5 px-3.5 text-xs font-bold">
                <User className="w-3.5 h-3.5" />
                <span>{currentUser.name}</span>
              </button>
            ) : (
              <button onClick={() => setActiveTab('dashboard')} className="btn-primary py-1.5 px-3.5 text-xs font-bold border-amber-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Login / Portal</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center space-x-2 flex-shrink-0">
            <button onClick={onOpenTimer} className="p-1.5 rounded-xl bg-white/10 text-amber-400">
              <Timer className="w-4 h-4" />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 rounded-xl bg-white/10 text-slate-200">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel-glow border border-amber-500/40 rounded-2xl mt-2 p-3.5 space-y-2.5 animate-fadeIn bg-[#140406]/98 backdrop-blur-2xl z-50">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
            {currentUser ? (
              <button onClick={() => { 
                setActiveTab('dashboard');
                setMobileMenuOpen(false); 
              }} className="btn-primary py-1.5 text-xs font-bold">
                <User className="w-3.5 h-3.5" />
                <span>{currentUser.name}</span>
              </button>
            ) : (
              <button onClick={() => { 
                setActiveTab('dashboard');
                setMobileMenuOpen(false); 
              }} className="btn-primary py-1.5 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Login / Portal</span>
              </button>
            )}
            <button onClick={() => { onOpenAddRecipe(); setMobileMenuOpen(false); }} className="btn-accent py-1.5 text-xs font-bold">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Recipe</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-between ${
                    isActive ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white' : 'text-amber-100 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-rose-600 text-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
