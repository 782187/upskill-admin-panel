import React, { useState, useEffect } from "react";
import { Bell, User, LogOut, Moon, Sun, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fetchEnquiry, setFetchEnquiry] = useState(0);
  const [name, updateName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    const darkModeEnabled = savedMode === "dark";
    setIsDarkMode(darkModeEnabled);
    document.body.classList.toggle("dark-mode", darkModeEnabled);

    const storedName = localStorage.getItem("adminName") || "Admin";
    updateName(storedName);

    fetchEnquiries();
  }, []);

  const fetchEnquiries = () => {
    axios
      .get(`${API_URL}/get-enquiries`)
      .then((res) => {
        setFetchEnquiry(res.data.length);
        if (res.data.length > 0) {
          setShowNotificationBadge(true);
          setTimeout(() => setShowNotificationBadge(false), 3000);
        }
      })
      .catch(() => console.log("Failed to fetch enquiries"));
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.body.classList.toggle("dark-mode", newMode);
  };

  const navigateToEnquiries = () => {
    navigate("/enquiries");
  };

  const handleNameUpdate = () => {
    localStorage.setItem("adminName", name);
    document.querySelector("#staticBackdrop .btn-close")?.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <nav className={`navbar ${isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow-sm sticky-top z-3`}>
        <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap px-3">
          <span className="fw-bold fs-5 text-primary">Admin Panel</span>
          <div className="d-flex align-items-center gap-2 flex-wrap mt-2 mt-md-0">
            <button
              onClick={toggleTheme}
              className="btn btn-icon rounded-circle"
              title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} className="text-warning" /> : <Moon size={20} className="text-primary" />}
            </button>
            <button
              onClick={navigateToEnquiries}
              className="btn btn-icon rounded-circle position-relative"
              title={`${fetchEnquiry} New Enquiries`}
              aria-label="Notifications"
            >
              <Bell size={20} className={isDarkMode ? "text-light" : "text-dark"} />
              {fetchEnquiry > 0 && (
                <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${showNotificationBadge ? "pulse" : ""}`}>
                  {fetchEnquiry}
                </span>
              )}
            </button>
            <div className="dropdown">
              <button
                className="btn d-flex align-items-center gap-2"
                onClick={() => setShowDropdown(!showDropdown)}
                aria-expanded={showDropdown}
                aria-label="User profile"
              >
                <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
                  {name.charAt(0).toUpperCase()}
                </div>
                <span className="d-none d-sm-inline">{name}</span>
                <ChevronDown size={16} className={showDropdown ? "rotate-180" : ""} />
              </button>
              <div className={`dropdown-menu dropdown-menu-end ${showDropdown ? "show" : ""}`} style={{ minWidth: "200px" }}>
                <div className="dropdown-header px-3 py-2">
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="fw-bold">{name}</div>
                      <small className="text-muted">Administrator</small>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <User size={16} /> Edit Profile
                </button>
                <button className="dropdown-item d-flex align-items-center gap-2 text-danger" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Update Profile</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => updateName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleNameUpdate} disabled={!name.trim()}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          border: none;
          background: ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
        }
        .btn-icon:hover {
          background: ${isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"};
          transform: scale(1.05);
        }
        .dropdown-menu {
          border: none;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .dropdown-item:hover {
          background: rgba(var(--bs-primary-rgb), 0.1);
        }
        .rotate-180 {
          transform: rotate(180deg);
          transition: transform 0.2s ease;
        }
        .pulse {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .avatar {
          font-weight: 600;
          font-size: 1rem;
        }
        @media (max-width: 768px) {
          .dropdown-menu {
            right: 0;
            left: auto;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
