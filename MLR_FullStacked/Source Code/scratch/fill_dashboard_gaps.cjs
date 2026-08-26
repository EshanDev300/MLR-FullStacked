const fs = require('fs');

let content = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

// We will locate the exact closing divs for each role block and inject new content before them.

const adminMarker = `                   <button onClick={() => setActiveView('analytics')} className="w-full text-left p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-colors text-xs font-bold text-blue-400 border border-blue-500/30">Traffic Analytics</button>
                </div>`;
                
const adminAdd = `                   <button onClick={() => setActiveView('analytics')} className="w-full text-left p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-colors text-xs font-bold text-blue-400 border border-blue-500/30">Traffic Analytics</button>
                </div>
                
                <div className="md:col-span-4 glass-card p-6 rounded-2xl border border-white/10 bg-[#011A11]/60 shadow-2xl mt-2">
                  <h3 className="text-sm font-bold text-slate-300 mb-4">Live Cluster Nodes & Security status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     <div className="bg-white/5 p-4 rounded-xl border border-emerald-500/30 flex justify-between items-center shadow-lg"><span className="text-emerald-400 font-bold text-xs">Node ALPHA - API</span><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span></div>
                     <div className="bg-white/5 p-4 rounded-xl border border-emerald-500/30 flex justify-between items-center shadow-lg"><span className="text-emerald-400 font-bold text-xs">Node BETA - Database</span><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span></div>
                     <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 flex justify-between items-center shadow-lg"><span className="text-amber-400 font-bold text-xs">Node GAMMA - Search (Load)</span><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span></div>
                     <div className="bg-white/5 p-4 rounded-xl border border-emerald-500/30 flex justify-between items-center shadow-lg"><span className="text-emerald-400 font-bold text-xs">Node DELTA - Analytics</span><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span></div>
                  </div>
                </div>`;

content = content.replace(adminMarker, adminAdd);


const managerMarker = `                      <div className="bg-emerald-500/20 text-emerald-100 p-2 text-xs rounded-xl rounded-tl-none">Approved! They look fantastic.</div>
                    </div>
                  </div>
                </div>`;
                
const managerAdd = `                      <div className="bg-emerald-500/20 text-emerald-100 p-2 text-xs rounded-xl rounded-tl-none">Approved! They look fantastic.</div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 glass-card p-6 rounded-2xl border border-white/10 shadow-lg mt-2 bg-[#011A11]/60">
                  <h3 className="text-sm font-bold text-slate-300 mb-4">Content Moderation Queue</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 text-slate-400"><tr><th className="p-3 rounded-tl-lg">Content Title</th><th className="p-3">Author</th><th className="p-3">Status</th><th className="p-3 rounded-tr-lg text-right">Action</th></tr></thead>
                      <tbody className="divide-y divide-white/5 text-amber-50/80">
                        <tr className="hover:bg-white/5 transition-colors"><td className="p-3 font-bold">Spicy Arrabiata Authentic</td><td className="p-3 text-emerald-200/70">Chef Luigi</td><td className="p-3"><span className="text-amber-400 bg-amber-500/10 px-2 py-1 rounded">Pending Review</span></td><td className="p-3 text-right"><button className="text-emerald-400 font-bold hover:text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded bg-emerald-500/10">Approve</button></td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="p-3 font-bold">Vegan Tacos Al Pastor</td><td className="p-3 text-emerald-200/70">Sarah Cook</td><td className="p-3"><span className="text-amber-400 bg-amber-500/10 px-2 py-1 rounded">Pending Review</span></td><td className="p-3 text-right"><button className="text-emerald-400 font-bold hover:text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded bg-emerald-500/10">Approve</button></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>`;

content = content.replace(managerMarker, managerAdd);


const staffMarker = `                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-100 shadow-lg line-through opacity-70">Prepare weekly analytics report</div>
                     </div>
                  </div>
                </div>`;

const staffAdd = `                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-100 shadow-lg line-through opacity-70">Prepare weekly analytics report</div>
                     </div>
                  </div>
                </div>

                <div className="md:col-span-3 glass-card p-6 rounded-2xl border border-white/10 shadow-lg mt-2 bg-[#011A11]/60">
                  <h3 className="text-sm font-bold text-slate-300 mb-4">Upcoming Schedule & Roster</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors cursor-default">
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-widest">Tomorrow</div>
                      <div className="text-lg font-black text-white my-1">08:00 AM - 04:00 PM</div>
                      <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 inline-block px-2 py-0.5 rounded">Prep Station</div>
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
                </div>`;

content = content.replace(staffMarker, staffAdd);


const userMarker = `                     </div>
                  </div>
                </div>`;
                
const userAdd = `                     </div>
                  </div>
                </div>

                <div className="md:col-span-4 glass-card p-6 rounded-2xl border border-emerald-500/30 shadow-2xl mt-2 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#011A11] to-emerald-900/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h3 className="text-xl font-black text-white mb-1 drop-shadow-md">Masterclass Unlock Available!</h3>
                    <p className="text-sm text-emerald-100/90 font-medium">You have earned enough culinary points to unlock 'Advanced Knife Skills' course.</p>
                  </div>
                  <button className="relative z-10 px-8 py-3 bg-amber-500 text-dark-900 rounded-xl font-black text-sm shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:brightness-110 hover:scale-105 transition-all mt-4 md:mt-0 uppercase tracking-widest">
                    Redeem Now
                  </button>
                </div>`;

// need to be careful with userMarker since there might be multiple of those divs closing. Let's just use replaceLast or match specific chunk.
// I'll manually replace it by finding the exact string of the user block.

let splitStr = `                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                </div>`;

content = content.replace(splitStr, splitStr.replace('</div>\n                </div>', '</div>\n                </div>\n\n                <div className="md:col-span-4 glass-card p-6 rounded-2xl border border-emerald-500/30 shadow-2xl mt-2 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#011A11] to-emerald-900/40 relative overflow-hidden">\n                  <div className="absolute inset-0 bg-[url(\\\'https://www.transparenttextures.com/patterns/cubes.png\\\')] opacity-10"></div>\n                  <div className="relative z-10 text-center md:text-left">\n                    <h3 className="text-xl font-black text-white mb-1 drop-shadow-md">Masterclass Unlock Available!</h3>\n                    <p className="text-sm text-emerald-100/90 font-medium">You have earned enough culinary points to unlock \\\'Advanced Knife Skills\\\' course.</p>\n                  </div>\n                  <button className="relative z-10 px-8 py-3 bg-amber-500 text-dark-900 rounded-xl font-black text-sm shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:brightness-110 hover:scale-105 transition-all mt-4 md:mt-0 uppercase tracking-widest">\n                    Redeem Now\n                  </button>\n                </div>'));

fs.writeFileSync('src/pages/DashboardPage.jsx', content);
console.log('Finished updating dashboard gaps');
