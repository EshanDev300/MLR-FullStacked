import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Users, Activity, Settings, FileText,
  LogOut, ChevronRight, BarChart3, CheckCircle2, AlertCircle, ArrowLeft, Mail, Key, User as UserIcon, BookOpen, Globe, Phone
} from 'lucide-react';
import { loginUser, registerUser, getCurrentUser, logoutUser, getRegisteredUsers, oauthLogin } from '../utils/auth';

export const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'users', 'logs', 'analytics'
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Regex Patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Min 8 chars, at least 1 letter, 1 number
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!passRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

    setLoading(true);
    try {
      if (authMode === 'register') {
        if (!name.trim()) throw new Error('Name is required for registration.');
        const newUser = await registerUser(name, email, password, phone, country);
        // Auto login after register
        const sessionUser = await loginUser(email, password);
        setUser(sessionUser);
      } else {
        const sessionUser = await loginUser(email, password);
        setUser(sessionUser);
      }
    } catch (err) {
      setError(err.message || err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setActiveView('overview');
    setEmail('');
    setPassword('');
    setPhone('');
    setCountry('');
  };

  // --- AUTHENTICATION VIEW ---
  if (!user) {
    return (
      <div className="w-full min-h-[85vh] flex items-stretch justify-center p-4 lg:p-8">
        <div className="w-full max-w-7xl glass-panel-glow border border-amber-500/40 rounded-[2rem] shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden bg-[#0A0204]/95 flex flex-col lg:flex-row">
          
          {/* Left Column: Massive Immersive Marketing */}
          <div className="lg:w-[55%] relative flex flex-col justify-between p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden group">
            {/* Background Image overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-[2s]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0204] via-[#0A0204]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0204] via-transparent to-[#0A0204]/50"></div>
            
            <div className="relative z-10 flex flex-col justify-start">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] w-fit mb-6 hover-logo-anim">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-black font-display text-white mb-4 leading-[1.1] hover-glow-text cursor-default">
                Enter the <span className="text-gradient-gold">Culinary</span> Universe
              </h1>
              <p className="text-amber-100/80 text-sm lg:text-base mb-8 max-w-lg leading-relaxed hover-glow-text cursor-default font-medium">
                Join an exclusive network of master chefs, culinary enthusiasts, and food lovers. Your unified dashboard connects you to smart meal planning, analytics, and elite recipes.
              </p>
              
              <div className="space-y-4 max-w-md">
                <div className="flex items-center space-x-4 text-sm text-slate-300 hover-glow-text cursor-default bg-black/40 p-3 rounded-xl border border-white/5 backdrop-blur-md transition-all hover:bg-black/60 hover:border-amber-500/30">
                  <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"><CheckCircle2 className="w-5 h-5" /></div>
                  <span className="font-bold">Save and organize gourmet recipes instantly</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-300 hover-glow-text cursor-default bg-black/40 p-3 rounded-xl border border-white/5 backdrop-blur-md transition-all hover:bg-black/60 hover:border-blue-500/30">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"><Activity className="w-5 h-5" /></div>
                  <span className="font-bold">Track nutritional goals and macro breakdowns</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-300 hover-glow-text cursor-default bg-black/40 p-3 rounded-xl border border-white/5 backdrop-blur-md transition-all hover:bg-black/60 hover:border-rose-500/30">
                  <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400 shadow-[0_0_10px_rgba(225,29,72,0.3)]"><Users className="w-5 h-5" /></div>
                  <span className="font-bold">Collaborate with the community and staff</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-6 border-t border-white/10 hidden md:block">
              <div className="flex items-center space-x-4 hover-glow-text cursor-default">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/150?img=11" className="w-10 h-10 rounded-full border-2 border-[#0A0204]" alt="User" />
                  <img src="https://i.pravatar.cc/150?img=32" className="w-10 h-10 rounded-full border-2 border-[#0A0204]" alt="User" />
                  <img src="https://i.pravatar.cc/150?img=49" className="w-10 h-10 rounded-full border-2 border-[#0A0204]" alt="User" />
                  <img src="https://i.pravatar.cc/150?img=68" className="w-10 h-10 rounded-full border-2 border-[#0A0204]" alt="User" />
                  <div className="w-10 h-10 rounded-full border-2 border-[#0A0204] bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg">+12k</div>
                </div>
                <div className="text-xs text-slate-400 leading-tight">
                  <strong className="text-amber-400 font-bold block text-sm tracking-wide">Trusted Globally</strong>
                  by professional chefs and restaurants
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Refined Form */}
          <div className="lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-b from-[#0A0204] to-[#120508]">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-display font-black text-white mb-2 hover-glow-text">Welcome Back</h2>
              <p className="text-xs text-slate-500 hover-glow-text">Please enter your credentials to access your secure portal.</p>
            </div>

            <div className="flex bg-black/50 p-1 rounded-xl border border-white/10 mb-8">
              <button
                onClick={() => { setAuthMode('login'); setError(''); }}
                className={`flex-1 py-2.5 text-xs font-bold transition-all rounded-lg ${authMode === 'login' ? 'bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
              >
                Secure Login
              </button>
              <button
                onClick={() => { setAuthMode('register'); setError(''); }}
                className={`flex-1 py-2.5 text-xs font-bold transition-all rounded-lg ${authMode === 'register' ? 'bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
              >
                Register Account
              </button>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 leading-relaxed font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'register' && (
                <div className="relative hover-glow-text group">
                  <UserIcon className="absolute left-4 top-3 w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-amber-400 outline-none transition-colors shadow-inner" placeholder="Full Legal Name" required={authMode==='register'} />
                </div>
              )}
              
              <div className="relative hover-glow-text group">
                <Mail className="absolute left-4 top-3 w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-amber-400 outline-none transition-colors shadow-inner" placeholder="Corporate or Personal Email" required />
              </div>
              
              {authMode === 'register' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative hover-glow-text group">
                    <Phone className="absolute left-4 top-3 w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-amber-400 outline-none transition-colors shadow-inner" placeholder="Phone No." />
                  </div>
                  <div className="relative hover-glow-text group">
                    <Globe className="absolute left-4 top-3 w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                    <input type="text" value={country} onChange={e => setCountry(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-amber-400 outline-none transition-colors shadow-inner" placeholder="Country" />
                  </div>
                </div>
              )}

              <div className="relative hover-glow-text group">
                <Key className="absolute left-4 top-3 w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-amber-400 outline-none transition-colors shadow-inner" placeholder="Password (Min 8 chars, 1 letter, 1 number)" required />
              </div>
              
              {authMode === 'register' && (
                <div className="flex items-center space-x-2 mt-2 px-1 text-xs text-slate-400">
                  <input type="checkbox" required className="accent-amber-500 w-4 h-4" id="terms" />
                  <label htmlFor="terms" className="hover:text-amber-200 transition-colors cursor-pointer">I agree to the Terms of Service & Privacy Policy</label>
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 mt-6 flex justify-center items-center rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-[1.02] transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>
                <div className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span className="font-black tracking-widest uppercase text-xs">{authMode === 'login' ? 'Authenticate & Enter' : 'Create Account'}</span>
                  )}
                </div>
              </button>
            </form>

            <div className="mt-8 text-center text-xs text-slate-500 hover-glow-text cursor-default border-t border-white/10 pt-6">
              <p>Protected by enterprise-grade 256-bit encryption.</p>
              <p className="mt-2">Need help accessing your account? <a href="#" className="text-amber-400 hover:underline hover:text-amber-300 transition-colors font-bold">Contact Support</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW (LOGGED IN) ---
    const renderViewContent = () => {
    switch (activeView) {
      case 'users':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Users className="w-5 h-5 text-rose-400"/> User Management</h2>
            <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-white/5 text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {getRegisteredUsers().length === 0 && (
                    <tr><td colSpan="3" className="px-4 py-6 text-center text-slate-500">No external users registered yet.</td></tr>
                  )}
                  {getRegisteredUsers().map(u => (
                    <tr key={u.id} className="text-amber-50">
                      <td className="px-4 py-3">{u.name}</td>
                      <td className="px-4 py-3 text-amber-200/70">{u.email}</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] uppercase font-black">{u.role}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'logs':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><AlertCircle className="w-5 h-5 text-rose-400"/> System Logs</h2>
            <div className="glass-card border border-white/10 rounded-2xl p-4 space-y-2 bg-black/60 font-mono text-xs">
              <p className="text-green-400">[OK] Database connection verified at 08:00 AM</p>
              <p className="text-amber-400">[WARN] High memory usage detected on node-1 at 09:12 AM</p>
              <p className="text-green-400">[OK] Successful login by Admin at {new Date().toLocaleTimeString()}</p>
              <p className="text-slate-400">Waiting for new events...</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-400"/> Analytics Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-200/70 uppercase font-bold">Total Recipes</p>
                <p className="text-3xl font-black text-white mt-1">214</p>
              </div>
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <p className="text-xs text-emerald-200/70 uppercase font-bold">Active Users</p>
                <p className="text-3xl font-black text-white mt-1">1,029</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <p className="text-xs text-purple-200/70 uppercase font-bold">New Registrations</p>
                <p className="text-3xl font-black text-white mt-1">+48</p>
              </div>
            </div>
          </div>
        );
      case 'overview':
      default:
        return (
          <div className="animate-fadeIn space-y-6">
            {user.role === 'admin' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><Users className="w-4 h-4 text-rose-400"/> Total Users</div>
                  <div className="text-3xl font-black text-white mt-4">{getRegisteredUsers().length + 1520}</div>
                  <div className="text-rose-400 text-[10px] font-bold mt-1">+12% from last week</div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><Activity className="w-4 h-4 text-amber-400"/> Active Sessions</div>
                  <div className="text-3xl font-black text-white mt-4">342</div>
                  <div className="text-amber-400 text-[10px] font-bold mt-1">Peak traffic hour</div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><Activity className="w-4 h-4 text-blue-400"/> CPU Load</div>
                  <div className="text-3xl font-black text-white mt-4">42%</div>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-2 overflow-hidden"><div className="bg-blue-400 h-1 w-[42%]"></div></div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><AlertCircle className="w-4 h-4 text-rose-400"/> Error Rate</div>
                  <div className="text-3xl font-black text-white mt-4">0.05%</div>
                  <div className="text-rose-400 text-[10px] font-bold mt-1">System extremely stable</div>
                </div>

                <div className="md:col-span-3 glass-card p-6 rounded-2xl border border-white/10 bg-[#120508]/60 min-h-[250px] flex flex-col justify-between shadow-lg">
                  <h3 className="text-sm font-bold text-slate-300">Global Network Traffic (Last 24h)</h3>
                  <div className="flex items-end gap-2 h-40 mt-4 w-full">
                     {[40, 70, 45, 90, 65, 80, 55, 30, 50, 75, 85, 60].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-amber-500/10 to-amber-500/40 hover:to-amber-400 transition-colors rounded-t-sm" style={{ height: `${h}%` }}></div>
                     ))}
                  </div>
                </div>

                <div className="md:col-span-1 glass-card p-6 rounded-2xl border border-white/10 bg-[#0A0204] space-y-4 shadow-lg flex flex-col justify-between">
                   <h3 className="text-sm font-bold text-slate-300">Quick Actions</h3>
                   <button onClick={() => setActiveView('users')} className="w-full text-left p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-colors text-xs font-bold text-rose-400 border border-rose-500/30">Manage Users</button>
                   <button onClick={() => setActiveView('logs')} className="w-full text-left p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-colors text-xs font-bold text-rose-400 border border-rose-500/30">View Server Logs</button>
                   <button onClick={() => setActiveView('analytics')} className="w-full text-left p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-colors text-xs font-bold text-blue-400 border border-blue-500/30">Traffic Analytics</button>
                </div>
                
                <div className="md:col-span-4 glass-card p-6 rounded-2xl border border-white/10 bg-[#0A0204]/60 shadow-2xl mt-2">
                  <h3 className="text-sm font-bold text-slate-300 mb-4">Live Cluster Nodes & Security status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     <div className="bg-white/5 p-4 rounded-xl border border-rose-500/30 flex justify-between items-center shadow-lg"><span className="text-rose-400 font-bold text-xs">Node ALPHA - API</span><span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span></div>
                     <div className="bg-white/5 p-4 rounded-xl border border-rose-500/30 flex justify-between items-center shadow-lg"><span className="text-rose-400 font-bold text-xs">Node BETA - Database</span><span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span></div>
                     <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 flex justify-between items-center shadow-lg"><span className="text-amber-400 font-bold text-xs">Node GAMMA - Search (Load)</span><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span></div>
                     <div className="bg-white/5 p-4 rounded-xl border border-rose-500/30 flex justify-between items-center shadow-lg"><span className="text-rose-400 font-bold text-xs">Node DELTA - Analytics</span><span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span></div>
                  </div>
                </div>
              </div>
            )}

            {user.role === 'manager' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><FileText className="w-4 h-4 text-purple-400"/> Total Recipes</div>
                  <div className="text-3xl font-black text-white mt-4">1,204</div>
                  <div className="text-rose-400 text-[10px] font-bold mt-1">+34 this week</div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><CheckCircle2 className="w-4 h-4 text-amber-400"/> Avg Rating</div>
                  <div className="text-3xl font-black text-white mt-4">4.8<span className="text-sm text-slate-500 ml-1">/5</span></div>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-2 overflow-hidden"><div className="bg-amber-400 h-1 w-[96%]"></div></div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><Activity className="w-4 h-4 text-rose-400"/> Premium Subs</div>
                  <div className="text-3xl font-black text-white mt-4">8,409</div>
                  <div className="text-rose-400 text-[10px] font-bold mt-1">+892 this month</div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><Users className="w-4 h-4 text-rose-400"/> Pending Auth</div>
                  <div className="text-3xl font-black text-white mt-4">14</div>
                  <div className="text-rose-400 text-[10px] font-bold mt-1">Requires attention</div>
                </div>

                <div className="md:col-span-2 glass-card p-6 rounded-2xl border border-white/10 min-h-[200px] flex flex-col justify-between shadow-lg">
                  <h3 className="text-sm font-bold text-slate-300">Top Performing Recipes</h3>
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center text-xs p-2 bg-white/5 rounded border border-white/5">
                      <span className="text-white">Truffle Parmesan Fries</span>
                      <span className="text-rose-400 font-bold">9.2k views</span>
                    </div>
                    <div className="flex justify-between items-center text-xs p-2 bg-white/5 rounded border border-white/5">
                      <span className="text-white">Mediterranean Quinoa Bowl</span>
                      <span className="text-rose-400 font-bold">7.8k views</span>
                    </div>
                    <div className="flex justify-between items-center text-xs p-2 bg-white/5 rounded border border-white/5">
                      <span className="text-white">Elote Street Corn</span>
                      <span className="text-rose-400 font-bold">6.5k views</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 glass-card p-6 rounded-2xl border border-white/10 min-h-[200px] flex flex-col justify-between shadow-lg">
                  <h3 className="text-sm font-bold text-slate-300">Team Chat</h3>
                  <div className="space-y-3 mt-4">
                    <div className="flex gap-3 items-start">
                      <img src="https://i.pravatar.cc/150?img=12" className="w-6 h-6 rounded-full" />
                      <div className="bg-blue-500/20 text-blue-100 p-2 text-xs rounded-xl rounded-tl-none">Please review the new dessert recipes.</div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <img src="https://i.pravatar.cc/150?img=47" className="w-6 h-6 rounded-full" />
                      <div className="bg-rose-500/20 text-emerald-100 p-2 text-xs rounded-xl rounded-tl-none">Approved! They look fantastic.</div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 glass-card p-6 rounded-2xl border border-white/10 shadow-lg mt-2 bg-[#0A0204]/60">
                  <h3 className="text-sm font-bold text-slate-300 mb-4">Content Moderation Queue</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 text-slate-400"><tr><th className="p-3 rounded-tl-lg">Content Title</th><th className="p-3">Author</th><th className="p-3">Status</th><th className="p-3 rounded-tr-lg text-right">Action</th></tr></thead>
                      <tbody className="divide-y divide-white/5 text-amber-50/80">
                        <tr className="hover:bg-white/5 transition-colors"><td className="p-3 font-bold">Spicy Arrabiata Authentic</td><td className="p-3 text-emerald-200/70">Chef Luigi</td><td className="p-3"><span className="text-amber-400 bg-amber-500/10 px-2 py-1 rounded">Pending Review</span></td><td className="p-3 text-right"><button className="text-rose-400 font-bold hover:text-emerald-300 border border-rose-500/30 px-3 py-1 rounded bg-rose-500/10">Approve</button></td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="p-3 font-bold">Vegan Tacos Al Pastor</td><td className="p-3 text-emerald-200/70">Sarah Cook</td><td className="p-3"><span className="text-amber-400 bg-amber-500/10 px-2 py-1 rounded">Pending Review</span></td><td className="p-3 text-right"><button className="text-rose-400 font-bold hover:text-emerald-300 border border-rose-500/30 px-3 py-1 rounded bg-rose-500/10">Approve</button></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {user.role === 'staff' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5 hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-emerald-200/70 text-xs uppercase font-bold flex justify-between"><CheckCircle2 className="w-4 h-4"/> Completed Tasks</div>
                  <div className="text-3xl font-black text-rose-400 mt-4">12</div>
                  <div className="text-rose-400 text-[10px] font-bold mt-1">Great job today!</div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-amber-200/70 text-xs uppercase font-bold flex justify-between"><Activity className="w-4 h-4"/> Open Tickets</div>
                  <div className="text-3xl font-black text-amber-400 mt-4">4</div>
                  <div className="text-amber-400 text-[10px] font-bold mt-1">Requires attention</div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-blue-200/70 text-xs uppercase font-bold flex justify-between"><FileText className="w-4 h-4"/> Assigned Shifts</div>
                  <div className="text-3xl font-black text-blue-400 mt-4">5</div>
                  <div className="text-blue-400 text-[10px] font-bold mt-1">This week</div>
                </div>

                <div className="md:col-span-3 glass-card p-6 rounded-2xl border border-white/10 bg-[#120508]/60 min-h-[300px] shadow-lg">
                  <h3 className="text-sm font-bold text-slate-300 mb-6">Kanban Task Board</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase border-b border-white/10 pb-2">To Do</h4>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white shadow-lg">Audit seasonal ingredients list<br/><span className="text-[9px] text-slate-500">Due: Today</span></div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white shadow-lg">Check new recipe submissions<br/><span className="text-[9px] text-slate-500">Due: Tomorrow</span></div>
                     </div>
                     <div className="space-y-3">
                        <h4 className="text-xs font-bold text-amber-400 uppercase border-b border-amber-500/20 pb-2">In Progress</h4>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-100 shadow-lg">Review flagged user comments<br/><span className="text-[9px] text-amber-500/70">Started 2h ago</span></div>
                     </div>
                     <div className="space-y-3">
                        <h4 className="text-xs font-bold text-rose-400 uppercase border-b border-rose-500/20 pb-2">Done</h4>
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-emerald-100 shadow-lg line-through opacity-70">Prepare weekly analytics report</div>
                     </div>
                  </div>
                </div>

                <div className="md:col-span-3 glass-card p-6 rounded-2xl border border-white/10 shadow-lg mt-2 bg-[#0A0204]/60">
                  <h3 className="text-sm font-bold text-slate-300 mb-4">Upcoming Schedule & Roster</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors cursor-default">
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-widest">Tomorrow</div>
                      <div className="text-lg font-black text-white my-1">08:00 AM - 04:00 PM</div>
                      <div className="text-[10px] text-rose-400 font-bold bg-rose-500/10 inline-block px-2 py-0.5 rounded">Prep Station</div>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors cursor-default">
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-widest">Friday</div>
                      <div className="text-lg font-black text-white my-1">10:00 AM - 06:00 PM</div>
                      <div className="text-[10px] text-amber-400 font-bold bg-amber-500/10 inline-block px-2 py-0.5 rounded">Line Cook (Hot)</div>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-center opacity-50 cursor-not-allowed">
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-widest">Saturday</div>
                      <div className="text-lg font-black text-white my-1">DAY OFF</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {user.role === 'user' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><BookOpen className="w-4 h-4 text-rose-400"/> Saved Recipes</div>
                  <div className="text-3xl font-black text-white mt-4">42</div>
                  <div className="text-rose-400 text-[10px] font-bold mt-1">Your personal cookbook</div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><Activity className="w-4 h-4 text-amber-400"/> Meals Planned</div>
                  <div className="text-3xl font-black text-white mt-4">4<span className="text-sm text-slate-500 ml-1">/10</span></div>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-2 overflow-hidden"><div className="bg-gradient-to-r from-rose-500 to-amber-500 h-1 w-[40%]"></div></div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><Activity className="w-4 h-4 text-rose-400"/> Cook Streak</div>
                  <div className="text-3xl font-black text-white mt-4">7 Days</div>
                  <div className="text-rose-400 text-[10px] font-bold mt-1">You are on fire! 🔥</div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg cursor-pointer">
                  <div className="text-rose-400 text-xs uppercase font-bold flex justify-between"><UserIcon className="w-4 h-4"/> Dietary Profile</div>
                  <div className="text-sm font-black text-white mt-2">Vegan, Gluten-Free</div>
                  <div className="text-rose-400 text-[10px] font-bold mt-1 underline">Edit Profile</div>
                </div>

                <div className="md:col-span-4 glass-card p-6 rounded-2xl border border-white/10 bg-[#120508]/60 shadow-lg mt-2">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-sm font-bold text-slate-300">Recommended for you</h3>
                     <span className="text-xs text-amber-400 hover:underline cursor-pointer">View all</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="bg-black/40 rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-colors group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="p-4">
                           <div className="text-xs font-bold text-white mb-1">Gourmet Salad Bowl</div>
                           <div className="text-[10px] text-slate-400">15 mins • 350 kcal</div>
                        </div>
                     </div>
                     <div className="bg-black/40 rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-colors group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80" className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="p-4">
                           <div className="text-xs font-bold text-white mb-1">Mediterranean Masterpiece</div>
                           <div className="text-[10px] text-slate-400">25 mins • 420 kcal</div>
                        </div>
                     </div>
                     <div className="bg-black/40 rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-colors group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80" className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="p-4">
                           <div className="text-xs font-bold text-white mb-1">Truffle Tapas</div>
                           <div className="text-[10px] text-slate-400">10 mins • 210 kcal</div>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="md:col-span-4 glass-card p-6 rounded-2xl border border-rose-500/30 shadow-2xl mt-2 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#0A0204] to-emerald-900/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url(\'https://www.transparenttextures.com/patterns/cubes.png\')] opacity-10"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h3 className="text-xl font-black text-white mb-1 drop-shadow-md">Masterclass Unlock Available!</h3>
                    <p className="text-sm text-emerald-100/90 font-medium">You have earned enough culinary points to unlock \'Advanced Knife Skills\' course.</p>
                  </div>
                  <button className="relative z-10 px-8 py-3 bg-amber-500 text-dark-900 rounded-xl font-black text-sm shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:brightness-110 hover:scale-105 transition-all mt-4 md:mt-0 uppercase tracking-widest">
                    Redeem Now
                  </button>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 space-y-5 pb-8 pt-4">
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel border border-white/10 p-6 rounded-3xl bg-[#0A0204]/80 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <div className={`p-4 rounded-full border ${
            user.role === 'admin' ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' :
            user.role === 'manager' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
            user.role === 'staff' ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' :
            'bg-slate-500/20 border-slate-500/30 text-slate-400'
          }`}>
            {activeView !== 'overview' ? (
              <button onClick={() => setActiveView('overview')} className="hover:scale-110 transition-transform">
                <ArrowLeft className="w-6 h-6" />
              </button>
            ) : (
              <ShieldCheck className="w-8 h-8" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black font-display text-white">
                {activeView === 'overview' ? `Welcome, ${user.name}` : `Dashboard / ${activeView.charAt(0).toUpperCase() + activeView.slice(1)}`}
              </h1>
              <span className="flex items-center space-x-1 text-[10px] text-green-400 font-bold px-2 py-0.5 rounded-full bg-green-900/40 border border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>ONLINE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Role: <span className="text-amber-400">{user.role}</span> | {user.email}
            </p>
          </div>
        </div>

        <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 border border-rose-500/30 transition-colors text-white text-xs font-bold">
          <LogOut className="w-4 h-4" />
          <span>Secure Logout</span>
        </button>
      </div>

      {/* Render Dynamic View */}
      {renderViewContent()}
      
    </div>
  );
};
