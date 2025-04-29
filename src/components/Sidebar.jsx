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
      <div className="d-flex d-lg-none justify-content-between align-items-center bg-dark text-white px-3 py-2 shadow-sm">
        <h5 className="mb-0 text-primary">Admin Panel</h5>
        <button className="btn btn-outline-light" onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`bg-dark text-white p-3 vh-100 position-fixed top-0 start-0 ${
          isOpen ? "d-block" : "d-none"
        } d-lg-block`}
        style={{ width: "250px", borderRight: "1px solid #ddd", zIndex: 1050 }}
      >
        <div className="d-flex justify-content-between align-items-center d-lg-none mb-3">
          <h5 className="text-primary">Menu</h5>
          <button className="btn btn-outline-light btn-sm" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        <h4 className="fw-bold mb-4 text-primary d-none d-lg-block">Admin Panel</h4>

        <ul className="nav flex-column">
          {navItems.map((item, idx) => (
            <li className="nav-item mb-2" key={idx}>
              <NavLink
                className={({ isActive }) =>
                  `nav-link fs-5 d-flex align-items-center ${
                    isActive ? "text-primary" : "text-white"
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
