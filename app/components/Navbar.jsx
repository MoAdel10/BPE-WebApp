import React, { useState, useEffect } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
import { FaSteam } from "react-icons/fa6";

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Check if we are in the browser and have a token
    const savedToken = localStorage.getItem("userToken");

    if (savedToken) {
      setToken(savedToken);
      try {
        // 2. Decode the token to get user data
        const decoded = jwtDecode(savedToken);
        setUser(decoded);

        // // 3. LOG THE DATA so you can see it works!
        // console.log("✅ Steam User Authenticated:", decoded);
        // console.log("Steam Name:", decoded.username);
        // console.log("Steam ID:", decoded.steamId);
      } catch (error) {
        console.error("Invalid token found:", error);
        localStorage.removeItem("userToken");
      }
    }
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [onlineNow, setOnlineNow] = useState("500+");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Leaderboards", href: "/leaderboards" },
    { name: "Map Vote", href: "/map-voting" },
    { name: "Store", href: "/store" },
  ];

  if (!isMobile) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a className="flex items-center gap-3 group" href="/">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg hover:scale-105 transition-all">
                <span className="font-bold text-primary-foreground text-lg">
                  BP
                </span>
              </div>
              <span className="text-lg font-bold text-foreground hidden sm:block uppercase tracking-tight">
                BLACK <span className="text-primary">PYRAMID</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 shadow-[inset_0_0_10px_rgba(0,137,255,0.1)]"
                        : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Desktop Auth/Online */}
            <div className="flex items-center gap-3">
              {token ? (
                <>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-background-secondary rounded-full border border-border">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium text-foreground">
                      <span className="text-primary font-bold">
                        {onlineNow}
                      </span>{" "}
                      Online
                    </span>
                  </div>
                  <a
                    href="/profile"
                    className="p-2 bg-background-secondary rounded-lg border border-primary/20 text-foreground hover:border-primary/50 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </a>
                </>
              ) : (
                <a
                  href="http://localhost:8000/api/auth/steam"
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <FaSteam />
                    Login
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Mobile View
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="p-4 flex justify-between items-center relative z-[60] bg-background">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">
              BP
            </span>
          </div>
          <span className="font-bold text-foreground uppercase tracking-wider text-sm">
            Black Pyramid
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Online Counter */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-background-secondary rounded-md border border-border">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-primary">
              {onlineNow}
            </span>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-foreground p-2 bg-background-secondary rounded-lg"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-2 animate-in slide-in-from-top duration-300 shadow-2xl z-50">
          {/* Profile Section for Mobile (ONLY IF LOGGED IN) */}
          {token && (
            <a
              href="/profile"
              className="flex items-center gap-3 p-3 mb-2 bg-primary/10 border border-primary/20 rounded-xl"
              onClick={() => setMenuOpen(false)}
            >
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">My Profile</p>
                {/* <p className="text-[10px] text-primary">View stats & settings</p> */}
              </div>
            </a>
          )}

          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`font-semibold py-3 px-4 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:bg-white/5"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            );
          })}

          {!token && (
            <a
              href="http://localhost:8000/api/auth/steam"
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-center font-bold rounded-xl mt-4 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              onClick={() => {
                console.log("Redirecting to Steam...");
                setMenuOpen(false);
              }}
            >
              <FaSteam />
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
