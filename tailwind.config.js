export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      theme: {
        bg: "#E9D9C7",
        card: "#FFFFFF",
        primary: "#20201A",
        secondary: "#474130",
        border: "#C1B6AE",
        accent: "#907B60",
      },
    },

    boxShadow: {
      soft: "0 8px 24px rgba(0,0,0,0.08)",
    },

    animation: {
      fadeIn: "fadeIn 0.6s ease-out",
      slideUp: "slideUp 0.5s ease-out",
    },

    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      slideUp: {
        "0%": { transform: "translateY(20px)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 },
      },
    },
  },
};
export const plugins = [];
