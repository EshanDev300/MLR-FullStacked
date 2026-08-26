import React, { useState } from 'react';
import { Mail, Send, Star, CheckCircle, MessageSquare, MapPin, Phone, Clock } from 'lucide-react';
import { saveFeedback } from '../utils/db';
import { soundSynth } from '../utils/sound';

export const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Feedback');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    saveFeedback({ name, email, category, rating, message });
    soundSynth.playClick();
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24 animate-fadeIn pt-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          VIP Support & Concierge
        </span>
        <h1 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight hover-glow-text">
          Get in <span className="text-amber-400">Touch</span>
        </h1>
        <p className="text-sm md:text-base text-emerald-100/70 leading-relaxed">
          Need assistance with a recipe? Want to book a private masterclass? Our culinary concierge team is available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Bento Box */}
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[2rem] border border-rose-500/20 bg-[#120508]/80 space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/20 transition-colors" />
            
            <div className="space-y-6 relative z-10">
              <h3 className="text-xl font-bold text-white font-display">Contact Information</h3>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Global Headquarters</h4>
                  <p className="text-xs text-amber-100/60 mt-1">123 Culinary Avenue, Michelin District<br/>Paris, France 75001</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Priority Phone Line</h4>
                  <p className="text-xs text-amber-100/60 mt-1">+1 (800) 555-CHEF<br/><span className="text-rose-400 font-bold">Available 24/7</span></p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Email Concierge</h4>
                  <p className="text-xs text-amber-100/60 mt-1">concierge@cooksmart.app<br/>support@cooksmart.app</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-[2rem] border border-rose-500/20 bg-gradient-to-br from-[#120508] to-[#010D09] shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(225, 29, 72, 1) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
             <div className="relative z-10 text-center space-y-2">
                <Clock className="w-8 h-8 text-amber-400 mx-auto" />
                <h3 className="font-bold text-white text-sm">Response Time</h3>
                <p className="text-xs text-emerald-100/60">Average concierge response time is under <strong className="text-rose-400">5 minutes</strong> for Premium Members.</p>
             </div>
          </div>
        </div>

        {/* Contact Form Box */}
        <div className="lg:col-span-2 glass-panel p-8 md:p-10 rounded-[2.5rem] border border-rose-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-[#120508]/90">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="block text-xs font-bold uppercase text-rose-400 tracking-wider">Your Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Gordon Ramsay"
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-rose-500 focus:bg-black/60 transition-all shadow-inner hover-glow-text"
                  required
                />
              </div>
              <div className="space-y-2 group">
                <label className="block text-xs font-bold uppercase text-rose-400 tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chef@restaurant.com"
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-rose-500 focus:bg-black/60 transition-all shadow-inner hover-glow-text"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="block text-xs font-bold uppercase text-rose-400 tracking-wider">Inquiry Subject</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-rose-500 focus:bg-black/60 transition-all appearance-none cursor-pointer hover-glow-text"
                >
                  <option value="Feedback">App Feedback & Suggestions</option>
                  <option value="Recipe Suggestion">Submit a Recipe</option>
                  <option value="AI Agent Query">CookSmart AI Assistance</option>
                  <option value="Masterclass">Masterclass Registration</option>
                  <option value="Technical Bug">Technical Support</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-rose-400 tracking-wider">Rate your Experience</label>
                <div className="flex items-center space-x-3 pt-2 bg-black/40 px-5 py-3 rounded-2xl border border-white/10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="block text-xs font-bold uppercase text-rose-400 tracking-wider">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="How can our culinary team assist you today?"
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-rose-500 focus:bg-black/60 transition-all shadow-inner resize-none hover-glow-text"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-black text-lg shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all flex items-center justify-center space-x-3 transform hover:scale-[1.01] active:scale-[0.99]"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-6 h-6 animate-pulse" />
                  <span>Message Sent Successfully!</span>
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  <span>Send Secure Message</span>
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};
