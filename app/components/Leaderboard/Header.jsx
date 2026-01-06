import React, { useState } from "react";

export default function Header() {
  const [activeTab, setActiveTab] = useState("PvP");
  const [search, setSearch] = useState("");

  const categories = [
    { name: "PvP", icon: "skull" },
    { name: "PvE", icon: "target" },
    { name: "Economy", icon: "clock" },
    { name: "Building", icon: "timer" },
  ];

  return (
    <div className="container mx-auto px-4 py-10 my-20">
      {/* Header Text */}
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
          <span className="text-primary">Elite</span> Leaderboards
        </h1>
        <p className="text-foreground-muted max-w-xl mx-auto">
          The most skilled players on Black Pyramid. Compete to claim your spot at the top.
        </p>
      </div>

      {/* Controls: Tabs & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="inline-flex p-1 bg-card rounded-lg border border-border">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 h-10 px-5 py-2 gap-2 cursor-pointer ${
                activeTab === cat.name
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-foreground-muted hover:bg-secondary/20 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm pl-10 bg-card border-border text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            placeholder="Search player..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Podium Section (Top 3) */}
      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 items-end">
        {/* Rank 2 */}
        <div className="text-center order-1">
          <div className="relative p-6 rounded-xl border bg-card border-border hover:border-primary/30 transition-all">
            <div className="relative inline-block mb-3">
              <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=rust" alt="User" className="rounded-xl bg-secondary w-16 h-16 border-2 border-slate-400" />
            </div>
            <h4 className="font-heading font-bold text-foreground truncate text-sm">RustLord99</h4>
            <p className="font-heading font-bold text-xl text-primary">11,293</p>
          </div>
        </div>

        {/* Rank 1 (Tallest) */}
        <div className="text-center order-2">
          <div className="relative p-8 rounded-xl border bg-gradient-to-b from-primary/10 to-card border-primary/40 shadow-xl shadow-primary/10 scale-105">
             <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-primary animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z"/></svg>
             </div>
            <div className="relative inline-block mb-3">
              <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=shadow" alt="User" className="rounded-xl bg-secondary w-20 h-20 border-2 border-primary" />
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-[10px] font-bold text-white rounded shadow-lg">VIP</span>
            </div>
            <h4 className="font-heading font-bold text-foreground truncate">ShadowReaper</h4>
            <p className="font-heading font-bold text-2xl text-secondary">12,847</p>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="text-center order-3">
          <div className="relative p-6 rounded-xl border bg-card border-border hover:border-primary/30 transition-all">
            <div className="relative inline-block mb-3">
              <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=pyramid" alt="User" className="rounded-xl bg-secondary w-16 h-16 border-2 border-amber-700" />
            </div>
            <h4 className="font-heading font-bold text-foreground truncate text-sm">PyramidKing</h4>
            <p className="font-heading font-bold text-xl text-primary">10,521</p>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="max-w-3xl mx-auto">
        <div className="rounded-xl border border-border overflow-hidden bg-card shadow-2xl">
          <div className="p-4 border-b border-border bg-background-secondary/50">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-foreground-muted uppercase tracking-widest">
              <div className="col-span-2">Rank</div>
              <div className="col-span-7">Player</div>
              <div className="col-span-3 text-right">Score</div>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {/* Table Row Example */}
            {[1, 2, 3, 4, 5].map((row, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-white/5 transition-colors group">
                <div className="col-span-2 font-heading font-bold text-foreground-muted group-hover:text-primary transition-colors">
                  #{row + 3}
                </div>
                <div className="col-span-7 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/30 border border-border overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${row}`} alt="Avatar" />
                  </div>
                  <span className="font-medium text-foreground">Warlord_{row}00</span>
                </div>
                <div className="col-span-3 text-right font-heading font-bold text-primary">
                  {9000 - (row * 200)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
           <button className="p-2 rounded-lg border border-border bg-card text-foreground-muted hover:text-primary hover:border-primary/50 transition-all cursor-pointer">
             Prev
           </button>
           <button className="px-4 py-2 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20">1</button>
           <button className="px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-white/5 cursor-pointer">2</button>
           <button className="p-2 rounded-lg border border-border bg-card text-foreground-muted hover:text-primary hover:border-primary/50 transition-all cursor-pointer">
             Next
           </button>
        </div>
      </div>
    </div>
  );
}