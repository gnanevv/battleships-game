export const theme = {
  colors: {
    primary: "#667eea",
    secondary: "#764ba2",
    accent: "#f093fb",
    success: "#4facfe",
    warning: "#f6d55c",
    error: "#ff6b6b",

    // Neutral colors
    white: "#ffffff",
    gray100: "#f8f9fa",
    gray200: "#e9ecef",
    gray300: "#dee2e6",
    gray400: "#ced4da",
    gray500: "#adb5bd",
    gray600: "#6c757d",
    gray700: "#495057",
    gray800: "#343a40",
    gray900: "#212529",

    // Game specific colors
    water: "#4facfe",
    hit: "#ff6b6b",
    miss: "#dee2e6",
    ship: "#495057",
    shipHit: "#ff4757",

    // Gradients
    backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    cardGradient:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    buttonGradient: "linear-gradient(145deg, #667eea 0%, #764ba2 100%)",
    enemyGradient: "linear-gradient(145deg, #ff6b6b 0%, #ee5a52 100%)",
    playerGradient: "linear-gradient(145deg, #4facfe 0%, #00f2fe 100%)",
  },

  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.625,
    },
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "2.5rem",
    "3xl": "3rem",
    "4xl": "4rem",
    "5xl": "5rem",
  },

  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    glow: "0 0 20px rgba(102, 126, 234, 0.3)",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  animations: {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "bounce 0.5s ease-in-out",
    fadeIn: "fadeIn 0.5s ease-in-out",
    slideIn: "slideIn 0.3s ease-out",
  },
};

export type Theme = typeof theme;
