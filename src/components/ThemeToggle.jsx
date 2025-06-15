import React from "react";
import { useTheme } from "../context/ThemeContext";


const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
