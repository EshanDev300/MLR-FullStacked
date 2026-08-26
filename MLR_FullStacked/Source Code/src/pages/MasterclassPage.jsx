import React from 'react';
import { Play, Star, Clock, ChefHat } from 'lucide-react';

export function MasterclassPage({ setActiveTab }) {
  const classes = [
    {
      id: 1,
      title: "French Pastry Fundamentals",
      chef: "Jean-Paul Sartre",
      duration: "4h 20m",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80",
      students: "12.4k"
    },
    {
      id: 2,
      title: "Mastering the Art of Sushi",
      chef: "Jiro Ono",
      duration: "3h 15m",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
      students: "8.1k"
    },
    {
      id: 3,
      title: "Sourdough & Artisanal Bread",
      chef: "Chad Robertson",
      duration: "5h 45m",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
      students: "15k"
    },
    {
      id: 4,
      title: "Advanced Knife Skills",
      chef: "Gordon Ramsay",
      duration: "2h 30m",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
      students: "32k"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn pt-8 pb-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight hover-glow-text">
          Culinary <span className="text-rose-400">Masterclasses</span>
        </h1>
        <p className="text-lg text-amber-100/70">
          Learn directly from the world's greatest chefs. Exclusive high-definition video tutorials covering advanced techniques and signature dishes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {classes.map((c, i) => (
          <div key={c.id} className="glass-card rounded-[2rem] overflow-hidden group cursor-pointer border border-rose-500/10 hover:border-rose-500/30 transition-all duration-500 shadow-2xl relative">
            <div className="absolute top-4 right-4 z-20 glass-panel px-3 py-1.5 rounded-full flex items-center space-x-1 border border-white/10">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-white text-xs font-bold">{c.rating}</span>
            </div>
            
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0204] via-[#0A0204]/40 to-transparent z-10" />
              <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-rose-500/90 flex items-center justify-center shadow-lg shadow-emerald-500/50 backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-all duration-300 delay-100">
                  <Play className="w-8 h-8 text-white ml-1 fill-white" />
                </div>
              </div>
            </div>

            <div className="p-8 relative z-20 bg-[#060102]/80">
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-rose-400 transition-colors">{c.title}</h3>
              <div className="flex items-center space-x-2 text-emerald-200/70 mb-6 font-medium">
                <ChefHat className="w-4 h-4" />
                <span>Instructor: {c.chef}</span>
              </div>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1.5 text-amber-100/50 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{c.duration}</span>
                  </div>
                </div>
                <div className="text-sm font-bold text-rose-500">
                  {c.students} enrolled
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="glass-panel p-10 rounded-[2.5rem] border border-rose-500/20 text-center relative overflow-hidden mt-12 bg-[#0A0204]/60">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <h2 className="text-3xl font-black text-white mb-4 relative z-10">Want unlimited access?</h2>
        <p className="text-amber-100/70 mb-8 max-w-2xl mx-auto relative z-10">Subscribe to CookSmart Premium and unlock all 45+ Masterclasses, exclusive VIP recipes, and direct Q&A sessions with the chefs.</p>
        <button onClick={() => setActiveTab('plans')} className="relative z-10 px-8 py-4 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-full text-lg shadow-[0_0_30px_rgba(225,29,72,0.3)] transition-all transform hover:scale-105 active:scale-95">
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
}
