'use client'

import { ReactNode, useEffect, useState, createContext } from "react";

interface ThemeContextType {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

// ✅ 1. Define the ThemeContext
export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
});

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const effectiveTheme =
      storedTheme === "system" || !storedTheme
        ? prefersDark
          ? "dark"
          : "light"
        : storedTheme;

    setTheme(effectiveTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.add(prefersDark ? "dark" : "light");
    } else {
      document.documentElement.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
