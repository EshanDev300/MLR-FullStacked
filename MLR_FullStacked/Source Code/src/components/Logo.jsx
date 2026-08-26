import React from 'react';
import { ChefHat } from 'lucide-react';

export const Logo = ({ size = 'normal', onClick, className = '' }) => {
  const isLarge = size === 'large';

  return (
    <div 
      onClick={onClick} 
      className={`flex items-center space-x-2.5 group cursor-pointer hover-logo-anim ${className} flex-shrink-0`}
    >
      {/* CookSmart brand mark */}
      <div
        className="shine-surface relative flex-shrink-0 rounded-full p-[2px] shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform duration-300 overflow-hidden"
        style={{
          width: isLarge ? '46px' : '38px',
          height: isLarge ? '46px' : '38px',
          background: 'linear-gradient(135deg, #E11D48 0%, #F59E0B 50%, #FFD700 100%)'
        }}
      >
        <div className="w-full h-full rounded-full bg-[#120305] overflow-hidden p-0.5 relative border border-amber-400/50 flex items-center justify-center shadow-inner">
          <div className="w-full h-full bg-[#120305] rounded-full flex items-center justify-center">
            <ChefHat className={`${isLarge ? 'w-6 h-6' : 'w-5 h-5'} text-amber-400`} />
          </div>
        </div>

        {/* Live Glow Ping Indicator */}
        <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 shadow-md">
          <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col flex-shrink-0">
        <span
          className={`${
            isLarge ? 'text-xl' : 'text-base sm:text-lg'
          } font-black tracking-tight leading-none font-display flex items-center`}
        >
          <span className="text-white">Cook</span>
          <span className="text-gradient-fire ml-0.5">Smart</span>
        </span>
        <span className="text-[8.5px] font-extrabold uppercase tracking-[0.2em] text-amber-400/90 mt-0.5">
          Kitchen Innovations
        </span>
      </div>
    </div>
  );
};
