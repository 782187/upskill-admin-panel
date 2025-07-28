import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import ManageCourses from "./Pages/ManageCourse";
import ManageBlogs from "./Pages/ManageBlogs";
import ManageEvents from "./Pages/ManageEvents";
import ManageEnquiry from "./Pages/ManageEnquiry";
import ManageDemoBooking from "./Pages/ManageDemoBooking";
import FeedbackReview from "./Pages/FeedbackReview1";
import ManagePlacement from "./Pages/ManagePlacment";
import CourseCard from "./components/CourseCard";
import LoginPage from "./components/LoginPage";
import WelcomePage from "./components/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";

import { onMessageListener } from "./components/firebase";

const AdminLayout = ({ children }) => (
  <div className="d-flex flex-column flex-lg-row">
    <Sidebar />
    <div className="flex-grow-1">
      <Header />
      <div className="p-3">{children}</div>
    </div>
  </div>
);

function App() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        console.log("Foreground notification received:", payload);
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      })
      .catch((err) => console.log("Failed to receive foreground message: ", err));
  }, []);

  return (
    <Router>
      {notification && (
        <div className="alert alert-info fixed-top text-center mb-0" style={{ zIndex: 1050 }}>
          <strong>{notification.title}</strong> - {notification.body}
        </div>
      )}

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><AdminLayout><ManageCourses /></AdminLayout></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><AdminLayout><ManageBlogs /></AdminLayout></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><AdminLayout><ManageEvents /></AdminLayout></ProtectedRoute>} />
        <Route path="/enquiries" element={<ProtectedRoute><AdminLayout><ManageEnquiry /></AdminLayout></ProtectedRoute>} />
        <Route path="/demolecture" element={<ProtectedRoute><AdminLayout><ManageDemoBooking/></AdminLayout></ProtectedRoute>} />
        <Route path="/coursecard" element={<ProtectedRoute><AdminLayout><CourseCard /></AdminLayout></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute><AdminLayout><FeedbackReview /></AdminLayout></ProtectedRoute>} />
        <Route path="/placement" element={<ProtectedRoute><AdminLayout><ManagePlacement /></AdminLayout></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
