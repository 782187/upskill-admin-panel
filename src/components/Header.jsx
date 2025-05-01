import React, { useState, useEffect } from "react";
import { Bell, User, LogOut, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setIsDarkMode(savedMode === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.body.classList.toggle("dark-mode", newMode);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm position-sticky top-0 z-2 w-100">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold">Admin Panel</span>
        <div className="d-flex align-items-center gap-3">
          <Bell className="text-dark" role="button" />
          <User className="text-dark" role="button" />
          <Link to="/" className="text-dark" title="Logout">
            <LogOut />
          </Link>
          <button
            className="btn btn-outline-dark p-1"
            onClick={toggleTheme}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
