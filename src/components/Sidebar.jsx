import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Book,
  FileText,
  Calendar,
  MessageCircle,
  Users,
  Menu,
  X,
  Briefcase,
} from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <Home className="me-2" size={18} /> },
    { to: "/enquiries", label: "Enquiries", icon: <Users className="me-2" size={18} /> },
    { to: "/demolecture", label: "Demo Booking", icon: <Users className="me-2" size={18} /> },
    { to: "/courses", label: "Courses", icon: <Book className="me-2" size={18} /> },
    { to: "/feedback", label: "Feedback", icon: <MessageCircle className="me-2" size={18} /> },
    { to: "/blogs", label: "Blogs", icon: <FileText className="me-2" size={18} /> },
    { to: "/events", label: "Events", icon: <Calendar className="me-2" size={18} /> },
    { to: "/placement", label: "Placement", icon: <Briefcase className="me-2" size={18} /> },
    { to: "/carapp", label: "Hire From Us", icon: <Briefcase className="me-2" size={18} /> },
  ];

  return (
    <>
      <div className="d-lg-none bg-dark text-white px-3 py-2 position-sticky top-0 z-3 w-100 d-flex align-items-center justify-content-between">
        <img src="/logoupskill.png" className="img-fluid" width="150px" alt="Logo" />
        <button
          className="btn btn-outline-light ms-auto"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`sidebar-wrapper position-fixed top-0 start-0 ${isOpen ? "d-block" : "d-none"} d-lg-block`}
        style={{
          width: "250px",
          height: "100vh",
          background: "linear-gradient(135deg, #1a1e23 0%, #2d343f 100%)",
          color: "#fff",
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
          zIndex: 1050,
          transition: "all 0.3s ease",
        }}
      >
        <div className="sidebar-header d-flex align-items-center justify-content-center py-4 border-bottom border-secondary">
          <img
            src="/logoupskill.png"
            className="img-fluid"
            style={{ maxWidth: "180px" }}
            alt="Logo"
          />
        </div>

        <div className="d-flex justify-content-end d-lg-none p-3 position-absolute top-0 end-0">
          <button
            className="btn btn-outline-light btn-sm rounded-circle"
            onClick={toggleSidebar}
            style={{ width: "32px", height: "32px" }}
          >
            <X size={16} />
          </button>
        </div>

        <ul
          className="nav flex-column px-3 py-4"
          style={{ gap: "8px" }}
        >
          {navItems.map((item, idx) => (
            <li className="nav-item" key={idx}>
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded d-flex align-items-center transition-all ${isActive
                    ? "bg-primary text-white fw-bold shadow-sm"
                    : "text-light hover-bg"
                  }`
                }
                to={item.to}
                onClick={() => setIsOpen(false)}
                style={{
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ opacity: 0.8 }}>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-75"
          style={{ zIndex: 1040 }}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div className="d-none d-lg-block" style={{ width: "280px" }}></div>

      <style jsx>{`
        .hover-bg:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
        }
        .sidebar-wrapper {
          overflow-y: auto;
        }
        .sidebar-wrapper::-webkit-scrollbar {
          width: 5px;
        }
        .sidebar-wrapper::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        .nav-link {
          border-left: 3px solid transparent;
        }
        .nav-link.active {
          border-left: 3px solid #fff;
        }
      `}</style>
    </>
  );
}

export default Sidebar;