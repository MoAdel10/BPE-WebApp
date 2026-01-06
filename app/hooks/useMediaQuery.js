import { useState, useEffect } from "react";

/**
 * Custom hook to detect screen size changes via JS
 * @param {string} query - The media query (e.g., '(max-width: 768px)')
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (event) => setMatches(event.matches);
    media.addEventListener("change", listener);

    // Clean up on unmount
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}