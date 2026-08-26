import React, { useState } from 'react';
import { ChefHat, Play, Clock, Sparkles, CheckCircle2, Flame, ShieldCheck } from 'lucide-react';

const fallbackTipImage = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80';
const secondaryTipImage = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80';

export const CookingTipsPage = ({ tips }) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24 animate-fadeIn pt-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          Chef's Secrets
        </span>
        <h1 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight hover-glow-text">
          Culinary <span className="text-amber-400">Tips</span>
        </h1>
        <p className="text-sm md:text-base text-emerald-100/70 leading-relaxed">
          Master knife skills, pan-searing secrets, spice pairing matrix, and cast-iron cookware care with our exclusive video guides.
        </p>
      </div>

      {/* Video Modal if active */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0204]/90 backdrop-blur-2xl">
          <div className="relative w-full max-w-4xl glass-card border border-rose-500/30 rounded-[2rem] p-4 sm:p-8 space-y-4 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2"><Play className="w-5 h-5 text-rose-400" /> <span>Video Guide</span></h3>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                Close ✕
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-white/10">
              <iframe
                src={activeVideoUrl}
                title="Cooking Video Guide"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Tips Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="p-8 rounded-[2rem] glass-card border border-rose-500/10 space-y-6 hover:border-rose-500/30 transition-all duration-500 flex flex-col justify-between group shadow-2xl bg-[#060102]/80"
          >
            <div className="space-y-6">
              
              {/* Image & Video Play Overlay */}
              <div className={`relative h-64 rounded-[1.5rem] overflow-hidden ${tip.id === 'tip-1' ? 'grid grid-cols-2 gap-1 bg-black' : ''}`}>
                <img
                  src={tip.image}
                  alt={tip.title}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackTipImage;
                  }}
                  className={`${tip.id === 'tip-1' ? 'w-full h-full object-cover' : 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'}`}
                />
                {tip.id === 'tip-1' && (
                  <img
                    src={secondaryTipImage}
                    alt="Fresh ingredients prepared for cooking"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-[#0A0204]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setActiveVideoUrl(tip.videoUrl)}
                    className="w-20 h-20 rounded-full bg-amber-500/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.5)] transform scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm"
                  >
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </button>
                </div>
                <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-black/80 text-xs text-amber-400 font-bold backdrop-blur-md border border-white/10 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tip.readTime}</span>
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30">
                    {tip.category}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white font-display group-hover:text-amber-400 transition-colors">
                  {tip.title}
                </h3>

                <p className="text-sm text-emerald-100/70 leading-relaxed mt-3">
                  {tip.summary}
                </p>
              </div>

              {/* Step Checklist */}
              {tip.steps && (
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <span className="text-xs font-bold text-amber-400/80 uppercase tracking-widest block">
                    Key Takeaways:
                  </span>
                  {tip.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-sm text-emerald-50/90 bg-white/5 p-3 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      <span className="font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>

            <button
              onClick={() => setActiveVideoUrl(tip.videoUrl)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-black text-sm flex items-center justify-center space-x-2 transition-all mt-6 shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_10px_30px_rgba(16,185,129,0.4)] transform hover:scale-[1.01]"
            >
              <Play className="w-4 h-4" />
              <span>Play Video Guide</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
