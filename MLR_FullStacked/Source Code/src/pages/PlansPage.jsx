import React, { useState } from 'react';
import { Check, Shield, Star, CreditCard } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { soundSynth } from '../utils/sound';

export const PlansPage = ({ setActiveTab }) => {
  const user = getCurrentUser();
  const [processing, setProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (planName) => {
    if (!user) {
      setActiveTab('dashboard'); // Redirect to login via dashboard
      return;
    }
    
    soundSynth.playClick();
    setSelectedPlan(planName);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    soundSynth.playClick();
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      alert(`Payment successful! You are now subscribed to the ${selectedPlan} plan. Welcome to CookSmart Premium!`);
      setSelectedPlan(null);
      setActiveTab('dashboard'); // Redirect to dashboard
    }, 2500);
  };

  if (selectedPlan && user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 animate-fadeIn">
        <div className="glass-card rounded-[2rem] p-8 border border-amber-500/30 text-center space-y-6 bg-[#120508]/80 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           <h2 className="text-3xl font-black text-white font-display relative z-10">Secure Checkout</h2>
           <p className="text-rose-200/70 relative z-10">Complete your subscription to the <span className="font-bold text-amber-400">{selectedPlan}</span> Plan.</p>
           
           <form onSubmit={handlePayment} className="space-y-4 max-w-sm mx-auto relative z-10">
             <div className="space-y-1 text-left">
               <label className="text-xs font-bold uppercase text-slate-400">Cardholder Name</label>
               <input type="text" required defaultValue={user.name} className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-amber-500" />
             </div>
             <div className="space-y-1 text-left">
               <label className="text-xs font-bold uppercase text-slate-400">Card Number</label>
               <input type="text" required placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-amber-500 font-mono tracking-widest" />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1 text-left">
                 <label className="text-xs font-bold uppercase text-slate-400">Expiry (MM/YY)</label>
                 <input type="text" required placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-amber-500 font-mono" />
               </div>
               <div className="space-y-1 text-left">
                 <label className="text-xs font-bold uppercase text-slate-400">CVC</label>
                 <input type="password" required placeholder="123" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-amber-500 font-mono" />
               </div>
             </div>
             
             <button disabled={processing} className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-lg hover:brightness-110 flex items-center justify-center space-x-2 transition-all">
               {processing ? (
                 <span>Processing Secure Payment...</span>
               ) : (
                 <>
                   <CreditCard className="w-5 h-5" />
                   <span>Pay Securely</span>
                 </>
               )}
             </button>
             <button type="button" onClick={() => setSelectedPlan(null)} className="w-full py-2 text-xs text-slate-400 hover:text-white mt-2">Cancel and return to plans</button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24 animate-fadeIn pt-10">
      
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(225,29,72,0.2)]">
          Upgrade Experience
        </span>
        <h1 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight hover-glow-text">
          Choose Your <span className="text-amber-400">Plan</span>
        </h1>
        <p className="text-sm md:text-base text-rose-100/70 leading-relaxed">
          Unlock unlimited masterclasses, AI meal generation, and priority concierge support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        
        {/* Basic Plan */}
        <div className="glass-card p-8 rounded-[2rem] border border-white/10 flex flex-col space-y-6 hover:scale-105 transition-transform duration-300">
           <div className="space-y-2 border-b border-white/10 pb-6">
              <h3 className="text-2xl font-bold text-white font-display">Enthusiast</h3>
              <div className="text-4xl font-black text-amber-400">$9<span className="text-lg text-slate-400 font-medium">/mo</span></div>
              <p className="text-sm text-slate-400">For home cooks starting out.</p>
           </div>
           <ul className="space-y-4 flex-1">
              <li className="flex items-center space-x-3 text-sm text-rose-50/80"><Check className="w-5 h-5 text-rose-400" /><span>Access to 500+ standard recipes</span></li>
              <li className="flex items-center space-x-3 text-sm text-rose-50/80"><Check className="w-5 h-5 text-rose-400" /><span>Basic Meal Planner</span></li>
              <li className="flex items-center space-x-3 text-sm text-rose-50/80"><Check className="w-5 h-5 text-rose-400" /><span>Automated Grocery Lists</span></li>
           </ul>
           <button onClick={() => handleSubscribe('Enthusiast')} className="w-full py-4 rounded-xl border border-rose-500/50 text-rose-400 font-bold hover:bg-rose-500/10 transition-colors">
              {user ? 'Select Plan' : 'Login to Subscribe'}
           </button>
        </div>

        {/* Premium Plan */}
        <div className="glass-card p-8 rounded-[2rem] border border-amber-500/50 bg-[#120508]/80 shadow-[0_0_40px_rgba(251,191,36,0.15)] flex flex-col space-y-6 hover:scale-105 transition-transform duration-300 relative transform md:-translate-y-4">
           <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3">
              <span className="px-3 py-1 bg-amber-500 text-dark-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">Most Popular</span>
           </div>
           <div className="space-y-2 border-b border-white/10 pb-6">
              <h3 className="text-2xl font-bold text-white font-display">Premium Chef</h3>
              <div className="text-4xl font-black text-amber-400">$24<span className="text-lg text-slate-400 font-medium">/mo</span></div>
              <p className="text-sm text-slate-400">For serious culinary explorers.</p>
           </div>
           <ul className="space-y-4 flex-1">
              <li className="flex items-center space-x-3 text-sm text-rose-50/80"><Check className="w-5 h-5 text-amber-400" /><span>Everything in Enthusiast</span></li>
              <li className="flex items-center space-x-3 text-sm text-rose-50/80"><Check className="w-5 h-5 text-amber-400" /><span>Unlimited Masterclasses</span></li>
              <li className="flex items-center space-x-3 text-sm text-rose-50/80"><Check className="w-5 h-5 text-amber-400" /><span>CookSmart AI Agent</span></li>
              <li className="flex items-center space-x-3 text-sm text-rose-50/80"><Check className="w-5 h-5 text-amber-400" /><span>Advanced Nutritional Data</span></li>
           </ul>
           <button onClick={() => handleSubscribe('Premium Chef')} className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-dark-900 font-black hover:brightness-110 shadow-lg transition-all">
              {user ? 'Upgrade to Premium' : 'Login to Subscribe'}
           </button>
        </div>

        {/* Lifetime Plan */}
        <div className="glass-card p-8 rounded-[2rem] border border-white/10 flex flex-col space-y-6 hover:scale-105 transition-transform duration-300">
           <div className="space-y-2 border-b border-white/10 pb-6">
              <h3 className="text-2xl font-bold text-white font-display">Lifetime Pro</h3>
              <div className="text-4xl font-black text-amber-400">$399<span className="text-lg text-slate-400 font-medium">/once</span></div>
              <p className="text-sm text-slate-400">Pay once, cook forever.</p>
           </div>
           <ul className="space-y-4 flex-1">
              <li className="flex items-center space-x-3 text-sm text-rose-50/80"><Check className="w-5 h-5 text-rose-400" /><span>All Premium Features</span></li>
              <li className="flex items-center space-x-3 text-sm text-rose-50/80"><Check className="w-5 h-5 text-rose-400" /><span>1-on-1 Chef Consultations</span></li>
              <li className="flex items-center space-x-3 text-sm text-rose-50/80"><Check className="w-5 h-5 text-rose-400" /><span>Priority Concierge Support</span></li>
           </ul>
           <button onClick={() => handleSubscribe('Lifetime Pro')} className="w-full py-4 rounded-xl border border-rose-500/50 text-rose-400 font-bold hover:bg-rose-500/10 transition-colors">
              {user ? 'Select Plan' : 'Login to Subscribe'}
           </button>
        </div>
      </div>
    </div>
  );
};
