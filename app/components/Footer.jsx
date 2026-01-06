import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 mt-10 border-t border-border bg-background-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/10">
              <span className="font-heading font-bold text-primary-foreground text-sm">
                BP
              </span>
            </div>
            <span className="font-heading text-sm font-bold text-foreground tracking-tight">
              BLACK <span className="text-primary">PYRAMID</span>
            </span>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-foreground-muted">
            <a
              className="hover:text-primary transition-all duration-200 hover:translate-y-[-1px]"
              href="/leaderboards"
            >
              Leaderboards
            </a>
            <a 
              className="hover:text-primary transition-all duration-200 hover:translate-y-[-1px]" 
              href="/store"
            >
              Store
            </a>
            <a 
              href="https://discord.gg/yourlink" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-all duration-200 hover:translate-y-[-1px]"
            >
              Discord
            </a>
            <a 
              href="/rules" 
              className="hover:text-primary transition-all duration-200 hover:translate-y-[-1px]"
            >
              Rules
            </a>
          </div>

          {/* Copyright Section */}
          <div className="text-center md:text-right">
            <p className="text-sm text-foreground-muted/60">
              © {currentYear} <span className="text-foreground-muted font-semibold">Black Pyramid</span>.
              <br className="md:hidden" /> All rights reserved.
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}