import React, { useEffect } from "react";
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
import { onMessage } from "firebase/messaging";
import { messaging } from "./components/firebase";


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
  onMessage(messaging, (payload) => {
  console.log('Foreground message:', payload);
  
});
  useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }
}, []);


  return (
    <Router>
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
