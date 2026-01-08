import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router"; // Added useParams
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { steamId } = useParams(); // Grab the ID from the URL if it exists

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchProfile = async () => {
      let targetSteamId = steamId;
      const token = localStorage.getItem("userToken");

      // Logic: If no steamId in URL, we are looking at "My Profile"
      if (!targetSteamId) {
        if (!token) {
          navigate("/");
          return;
        }
        try {
          const decoded = jwtDecode(token);
          targetSteamId = decoded.steamId;
        } catch (err) {
          navigate("/");
          return;
        }
      }

      try {
        // Use the public endpoint if we are viewing someone else, or private if it's us
        // Both point to your new public route for simplicity when viewing profiles
        const response = await fetch(
          `${API_URL}/api/rust/player/public/${targetSteamId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const data = await response.json();
        
        
        setPlayer(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, API_URL, steamId]); // Re-run if the URL steamId changes

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-foreground-muted font-heading animate-pulse">
          SYNCHRONIZING DATA...
        </p>
      </div>
    );

  if (!player) return null;

  const kd =
    player.pvp_deaths > 0
      ? (player.pvp_kills / player.pvp_deaths).toFixed(2)
      : player.pvp_kills;

  const getRankColor = (rank) => {
    switch (rank?.toLowerCase()) {
      case "bronze":
        return "text-orange-400 border-orange-400/30 bg-orange-400/10";
      case "gold":
        return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "diamond":
        return "text-cyan-400 border-cyan-400/30 bg-cyan-400/10";
      default:
        return "text-primary border-primary/30 bg-primary/10";
    }
  };

  // Check if this is the logged-in user's own profile to show/hide logout
  const token = localStorage.getItem("userToken");
  const isOwnProfile = !steamId || (token && jwtDecode(token).steamId === steamId);

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <Navbar />

      <main className="container mx-auto px-4 pt-24">
        <div className="relative rounded-3xl border border-white/5 bg-card/50 backdrop-blur-xl overflow-hidden mb-8 shadow-2xl">
          <div className="h-40 bg-gradient-to-br from-primary/30 via-primary/5 to-transparent relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          </div>

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 relative">
              <div className="relative group">
                <div className="absolute -inset-1 bg-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <img
                  src={player.avatar || `https://api.dicebear.com/7.x/thumbs/svg?seed=${player.steam_id}`}
                  alt={player.username}
                  referrerPolicy="no-referrer"
                  className="relative w-32 h-32 rounded-2xl border-4 border-background bg-secondary object-cover shadow-2xl"
                />
                {/* <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-black border-4 border-background shadow-lg">
                  ONLINE
                </div> */}
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-3xl md:text-4xl font-black font-heading tracking-tighter uppercase italic">
                    {player.username}
                  </h1>
                  {player.vip_status && (
                    <span
                      className={`px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase border ${getRankColor(player.vip_status)}`}
                    >
                      {player.vip_status}
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground-muted font-mono bg-white/5 inline-block px-3 py-1 rounded-md border border-white/5">
                  ID: {player.steam_id}
                </p>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <a
                  href={`https://steamcommunity.com/profiles/${player.steam_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 font-bold text-sm"
                >
                  STEAM PROFILE
                </a>
                {isOwnProfile && (
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-xl transition-all duration-300 font-bold text-sm"
                  >
                    LOGOUT
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {player.vip_status && (
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-primary/10 to-transparent border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${getRankColor(player.vip_status)}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-black tracking-widest text-foreground-muted uppercase">Membership Plan</p>
                <h2 className={`text-xl font-black italic uppercase tracking-tighter ${getRankColor(player.vip_status).split(" ")[0]}`}>
                  {player.vip_status} Tier
                </h2>
              </div>
            </div>
            {player.vip_status !== "Player" && player.vip_expiry && (
              <div className="text-center md:text-right">
                <p className="text-[10px] font-black tracking-widest text-foreground-muted uppercase">Expiration Date</p>
                <p className="font-mono text-sm text-white">
                  {new Date(player.vip_expiry).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="PVP Kills" value={player.pvp_kills} color="text-primary" />
            <StatCard label="PVP Deaths" value={player.pvp_deaths} color="text-red-400" />
            <StatCard label="K/D Ratio" value={kd} color="text-yellow-400" />
            <StatCard label="PVE Kills" value={player.pve_kills} color="text-blue-400" />
          </div>

          <div className="p-6 rounded-3xl bg-card/30 border border-white/5 backdrop-blur-sm flex flex-col justify-center items-center text-center">
            <p className="text-[10px] font-black tracking-[0.2em] text-foreground-muted uppercase mb-2">Last Activity</p>
            <h3 className="text-xl font-bold font-heading text-primary">
              {player.last_seen ? new Date(player.last_seen).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
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
      <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-3xl opacity-10 ${color.replace("text", "bg")}`}></div>
      <p className="text-[10px] font-black tracking-[0.2em] text-foreground-muted uppercase mb-3 transition-colors group-hover:text-primary">
        {label}
      </p>
      <div className={`text-3xl font-black font-heading tracking-tight ${color}`}>
        {value}
      </div>
    </div>
  );
}