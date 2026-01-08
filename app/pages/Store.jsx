import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";

export default function Store() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary selection:text-black">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4">
            VIP <span className="text-primary">Store</span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-white/40 max-w-xl mx-auto font-medium leading-relaxed">
            Support the server and unlock tactical advantages. All proceeds go
            directly to hosting and development.
          </p>
        </div>

        {/* Quick Perks Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <PerkMini icon="zap" title="Queue Skip" desc="Instant server entry" />
          <PerkMini icon="star" title="Unique Role" desc="Custom discord colors" />
          <PerkMini icon="shield" title="Priority" desc="Fast-track support" />
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-end">
          <PricingCard
            tier="Bronze"
            price="4.99"
            color="from-orange-900/20 to-[#111]"
            borderColor="border-orange-900/30"
            perks={["Skip Queue Priority", "Bronze Chat Tag", "Access to VIP Discord", "1 Home Teleport"]}
          />

          <PricingCard
            tier="Gold"
            price="9.99"
            featured={true}
            color="from-yellow-600/20 to-[#111]"
            borderColor="border-yellow-500/40"
            perks={["All Bronze Features", "Gold Chat Tag", "3 Home Teleports", "Extended Backpack", "Priority Support", "Monthly Skin Kit"]}
          />

          <PricingCard
            tier="Diamond"
            price="19.99"
            color="from-cyan-600/20 to-[#111]"
            borderColor="border-cyan-500/30"
            perks={["All Gold Features", "Diamond Chat Tag", "Unlimited Teleports", "Custom Base Skins", "Exclusive Discord Role", "Early Wipe Access"]}
          />
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 p-8 rounded-3xl bg-[#111] border border-white/5 max-w-2xl mx-auto">
          <p className="text-xs font-mono text-white/30 uppercase tracking-[0.2em]">
            Secure transactions via Stripe • Instant delivery via RCON
          </p>
        </div>
      </main>
    </div>
  );
}

// Sub-component for small perk boxes
function PerkMini({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#111] border border-white/5 group hover:border-primary/20 transition-all">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon === "zap" && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )}
        {icon === "star" && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        )}
        {icon === "shield" && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )}
      </div>
      <div>
        <h4 className="font-bold text-sm uppercase tracking-tight">{title}</h4>
        <p className="text-[10px] font-mono text-white/30 uppercase">{desc}</p>
      </div>
    </div>
  );
}

// Sub-component for the Pricing Cards
function PricingCard({ tier, price, perks, color, borderColor, featured }) {
  const [loading, setLoading] = useState(false);
  
  // Access the environment variable
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handlePayment = async () => {
    setLoading(true);

    const savedToken = localStorage.getItem("userToken");
    
    if (!savedToken) {
      alert("Please login with Steam first!");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(savedToken);
      const steamId = decoded.steamId;

      if (!steamId) {
        alert("Steam ID not found in token. Please log in again.");
        setLoading(false);
        return;
      }

      // Updated to use the environment variable
      const response = await fetch(`${API_URL}/api/checkout/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: tier,
          steamId: steamId,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Server error: Could not start checkout.");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Session error. Please try logging in again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative rounded-3xl border ${borderColor} bg-gradient-to-b ${color} p-1 transition-all duration-500 hover:translate-y-[-8px] ${featured ? "md:scale-110 z-10" : ""}`}>
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-xl">
          Most Popular
        </div>
      )}

      <div className="bg-[#111]/90 rounded-[22px] p-8 h-full flex flex-col">
        <h3 className="font-heading text-2xl font-black italic uppercase tracking-tighter mb-1">
          {tier}
        </h3>
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-4xl font-black italic text-primary">${price}</span>
          <span className="text-xs font-mono text-white/20 uppercase tracking-widest">/mo</span>
        </div>

        <ul className="space-y-4 mb-10 flex-1">
          {perks.map((perk, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-white/70">
              <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
              {perk}
            </li>
          ))}
        </ul>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.15em] text-xs transition-all duration-300 disabled:opacity-50 ${
            featured
              ? "bg-primary text-black hover:shadow-[0_0_30px_rgba(205,255,0,0.3)]"
              : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
          }`}
        >
          {loading ? "Connecting..." : `Purchase ${tier}`}
        </button>
      </div>
    </div>
  );
}