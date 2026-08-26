import React from 'react';
import { ChefHat, ShieldCheck, Sparkles, Code, Cpu, Globe, Award, Heart } from 'lucide-react';

export const AboutUsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-6">
        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/30">
          TechWiz 7 Submission
        </span>
        <h1 className="text-4xl font-black font-display text-white">
          About CookSmart Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Smart Cooking & Recipe Discovery Portal engineered for seamless single-page recipe discovery, meal planning, and multilingual AI chef guidance.
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <ChefHat className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Project Mission & Objectives</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            CookSmart was created to solve the universal problem of pantry ingredient wastage and daily meal decision fatigue. By combining rich pre-populated recipe datasets with an interactive WebGL 3D interface and a multilingual AI Culinary Assistant, CookSmart makes cooking enjoyable, sustainable, and accessible to home chefs worldwide.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Team Information</h2>
          <div className="space-y-2 text-xs text-slate-300">
            <p><strong className="text-amber-400 font-bold">Team Name:</strong> MLR_FullStacked</p>
            <p><strong className="text-amber-400 font-bold">Championship:</strong> TechWiz 7 World Tech Championship</p>
            <p><strong className="text-amber-400 font-bold">Category:</strong> Web & App Development</p>
            <p><strong className="text-amber-400 font-bold">Architecture:</strong> Responsive Single Page Application (SPA)</p>
          </div>
        </div>
      </div>

      {/* Tech Stack Breakdown */}
      <div className="p-8 rounded-3xl glass-panel-glow border border-amber-500/30 space-y-6">
        <h2 className="text-2xl font-bold text-white font-display text-center">
          Software & Technology Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl glass-card space-y-1">
            <Code className="w-6 h-6 text-amber-400 mx-auto" />
            <span className="block text-sm font-bold text-white">React 18 & Vite</span>
            <span className="text-[10px] text-slate-400">Core SPA Architecture</span>
          </div>
          <div className="p-4 rounded-2xl glass-card space-y-1">
            <Cpu className="w-6 h-6 text-rose-400 mx-auto" />
            <span className="block text-sm font-bold text-white">Three.js WebGL</span>
            <span className="text-[10px] text-slate-400">3D Interactive Graphics</span>
          </div>
          <div className="p-4 rounded-2xl glass-card space-y-1">
            <Sparkles className="w-6 h-6 text-purple-400 mx-auto" />
            <span className="block text-sm font-bold text-white">Multilingual AI</span>
            <span className="text-[10px] text-slate-400">Recipe Suggestion Engine</span>
          </div>
          <div className="p-4 rounded-2xl glass-card space-y-1">
            <Globe className="w-6 h-6 text-cyan-400 mx-auto" />
            <span className="block text-sm font-bold text-white">HTML5 LocalStorage</span>
            <span className="text-[10px] text-slate-400">Offline Database System</span>
          </div>
        </div>
      </div>

    </div>
  );
};
