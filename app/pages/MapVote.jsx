import React, { useState } from "react";

export default function MapVote() {
  const [selectedMap, setSelectedMap] = useState(null);

  // Map data array to keep the JSX clean
  const maps = [
    {
      id: "barren",
      name: "Barren Wasteland",
      seed: "1847293",
      size: "4000",
      votes: 142,
      percent: "36.2",
      color: "from-amber-900/30 to-stone-900/50",
      delay: "0s",
    },
    {
      id: "frozen",
      name: "Frozen Tundra",
      seed: "9823741",
      size: "4000",
      votes: 98,
      percent: "25.0",
      color: "from-blue-900/30 to-slate-900/50",
      delay: "0.1s",
    },
    {
      id: "jungle",
      name: "Jungle Fever",
      seed: "5612398",
      size: "3500",
      votes: 87,
      percent: "22.2",
      color: "from-green-900/30 to-emerald-900/50",
      delay: "0.2s",
    },
    {
      id: "desert",
      name: "Desert Storm",
      seed: "7291834",
      size: "4500",
      votes: 65,
      percent: "16.6",
      color: "from-orange-900/30 to-yellow-900/50",
      delay: "0.3s",
    },
  ];

  const handleSubmit = () => {
    if (selectedMap) {
      alert(`Voted for: ${selectedMap}`);
      // Add your API call here: fetch('/api/vote', { method: 'POST', body: ... })
    }
  };

  return (
    <div className="container mx-auto px-4 py-25">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Next Wipe <span className="text-primary">Map Vote</span>
        </h1>
        <p className="text-foreground-muted max-w-xl mx-auto mb-6">
          Choose the next battlefield. Your vote decides where the next war begins.
        </p>
        
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-card rounded-xl border border-border">
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
            className="w-5 h-5 text-primary"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <div className="text-left">
            <p className="text-xs text-foreground-muted uppercase tracking-wide">Voting ends in</p>
            <p className="font-heading text-xl font-bold text-foreground">
              02<span className="text-primary">:</span>14<span className="text-primary">:</span>37
            </p>
          </div>
          <div className="h-10 w-px bg-border"></div>
          <div className="text-left">
            <p className="text-xs text-foreground-muted uppercase tracking-wide">Total votes</p>
            <p className="font-heading text-xl font-bold text-primary">392</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {maps.map((map) => (
          <button
            key={map.id}
            onClick={() => setSelectedMap(map.id)}
            // Style prop fixed: Now an object, not a string
            style={{ animationDelay: map.delay }}
            className={`relative text-left rounded-xl border overflow-hidden transition-all duration-300 animate-fade-in-up cursor-pointer ${
              selectedMap === map.id 
                ? "border-primary ring-2 ring-primary/20 shadow-lg" 
                : "border-border hover:border-primary/30"
            }`}
          >
            <div className={`h-40 bg-gradient-to-br ${map.color} relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
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
                  className={`w-12 h-12 transition-colors ${selectedMap === map.id ? 'text-primary' : 'text-foreground/20'}`}
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              {map.id === "barren" && (
                <span className="absolute top-3 right-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded font-heading">
                  LEADING
                </span>
              )}
            </div>
            
            <div className="p-4 bg-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{map.name}</h3>
                  <p className="text-sm text-foreground-muted">
                    Seed: {map.seed} • Size: {map.size}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-foreground-muted">
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
                    className="w-4 h-4"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  {map.votes}
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${map.percent}%` }}
                ></div>
              </div>
              <p className="text-xs text-foreground-muted mt-1 text-right">{map.percent}%</p>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedMap}
          className={`inline-flex items-center justify-center gap-2 font-heading font-bold tracking-wider transition-all duration-300 h-14 rounded-xl px-10 text-base border ${
            selectedMap 
              ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] border-primary/20" 
              : "bg-card text-foreground-muted border-border cursor-not-allowed opacity-50"
          }`}
        >
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
            className="w-5 h-5"
          >
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
          Submit Vote
        </button>
      </div>
    </div>
  );
}