import React, { useState, useEffect } from "react";
import { Bell, User, LogOut, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fetchEnquiry, setFetchEnquiry] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    const darkModeEnabled = savedMode === "dark";
    setIsDarkMode(darkModeEnabled);
    document.body.classList.toggle("dark-mode", darkModeEnabled);

    fetchEnquiries();
  }, []);

  const fetchEnquiries = () => {
    axios
      .get("https://upskill-server.onrender.com/get-enquiries")
      .then((res) => setFetchEnquiry(res.data.length))
      .catch(() => alert("Failed to fetch data"));
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.body.classList.toggle("dark-mode", newMode);
  };

  const fetchData = () => {
    navigate("/enquiries");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm position-sticky top-0 z-2 w-100">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <img src="/logo.png" className="img-fluid" width="130px" alt="Logo" />
        <div className="d-flex align-items-center gap-4">
          <button
            onClick={fetchData}
            className="btn btn-outline-primary p-2 rounded-circle position-relative"
            title="Notifications"
          >
            <Bell className="text-dark" size={20} />
            {fetchEnquiry > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {fetchEnquiry}
              </span>
            )}
          </button>

          <button
            className="btn btn-outline-primary p-2 rounded-circle"
            title="User Profile"
          >
            <User className="text-dark" size={20} />
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-outline-danger p-2 rounded-circle"
            title="Logout"
          >
            <LogOut className="text-danger" size={20} />
          </button>

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
