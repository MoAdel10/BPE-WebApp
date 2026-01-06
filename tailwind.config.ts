import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "##00D3FF", 
        // background: "#091223", 
      },
    },
  },
  plugins: [],
} satisfies Config;