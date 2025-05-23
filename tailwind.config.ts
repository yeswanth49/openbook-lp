import type { Config } from "tailwindcss"

// Central color palette definitions - HSL values for consistent usage
const colors = {
  // Core grayscale colors
  neutral: {
    50: '0 0% 98%',
    100: '0 0% 96%',
    200: '0 0% 90%',
    300: '0 0% 80%',
    400: '0 0% 64%',
    500: '0 0% 45%',
    600: '0 0% 32%',
    700: '0 0% 20%',
    800: '0 0% 12%',
    900: '0 0% 9%',
    950: '0 0% 7%',
  },
  // Brown/sepia tones for light theme
  brown: {
    50: '30 25% 98%',
    100: '30 20% 96%',
    200: '30 10% 92%',
    300: '30 10% 85%',
    400: '220 10% 45%',
    500: '220 10% 25%',
    600: '220 10% 20%',
    700: '220 10% 14%',
    800: '220 10% 10%',
    900: '220 10% 7%',
  },
  // Color accents
  blue: {
    300: '210 100% 70%',
    400: '210 100% 60%', 
    500: '210 100% 50%',
    600: '210 100% 40%',
  },
  // Chart colors
  chart: {
    1: { light: '12 76% 61%', dark: '220 70% 50%' },
    2: { light: '173 58% 39%', dark: '160 60% 45%' },
    3: { light: '197 37% 24%', dark: '30 80% 55%' },
    4: { light: '43 74% 66%', dark: '280 65% 60%' },
    5: { light: '27 87% 67%', dark: '340 75% 55%' },
  },
  // Status colors
  status: {
    error: '0 84.2% 60.2%',
    success: '142 76% 36%',
    warning: '38 92% 50%',
    info: '216 98% 52%',
  }
}

// Theme object factory function to generate theme variables
const createTheme = (isDark: boolean) => ({
  background: isDark ? colors.neutral[900] : colors.brown[100],
  foreground: isDark ? colors.neutral[50] : colors.brown[900],
  card: isDark ? colors.neutral[800] : colors.brown[50],
  'card-foreground': isDark ? colors.neutral[50] : colors.brown[900],
  popover: isDark ? colors.neutral[800] : colors.brown[50],
  'popover-foreground': isDark ? colors.neutral[50] : colors.brown[900],
  primary: isDark ? colors.neutral[50] : colors.brown[900],
  'primary-foreground': isDark ? colors.neutral[950] : colors.brown[50],
  secondary: isDark ? colors.neutral[700] : colors.brown[200],
  'secondary-foreground': isDark ? colors.neutral[50] : colors.brown[900],
  muted: isDark ? colors.neutral[700] : colors.brown[200],
  'muted-foreground': isDark ? colors.neutral[400] : colors.brown[400],
  accent: isDark ? colors.neutral[700] : colors.brown[200],
  'accent-foreground': isDark ? colors.neutral[50] : colors.brown[900],
  destructive: colors.status.error,
  'destructive-foreground': isDark ? colors.neutral[50] : colors.brown[50],
  border: isDark ? colors.neutral[700] : colors.brown[300],
  input: isDark ? colors.neutral[700] : colors.brown[300],
  ring: isDark ? colors.neutral[200] : colors.brown[700],
  radius: '0.5rem',
  // Charts
  'chart-1': isDark ? colors.chart[1].dark : colors.chart[1].light,
  'chart-2': isDark ? colors.chart[2].dark : colors.chart[2].light,
  'chart-3': isDark ? colors.chart[3].dark : colors.chart[3].light,
  'chart-4': isDark ? colors.chart[4].dark : colors.chart[4].light,
  'chart-5': isDark ? colors.chart[5].dark : colors.chart[5].light,
  // Sidebar components
  'sidebar-background': isDark ? colors.brown[900] : colors.brown[50],
  'sidebar-foreground': isDark ? colors.brown[100] : colors.brown[600],
  'sidebar-primary': isDark ? '224.3 76.3% 48%' : colors.brown[900],
  'sidebar-primary-foreground': isDark ? colors.neutral[50] : colors.brown[50],
  'sidebar-accent': isDark ? '240 3.7% 15.9%' : colors.brown[100],
  'sidebar-accent-foreground': isDark ? colors.brown[100] : colors.brown[900],
  'sidebar-border': isDark ? '240 3.7% 15.9%' : '220 13% 91%',
  'sidebar-ring': '217.2 91.2% 59.8%',
})

// Create dark and light themes
const darkTheme = createTheme(true)
const lightTheme = createTheme(false)

// Generate CSS variables to be included in globals.css
// This is just for reference and will be copied to globals.css
export const themeVariables = {
  dark: Object.entries(darkTheme)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n'),
  light: Object.entries(lightTheme)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n'),
}

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  mode: "jit",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        handwriting: ["var(--font-handwriting)", "cursive"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          background: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          primaryForeground: "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          accentForeground: "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
