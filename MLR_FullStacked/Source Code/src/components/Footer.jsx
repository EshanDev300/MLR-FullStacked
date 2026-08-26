import React, { useState } from 'react';
import { ChefHat, Send, Globe, Github, Twitter, Flame, Award, Heart, Sparkles, Utensils, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export const Footer = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative z-10 glass-panel border-t-2 border-amber-500/30 mt-28 pt-16 pb-12 overflow-hidden bg-[#0A0203]/98">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* BRAND NEW TOP HERO DISPATCH CARD */}
        <div className="rounded-3xl glass-panel-glow border-2 border-amber-500/50 p-8 sm:p-10 shadow-2xl relative overflow-hidden bg-gradient-to-r from-[#180407]/90 via-[#180407]/80 to-[#180407]/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-600/25 border border-amber-400/40 text-amber-300 text-xs font-bold shadow-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>VIP Gourmet Intelligence</span>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-black font-display text-white">
                Join the <span className="text-gradient-fire">Gourmet Dispatch</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-amber-100/80 max-w-lg leading-relaxed">
                Receive weekly five-star AI recipes, masterclass cooking guides, and seasonal nutrition plans directly to your inbox.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center space-x-1.5 text-amber-400 font-semibold"><CheckCircle2 className="w-4 h-4 text-rose-400" /><span>Curated AI Dishes</span></span>
                <span className="flex items-center space-x-1.5 text-amber-400 font-semibold"><CheckCircle2 className="w-4 h-4 text-rose-400" /><span>Weekly Meal Plans</span></span>
                <span className="flex items-center space-x-1.5 text-amber-400 font-semibold"><CheckCircle2 className="w-4 h-4 text-rose-400" /><span>Zero Spam</span></span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#080102]/90 border border-amber-500/40 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-lg font-black text-xs text-dark-900 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:brightness-110 transition-all flex items-center space-x-1.5 shadow-md"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-xs text-rose-400 font-bold animate-fadeIn text-center lg:text-left">
                    ✓ Subscribed! Welcome to the Gourmet Dispatch.
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>

        {/* 4-QUADRANT LUXURY SITEMAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Quadrant 1: Brand & Heritage */}
          <div className="space-y-4">
            <Logo size="large" onClick={() => setActiveTab('home')} />
            <p className="text-amber-100/75 text-xs sm:text-sm leading-relaxed">
              Experience five-star culinary perfection tailored to your ingredients, diet, and cooking time. Powered by multilingual AI Chef intelligence and WebGL 3D graphics.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quadrant 2: Culinary Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-display text-gradient-gold">
              Culinary Navigation
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <span className="text-rose-500">🌶️</span>
                  <span>Home Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('recipes')} className="hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <span className="text-amber-400">📖</span>
                  <span>Recipe Library</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('categories')} className="hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <span className="text-rose-400">🔍</span>
                  <span>Recipe Categories</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-chef')} className="hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <span className="text-yellow-400">✨</span>
                  <span>AI Chef Agent</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('meal-planner')} className="hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <span className="text-rose-400">📅</span>
                  <span>Weekly Meal Planner</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quadrant 3: Interactive Utilities */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-display text-gradient-crimson">
              Interactive Utilities
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li>
                <button onClick={() => setActiveTab('shopping-list')} className="hover:text-rose-400 transition-colors flex items-center space-x-2">
                  <span>🛒</span>
                  <span>Grocery Checklist</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('favourites')} className="hover:text-rose-400 transition-colors flex items-center space-x-2">
                  <span>❤️</span>
                  <span>Saved Favorites</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tips')} className="hover:text-rose-400 transition-colors flex items-center space-x-2">
                  <span>👨‍🍳</span>
                  <span>Tips & Masterclasses</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-rose-400 transition-colors flex items-center space-x-2">
                  <span>🏆</span>
                  <span>Culinary Quiz Game</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-rose-400 transition-colors flex items-center space-x-2">
                  <span>💬</span>
                  <span>Contact & Feedback</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quadrant 4: Championship Credentials */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-display">
              Championship Credentials
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Global Tech Competition</span>
                <p className="font-bold text-white">TechWiz 7 Tech Championship</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">Development Team</span>
                <p className="font-bold text-white">MLR_FullStacked</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & BADGES BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-4 sm:space-y-0">
          <p>© 2026 CookSmart Portal — TechWiz 7 World Tech Championship. Team: <span className="text-amber-400 font-bold">MLR_FullStacked</span></p>
          <div className="flex items-center space-x-6 text-slate-300">
            <span className="flex items-center space-x-1.5"><Flame className="w-3.5 h-3.5 text-rose-500" /><span>WebGL 3D Engine</span></span>
            <span className="flex items-center space-x-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400" /><span>Multilingual AI</span></span>
            <span className="flex items-center space-x-1.5"><Award className="w-3.5 h-3.5 text-yellow-400" /><span>TechWiz 7</span></span>
          </div>
        </div>

      </div>
    </footer>
  );
};
