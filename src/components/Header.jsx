import React, { useState, useEffect } from "react";
import { Bell, User, LogOut, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode){
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm position-sticky top-0 z-2 w-100">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold fs-3 text-primary">Upskill Admin Panel</span>
        <div className="d-flex align-items-center gap-4">
          <button
            className="btn btn-outline-primary p-2 rounded-circle d-flex align-items-center justify-content-center"
            style={{ position: "relative" }}
            title="Notifications"
          >
            <Bell className="text-dark" size={20} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              5
            </span>
          </button>

          <button
            className="btn btn-outline-primary p-2 rounded-circle d-flex align-items-center justify-content-center"
            title="User Profile"
          >
            <User className="text-dark" size={20} />
          </button>

          <Link to="/" className="btn btn-outline-danger p-2 rounded-circle d-flex align-items-center justify-content-center" title="Logout">
            <LogOut className="text-danger" size={20} />
          </Link>

          <button
            className="btn btn-outline-primary p-2 rounded-circle"
            onClick={toggleTheme}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-warning" />
            ) : (
              <Moon size={20} className="text-dark" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
