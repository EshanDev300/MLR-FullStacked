import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

const cookingTips = [
  "Preheating pans ensures crispier sears and locks in flavor.",
  "Let meat rest 5–10 minutes after grilling to keep juices inside.",
  "Fresh herbs added at the end elevate any dish instantly.",
  "Season in layers throughout cooking, not just at the end."
];

export const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(15);
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    // 1. Progress Bar Interval
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15 + 8);
        return next > 100 ? 100 : next;
      });
    }, 180);

    // 2. Rotating Tips Interval
    const tipTimer = setInterval(() => {
      setTipIdx((prev) => (prev + 1) % cookingTips.length);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
    };
  }, []);

  // 3. Trigger completion callback once progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      const finishTimeout = setTimeout(() => {
        if (onFinished) onFinished();
      }, 400); // brief delay for full bar visual effect
      return () => clearTimeout(finishTimeout);
    }
  }, [progress, onFinished]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0203] text-amber-50 select-none">
      
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center space-y-6">
        
        {/* Animated Icon */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-ping opacity-30" />
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-amber-400 animate-spin" />
          <div className="w-16 h-16 rounded-2xl bg-dark-900/80 border border-amber-400/40 flex items-center justify-center shadow-2xl backdrop-blur-md">
            <ChefHat className="w-8 h-8 text-amber-400 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Culinary Portal</span>
          </div>
          <h3 className="text-2xl font-black font-display text-white tracking-wide">
            Preparing Experience...
          </h3>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-rose-600 via-amber-500 to-amber-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-amber-200/70 font-semibold px-1">
            <span>Loading Assets</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Dynamic Tip */}
        <div className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-sm transition-all duration-500">
          <span className="text-amber-400 font-bold">Chef Tip: </span>
          <span>{cookingTips[tipIdx]}</span>
        </div>

      </div>
    </div>
  );
};