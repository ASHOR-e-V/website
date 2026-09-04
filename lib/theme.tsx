"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

type Theme = "dark" | "light";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    let saved: Theme | null = null;
    try {
      saved = localStorage.getItem("ashor-theme") as Theme | null;
    } catch {
      // Private mode or blocked storage — fall back to the default.
    }
    const initial = saved ?? "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ashor-theme", next);
    } catch {
      // Non-fatal: the choice just won't persist between visits.
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {/* reducedMotion="user" makes Framer skip transform and layout
          animations for visitors who ask for reduced motion, while leaving
          opacity and colour transitions intact. The visual guarantee is in
          CSS (see globals.css); this stops the work from being done at all. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
