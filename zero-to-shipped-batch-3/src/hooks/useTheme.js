import { useEffect, useState } from "react";

// Keeps the theme ("dark" or "light") in state, writes it to <html data-theme>,
// and remembers the choice in localStorage so it survives a reload.
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return { theme, toggle };
}
