const fs = require('fs');

const replacement = `  const renderViewContent = () => {
    switch (activeView) {
      case 'users':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Users className="w-5 h-5 text-emerald-400"/> User Management</h2>
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
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
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
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><Users className="w-4 h-4 text-emerald-400"/> Total Users</div>
                  <div className="text-3xl font-black text-white mt-4">{getRegisteredUsers().length + 1520}</div>
                  <div className="text-emerald-400 text-[10px] font-bold mt-1">+12% from last week</div>
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
                  <div className="text-emerald-400 text-[10px] font-bold mt-1">System extremely stable</div>
                </div>

                <div className="md:col-span-3 glass-card p-6 rounded-2xl border border-white/10 bg-[#120508]/60 min-h-[250px] flex flex-col justify-between shadow-lg">
                  <h3 className="text-sm font-bold text-slate-300">Global Network Traffic (Last 24h)</h3>
                  <div className="flex items-end gap-2 h-40 mt-4 w-full">
                     {[40, 70, 45, 90, 65, 80, 55, 30, 50, 75, 85, 60].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-amber-500/10 to-amber-500/40 hover:to-amber-400 transition-colors rounded-t-sm" style={{ height: \`\${h}%\` }}></div>
                     ))}
                  </div>
                </div>

                <div className="md:col-span-1 glass-card p-6 rounded-2xl border border-white/10 bg-[#0A0204] space-y-4 shadow-lg flex flex-col justify-between">
                   <h3 className="text-sm font-bold text-slate-300">Quick Actions</h3>
                   <button onClick={() => setActiveView('users')} className="w-full text-left p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors text-xs font-bold text-emerald-400 border border-emerald-500/30">Manage Users</button>
                   <button onClick={() => setActiveView('logs')} className="w-full text-left p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-colors text-xs font-bold text-rose-400 border border-rose-500/30">View Server Logs</button>
                   <button onClick={() => setActiveView('analytics')} className="w-full text-left p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-colors text-xs font-bold text-blue-400 border border-blue-500/30">Traffic Analytics</button>
                </div>
              </div>
            )}

            {user.role === 'manager' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><FileText className="w-4 h-4 text-purple-400"/> Total Recipes</div>
                  <div className="text-3xl font-black text-white mt-4">1,204</div>
                  <div className="text-emerald-400 text-[10px] font-bold mt-1">+34 this week</div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><CheckCircle2 className="w-4 h-4 text-amber-400"/> Avg Rating</div>
                  <div className="text-3xl font-black text-white mt-4">4.8<span className="text-sm text-slate-500 ml-1">/5</span></div>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-2 overflow-hidden"><div className="bg-amber-400 h-1 w-[96%]"></div></div>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><Activity className="w-4 h-4 text-emerald-400"/> Premium Subs</div>
                  <div className="text-3xl font-black text-white mt-4">8,409</div>
                  <div className="text-emerald-400 text-[10px] font-bold mt-1">+892 this month</div>
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
                      <span className="text-emerald-400 font-bold">9.2k views</span>
                    </div>
                    <div className="flex justify-between items-center text-xs p-2 bg-white/5 rounded border border-white/5">
                      <span className="text-white">Mediterranean Quinoa Bowl</span>
                      <span className="text-emerald-400 font-bold">7.8k views</span>
                    </div>
                    <div className="flex justify-between items-center text-xs p-2 bg-white/5 rounded border border-white/5">
                      <span className="text-white">Elote Street Corn</span>
                      <span className="text-emerald-400 font-bold">6.5k views</span>
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
                      <div className="bg-emerald-500/20 text-emerald-100 p-2 text-xs rounded-xl rounded-tl-none">Approved! They look fantastic.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {user.role === 'staff' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-emerald-200/70 text-xs uppercase font-bold flex justify-between"><CheckCircle2 className="w-4 h-4"/> Completed Tasks</div>
                  <div className="text-3xl font-black text-emerald-400 mt-4">12</div>
                  <div className="text-emerald-400 text-[10px] font-bold mt-1">Great job today!</div>
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
                        <h4 className="text-xs font-bold text-emerald-400 uppercase border-b border-emerald-500/20 pb-2">Done</h4>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-100 shadow-lg line-through opacity-70">Prepare weekly analytics report</div>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {user.role === 'user' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold flex justify-between"><BookOpen className="w-4 h-4 text-emerald-400"/> Saved Recipes</div>
                  <div className="text-3xl font-black text-white mt-4">42</div>
                  <div className="text-emerald-400 text-[10px] font-bold mt-1">Your personal cookbook</div>
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
                <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg cursor-pointer">
                  <div className="text-emerald-400 text-xs uppercase font-bold flex justify-between"><UserIcon className="w-4 h-4"/> Dietary Profile</div>
                  <div className="text-sm font-black text-white mt-2">Vegan, Gluten-Free</div>
                  <div className="text-emerald-400 text-[10px] font-bold mt-1 underline">Edit Profile</div>
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
              </div>
            )}
          </div>
        );
    }
  };
`;

let content = fs.readFileSync('c:/Users/TECHISTICS/Documents/MLR-FullStacked/MLR_FullStacked/Source Code/src/pages/DashboardPage.jsx', 'utf8');
const regex = /const renderViewContent = \(\) => \{[\s\S]*?\n  \};\n\n  return \(/;
content = content.replace(regex, replacement + '\n  return (');
fs.writeFileSync('c:/Users/TECHISTICS/Documents/MLR-FullStacked/MLR_FullStacked/Source Code/src/pages/DashboardPage.jsx', content);
console.log('Successfully replaced!');
