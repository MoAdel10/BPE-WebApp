import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import Navbar from "../components/Navbar";

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
      <Navbar />

      <div className="max-w-md w-full text-center space-y-8 p-10 rounded-3xl bg-[#111] border border-primary/20 shadow-[0_0_50px_rgba(205,255,0,0.1)]">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/40">
          <svg
            className="w-10 h-10 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Payment <span className="text-primary">Received!</span>
          </h1>
          <p className="text-white/40 text-sm font-medium">
            Your VIP perks are being processed.
          </p>
        </div>

        {/* <div className="p-4 bg-black/50 rounded-xl border border-white/5">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Session ID</p>
          <p className="text-[10px] font-mono text-primary truncate">{sessionId}</p>
        </div> */}

        <div className="space-y-4">
          <p className="text-sm text-white/60">
            Processing your order... Your perks should arrive within minutes.
            Please relog if your status hasn't updated in-game.
          </p>

          <Link
            to="/"
            className="block w-full py-4 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-[1.02] transition-transform"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
