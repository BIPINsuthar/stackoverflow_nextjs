"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Mode = "light" | "dark" | undefined;

export interface ThemeContextTypes {
  mode: Mode;
  handleThemeChange: () => void;
}

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<Mode>();

  const isThemeInStorage = "theme" in localStorage;
  const isDarkModeStorage = localStorage.theme === "dark";
  const isDarkModePreferred = window.matchMedia(
    "(prefers-color-schema:dark)"
  ).matches;

  const handleThemeChange = () => {
    if (mode == "dark") {
      setMode("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.add("light");
    } else {
      setMode("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("UseTheme must be used in ThemProvider");
  }

  return context;
};
