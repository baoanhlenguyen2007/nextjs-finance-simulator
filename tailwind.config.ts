import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#0056D2",
          foreground: "hsl(var(--primary-foreground))",
          50: "#ECF9FF",
        },
        secondary: {
          DEFAULT: "#13C296",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "primary-text": "#637381",
        "secondary-text": "#8899A8",
        stroke: "#DFE4EA",
        dark: {
          1: "#1E1B39",
          2: "#1F2A37",
          3: "#374151",
          4: "#4B5563",
          5: "#6B7280",
          6: "#9CA3AF",
          7: "#D1D5DB",
          8: "#E5E7EB",
        },
        green: {
          1: "#22AD5C",
          dark: "#1A8245",
          light: "#2CD673",
          "light-2": "#57DE8F",
          "light-3": "#82E6AC",
          "light-4": "#ACEFC8",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        // Add custom background images here
        "card-total": "url('/images/bg-card-total.png')",
      },
      boxShadow: {
        app: "0px 4px 24px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
export default config;
