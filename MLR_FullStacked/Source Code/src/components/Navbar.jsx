import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
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
  CreditCard,
  ChevronDown
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

  // Overflow nav states
  const [visibleCount, setVisibleCount] = useState(11); // default to all
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  
  const measureContainerRef = useRef(null);
  const navContainerRef = useRef(null);
  const itemWidths = useRef([]);
  const moreBtnWidth = useRef(0);

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

  useLayoutEffect(() => {
    if (measureContainerRef.current) {
      const children = Array.from(measureContainerRef.current.children);
      // Last child is the "More" button
      const moreBtn = children.pop();
      if (moreBtn) moreBtnWidth.current = moreBtn.offsetWidth;
      itemWidths.current = children.map(c => c.offsetWidth);
    }
  }, [navItems, favCount]); // Re-measure if counts change text width

  useEffect(() => {
    const container = navContainerRef.current;
    if (!container) return;
    
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (!width || itemWidths.current.length === 0) return;

      let currentWidth = 0;
      let newVisibleCount = itemWidths.current.length;
      
      const space = window.innerWidth >= 1280 ? 6 : 4; // xl breakpoint gap is 6px, else 4px

      const totalWidth = itemWidths.current.reduce((sum, w) => sum + w + space, 0) - space;
      
      if (totalWidth <= width) {
        newVisibleCount = itemWidths.current.length;
      } else {
        let availableWidth = width - moreBtnWidth.current - space;
        newVisibleCount = 0;
        for (let i = 0; i < itemWidths.current.length; i++) {
          if (currentWidth + itemWidths.current[i] <= availableWidth) {
            newVisibleCount++;
            currentWidth += itemWidths.current[i] + space;
          } else {
            break;
          }
        }
      }
      // Guarantee at least 1 item is visible if space is extremely small
      if (newVisibleCount === 0 && itemWidths.current.length > 0) {
          newVisibleCount = 1;
      }
      setVisibleCount(newVisibleCount);
    });
    
    observer.observe(container);
    return () => observer.disconnect();
  }, [navItems, favCount]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.more-dropdown-container')) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-2.5 left-0 right-0 z-[100] w-full max-w-[98%] mx-auto px-2 sm:px-4">
      {/* Sleek, Perfectly Balanced Luxury Glass Navbar Container */}
      <div className="glass-panel-glow shine-surface rounded-2xl border border-amber-500/40 shadow-xl gold-shine-border bg-[#140406]/95 backdrop-blur-2xl overflow-visible">
        <div className="px-3.5 sm:px-5 h-16 sm:h-[68px] flex items-center justify-between gap-2 sm:gap-3 relative">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Logo size="normal" onClick={() => setActiveTab('home')} />
          </div>

          {/* Hidden measuring container to calculate natural widths */}
          <div 
            ref={measureContainerRef}
            className="absolute top-0 left-0 invisible flex space-x-1 xl:space-x-1.5 pointer-events-none opacity-0 z-[-1]"
            aria-hidden="true"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 whitespace-nowrap border border-transparent">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.count > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-black rounded-full ml-0.5">
                      {item.count}
                    </span>
                  )}
                </div>
              );
            })}
            {/* Measuring More button */}
            <div className="px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 whitespace-nowrap border border-transparent">
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Desktop Navigation Links (with overflow detection) */}
          <nav ref={navContainerRef} className="hidden md:flex flex-1 min-w-0 items-center justify-center space-x-1 xl:space-x-1.5 mx-2">
            {navItems.slice(0, visibleCount).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 whitespace-nowrap transition-all duration-200 ${
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
            
            {/* More Dropdown */}
            {visibleCount < navItems.length && (
              <div className="relative more-dropdown-container flex-shrink-0" style={{ zIndex: 200 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setMoreMenuOpen(!moreMenuOpen); }}
                  style={{ transform: 'none' }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 whitespace-nowrap transition-colors duration-200 !transform-none ${
                    moreMenuOpen || navItems.slice(visibleCount).some(item => activeTab === item.id)
                      ? 'bg-gradient-to-r from-rose-600/80 to-amber-500/80 text-white border border-amber-400/40'
                      : 'text-amber-100/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {moreMenuOpen && (
                  <div 
                    className="absolute right-0 glass-panel-glow border border-amber-500/40 rounded-2xl py-2.5 px-1.5 bg-[#140406]/98 backdrop-blur-2xl shadow-2xl min-w-[200px] mt-4"
                    style={{ top: '100%', zIndex: 250 }}
                  >
                    {navItems.slice(visibleCount).map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab(item.id);
                            setMoreMenuOpen(false);
                          }}
                          style={{ transform: 'none' }}
                          className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-colors !transform-none ${
                            isActive 
                              ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white' 
                              : 'text-amber-100 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-400'}`} />
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
                )}
              </div>
            )}
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

          {/* Mobile Hamburger Toggle (Visible < 768px, replaced 'lg:hidden' with 'md:hidden' since hamburger is for mobile/md breakpoint) */}
          <div className="flex md:hidden items-center space-x-2 flex-shrink-0">
            <button onClick={onOpenTimer} className="p-1.5 rounded-xl bg-white/10 text-amber-400">
              <Timer className="w-4 h-4" />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 rounded-xl bg-white/10 text-slate-200">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer (Updated to show < 768px instead of < 1024px) */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel-glow border border-amber-500/40 rounded-2xl mt-2 p-3.5 space-y-2.5 animate-fadeIn bg-[#140406]/98 backdrop-blur-2xl z-50">
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

          <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
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
