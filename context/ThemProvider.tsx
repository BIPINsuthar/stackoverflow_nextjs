"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Mode = "light" | "dark" | undefined;

export interface ThemeContextTypes {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<Mode>();

  const handleThemeChange = () => {
    if (mode == "dark") {
      setMode("light");
      document.documentElement.classList.add("light");
    } else {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
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
