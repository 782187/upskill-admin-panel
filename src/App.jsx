import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./Pages/Dashboard";
import ManageCourses from "./Pages/ManageCourse";
import ManageBlogs from "./Pages/ManageBlogs";
import ManageEvents from "./Pages/ManageEvents";
import ManageEnquiry from "./Pages/ManageEnquiry";
import FeedbackReview from "./Pages/FeedbackReview1";
import ManagePlacement from "./Pages/ManagePlacment";
import CourseCard from "./components/CourseCard";
import LoginPage from "./components/LoginPage";
import WelcomePage from "./components/WelcomePage";

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

        <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/courses" element={<AdminLayout><ManageCourses /></AdminLayout>} />
        <Route path="/blogs" element={<AdminLayout><ManageBlogs /></AdminLayout>} />
        <Route path="/events" element={<AdminLayout><ManageEvents /></AdminLayout>} />
        <Route path="/enquiries" element={<AdminLayout><ManageEnquiry /></AdminLayout>} />
        <Route path="/coursecard" element={<AdminLayout><CourseCard /></AdminLayout>} />
        <Route path="/feedback" element={<AdminLayout><FeedbackReview /></AdminLayout>} />
        <Route path="/placement" element={<AdminLayout><ManagePlacement /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
