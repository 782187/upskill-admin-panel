import React from "react";
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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column flex-lg-row">
        <Sidebar />
        <div className="flex-grow-1">
          <Header />
          <div
            className="p-4"
            style={{
              background: "linear-gradient(to bottom, #f0f2f5, #dee2e6)",
              minHeight: "100vh",
              marginTop: "56px",
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<ManageCourses />} />
              <Route path="/blogs" element={<ManageBlogs />} />
              <Route path="/events" element={<ManageEvents />} />
              <Route path="/enquiries" element={<ManageEnquiry />} />
              <Route path="/coursecard" element={<CourseCard />} />
              <Route path="/feedback" element={<FeedbackReview />} />
              <Route path="/placement" element={<ManagePlacement />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
