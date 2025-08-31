import { useState, useEffect } from "react";
import { ThemeContext } from "../Context/CreateContextTheme.jsx";

function ThemeProviderContext({ children }) {
  // state to store theme color as "light" or "dark"
  const [theme, setTheme] = useState("dark");

  // storing theme state in local storage
  const saveThemeToLocalStorage = (themeColor) => {
    localStorage.setItem("themeKey", themeColor);
  };

  useEffect(() => {
    // accessing theme state from local storage
    const savedTheme = localStorage.getItem("themeKey");
    if (savedTheme) {
      setTheme(savedTheme);
      return;
    }
    const isSystemThemeDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(isSystemThemeDark ? "dark" : "light");
  }, []);

  // functionality to toggle button
  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      saveThemeToLocalStorage(newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, saveThemeToLocalStorage }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProviderContext };
