import { createContext, useEffect, useState } from "react";
import getThemeFromLocalstorage from "../utils/getThemeFromLocalstorage";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const themeData = getThemeFromLocalstorage();

  const [theme, setTheme] = useState(themeData);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
