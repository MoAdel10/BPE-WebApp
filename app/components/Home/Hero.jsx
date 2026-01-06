import React from "react";

export default function Hero() {
  return (
    <>
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-card/60 backdrop-blur-md rounded-full border border-primary/20 mb-10 animate-fade-in electric-border">
          <span className="online-indicator"></span>
          <span className="text-sm font-medium text-foreground-muted">
            <span className="text-accent font-bold text-glow-cyan">247</span>{" "}
            players online now
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-zap w-4 h-4 text-primary animate-pulse-slow"
          >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
          </svg>
        </div>

        <h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-foreground tracking-wider">BLACK</span>
          <br />
          <span className="bg-gradient-electric bg-clip-text text-transparent text-glow-intense tracking-widest">
            PYRAMID
          </span>
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl text-foreground-muted max-w-2xl mx-auto mb-12 animate-fade-in-up font-sans leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          The ultimate Rust experience. Compete with elite players, dominate
          leaderboards, and claim your legacy in the wasteland.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-heading font-bold tracking-wider hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] border border-primary/20 h-14 rounded-xl px-10 text-base pulse-glow group cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-play w-5 h-5 group-hover:scale-110 transition-transform"
            >
              <polygon points="6 3 20 12 6 21 6 3"></polygon>
            </svg>
            Join Server
          </button>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-card border border-border text-foreground hover:bg-secondary hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 h-14 rounded-xl px-10 text-base group cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-link w-5 h-5 group-hover:rotate-45 transition-transform"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Link Steam Account
          </button>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-3 gap-6 sm:gap-10 max-w-xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {/* Unique Players */}
          <div className="text-center group">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2.5 bg-primary/10 rounded-lg border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/15 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users w-5 h-5 text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-glow">
              15K+
            </div>
            <div className="text-xs sm:text-sm text-foreground-muted mt-1">
              Unique Players
            </div>
          </div>

          {/* Total Kills */}
          <div className="text-center group">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2.5 bg-secondary/10 rounded-lg border border-secondary/20 group-hover:border-secondary/40 group-hover:bg-secondary/15 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-swords w-5 h-5 text-secondary"
                >
                  <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline>
                  <line x1="13" x2="19" y1="19" y2="13"></line>
                  <line x1="16" x2="20" y1="16" y2="20"></line>
                  <line x1="19" x2="21" y1="21" y2="19"></line>
                  <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline>
                  <line x1="5" x2="9" y1="14" y2="18"></line>
                  <line x1="7" x2="4" y1="17" y2="20"></line>
                  <line x1="3" x2="5" y1="19" y2="21"></line>
                </svg>
              </div>
            </div>
            <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-glow">
              2.5M
            </div>
            <div className="text-xs sm:text-sm text-foreground-muted mt-1">
              Total Kills
            </div>
          </div>

          {/* Uptime */}
          <div className="text-center group">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2.5 bg-success/10 rounded-lg border border-success/20 group-hover:border-success/40 group-hover:bg-success/15 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock w-5 h-5 text-success"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            </div>
            <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-success">
              99.9%
            </div>
            <div className="text-xs sm:text-sm text-foreground-muted mt-1">
              Uptime
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
