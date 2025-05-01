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
    { to: "/", label: "Dashboard", icon: <Home className="me-2" /> },
    { to: "/enquiries", label: "Enquiries", icon: <Users className="me-2" /> },
    { to: "/courses", label: "Courses", icon: <Book className="me-2" /> },
    { to: "/feedback", label: "Feedback", icon: <MessageCircle className="me-2" /> },
    { to: "/blogs", label: "Blogs", icon: <FileText className="me-2" /> },
    { to: "/events", label: "Events", icon: <Calendar className="me-2" /> },
    { to: "/placement", label: "Placement", icon: <Briefcase className="me-2" /> },
  ];

  return (
    <>
      <div className="d-lg-none bg-dark text-white px-3 py-2 position-sticky top-0 z-3 w-100 d-flex align-items-center">
        <button className="btn btn-outline-light me-2" onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`position-fixed top-0 start-0 ${isOpen ? "d-block" : "d-none"} d-lg-block`}
        style={{
          width: "250px",
          height: "100vh",
          background: "linear-gradient(to bottom, #1c1f24, #343a40)",
          color: "#fff",
          borderRight: "1px solid #444",
          zIndex: 1050,
        }}
      >

        <div className="d-flex justify-content-between align-items-center d-lg-none p-3">
          <h5 className="text-primary">Menu</h5>
          <button className="btn btn-outline-light btn-sm" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        <ul
          className="nav flex-column px-2"
          style={{ gap: "20px", position: "relative", top: "50px" }}
        >
          {navItems.map((item, idx) => (
            <li className="nav-item mb-1" key={idx}>
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded d-flex align-items-center ${isActive ? "bg-info text-dark fw-bold" : "text-white"
                  }`
                }
                to={item.to}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className="d-none d-lg-block" style={{ width: "250px" }}></div>
    </>
  );
}

export default Sidebar;
