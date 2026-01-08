import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"; 

export default function Header() {
  const [activeTab, setActiveTab] = useState("PvP");
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Added for pagination
  
  const navigate = useNavigate(); 

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const categories = [
    { name: "PvP", key: "pvp" },
    { name: "PvE", key: "pve" },
    { name: "Economy", key: "economy" },
    { name: "Building", key: "building" },
  ];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const type = categories.find(c => c.name === activeTab)?.key || "pvp";
        const response = await fetch(`${API_URL}/api/rust/leaderboard?leaderBoard_type=${type}`, {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const data = await response.json();
        setPlayers(Array.isArray(data) ? data : []);
        setCurrentPage(1); // Reset to page 1 when tab changes
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeTab]);

  const filteredPlayers = players.filter(p => 
    p.username.toLowerCase().includes(search.toLowerCase()) || 
    p.steam_id.toString().includes(search)
  );

  // PAGINATION LOGIC
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPlayers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);

  // Podium only shows on Page 1
  const top3 = currentPage === 1 ? currentItems.slice(0, 3) : [];
  const tablePlayers = currentPage === 1 ? currentItems.slice(3) : currentItems;

  const handlePlayerClick = (steamId) => {
    navigate(`/profile/${steamId}`);
  };

  return (
    <div className="container mx-auto px-4 py-10 my-20">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
          <span className="text-primary">Elite</span> Leaderboards
        </h1>
        <p className="text-foreground-muted max-w-xl mx-auto">
          The most skilled players on Black Pyramid. Compete to claim your spot at the top.
        </p>
      </div>

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
            placeholder="Search username or Steam ID..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
            }}
          />
        </div>
      </div>

      {!loading && top3.length > 0 && (
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 items-end">
          {top3[1] && (
            <div className="text-center order-1 cursor-pointer group" onClick={() => handlePlayerClick(top3[1].steam_id)}>
              <div className="relative p-6 rounded-xl border bg-card border-border group-hover:border-primary/50 transition-all">
                <div className="relative inline-block mb-3">
                  <img src={top3[1].avatar || `https://api.dicebear.com/7.x/thumbs/svg?seed=${top3[1].steam_id}`} alt="User" className="rounded-xl bg-secondary w-16 h-16 border-2 border-slate-400 object-cover" />
                </div>
                <h4 className="font-heading font-bold text-foreground truncate text-sm">{top3[1].username}</h4>
                <p className="font-heading font-bold text-xl text-primary">{top3[1].score}</p>
              </div>
            </div>
          )}
          {top3[0] && (
            <div className="text-center order-2 cursor-pointer group" onClick={() => handlePlayerClick(top3[0].steam_id)}>
              <div className="relative p-8 rounded-xl border bg-gradient-to-b from-primary/10 to-card border-primary/40 shadow-xl shadow-primary/10 scale-105 group-hover:shadow-primary/20 transition-all">
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-primary animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z"/></svg>
                </div>
                <div className="relative inline-block mb-3">
                  <img src={top3[0].avatar || `https://api.dicebear.com/7.x/thumbs/svg?seed=${top3[0].steam_id}`} alt="User" className="rounded-xl bg-secondary w-20 h-20 border-2 border-primary object-cover" />
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-[10px] font-bold text-white rounded shadow-lg">#1</span>
                </div>
                <h4 className="font-heading font-bold text-foreground truncate">{top3[0].username}</h4>
                <p className="font-heading font-bold text-2xl text-secondary">{top3[0].score}</p>
              </div>
            </div>
          )}
          {top3[2] && (
            <div className="text-center order-3 cursor-pointer group" onClick={() => handlePlayerClick(top3[2].steam_id)}>
              <div className="relative p-6 rounded-xl border bg-card border-border group-hover:border-primary/50 transition-all">
                <div className="relative inline-block mb-3">
                  <img src={top3[2].avatar || `https://api.dicebear.com/7.x/thumbs/svg?seed=${top3[2].steam_id}`} alt="User" className="rounded-xl bg-secondary w-16 h-16 border-2 border-amber-700 object-cover" />
                </div>
                <h4 className="font-heading font-bold text-foreground truncate text-sm">{top3[2].username}</h4>
                <p className="font-heading font-bold text-xl text-primary">{top3[2].score}</p>
              </div>
            </div>
          )}
        </div>
      )}

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
            {loading ? (
              <div className="p-10 text-center text-foreground-muted italic">Loading leaderboard stats...</div>
            ) : currentItems.length > 0 ? (
              tablePlayers.map((player, i) => (
                <div 
                  key={player.steam_id} 
                  onClick={() => handlePlayerClick(player.steam_id)}
                  className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="col-span-2 font-heading font-bold text-foreground-muted group-hover:text-primary transition-colors">
                    #{indexOfFirstItem + (currentPage === 1 ? i + 4 : i + 1)}
                  </div>
                  <div className="col-span-7 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/30 border border-border overflow-hidden">
                      <img src={player.avatar || `https://api.dicebear.com/7.x/thumbs/svg?seed=${player.steam_id}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium text-foreground">{player.username}</span>
                  </div>
                  <div className="col-span-3 text-right font-heading font-bold text-primary">
                    {player.score}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-foreground-muted">No players found.</div>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 rounded-lg bg-card border border-border text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary/50 transition-all"
            >
              Previous
            </button>
            <span className="text-foreground-muted text-sm font-medium">
              Page <span className="text-primary">{currentPage}</span> of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 rounded-lg bg-card border border-border text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary/50 transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}