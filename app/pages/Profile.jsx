import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { jwtDecode } from 'jwt-decode';

export default function Profile() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const response = await fetch(`http://localhost:8000/api/rust/player/${decoded.steamId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        // Assuming your API returns an array, we take the first item
        setPlayer(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-foreground-muted font-heading animate-pulse">SYNCHRONIZING DATA...</p>
    </div>
  );

  if (!player) return null;

  const kd = player.pvp_deaths > 0 ? (player.pvp_kills / player.pvp_deaths).toFixed(2) : player.pvp_kills;

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        {/* Profile Header Card */}
        <div className="relative rounded-3xl border border-white/5 bg-card/50 backdrop-blur-xl overflow-hidden mb-8 shadow-2xl">
          {/* Decorative Banner Background */}
          <div className="h-40 bg-gradient-to-br from-primary/30 via-primary/5 to-transparent relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 relative">
              {/* Avatar with Glow */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <img 
                  src={player.avatar} 
                  alt={player.username} 
                  className="relative w-32 h-32 rounded-2xl border-4 border-background bg-secondary object-cover shadow-2xl" 
                />
                <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-black border-4 border-background shadow-lg">
                  ONLINE
                </div>
              </div>

              {/* User Identity */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-3xl md:text-4xl font-black font-heading tracking-tighter uppercase italic">
                    {player.username}
                  </h1>
                  {/* badges will go here insha2 allah */}
                  {/* <div className="flex justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black rounded-md tracking-widest uppercase">
                      VETERAN
                    </span>
                  </div> */}
                </div>
                <p className="text-sm text-foreground-muted font-mono bg-white/5 inline-block px-3 py-1 rounded-md border border-white/5">
                  ID: {player.steam_id}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full md:w-auto">
                <a 
                  href={`https://steamcommunity.com/profiles/${player.steam_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 font-bold text-sm"
                >
                  STEAM PROFILE
                </a>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-xl transition-all duration-300 font-bold text-sm"
                >
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Stats (Left 3 Columns) */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="PVP Kills" value={player.pvp_kills} color="text-primary" />
            <StatCard label="PVP Deaths" value={player.pvp_deaths} color="text-red-400" />
            <StatCard label="K/D Ratio" value={kd} color="text-yellow-400" />
            <StatCard label="PVE Kills" value={player.pve_kills} color="text-blue-400" />
          </div>

          {/* Right Column: Server Activity */}
          <div className="p-6 rounded-3xl bg-card/30 border border-white/5 backdrop-blur-sm flex flex-col justify-center items-center text-center">
             <p className="text-[10px] font-black tracking-[0.2em] text-foreground-muted uppercase mb-2">Last Activity</p>
             <h3 className="text-xl font-bold font-heading text-primary">
               {new Date(player.last_seen).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
             </h3>
             <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                <div className="w-full h-full bg-primary opacity-50 shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="group relative p-6 rounded-3xl bg-card/40 border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-xl overflow-hidden">
      {/* Background Accent */}
      <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-3xl opacity-10 ${color.replace('text', 'bg')}`}></div>
      
      <p className="text-[10px] font-black tracking-[0.2em] text-foreground-muted uppercase mb-3 transition-colors group-hover:text-primary">
        {label}
      </p>
      <div className={`text-3xl font-black font-heading tracking-tight ${color}`}>
        {value}
      </div>
    </div>
  );
}