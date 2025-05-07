import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [students, setStudents] = useState(0);
  const [course, setCourse] = useState(0);
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    fetchEnquiries();
    fetchCourse();
    fetchVisitors();
  }, []);

  const fetchEnquiries = () => {
    axios.get("https://upskill-server.onrender.com/get-enquiries")
      .then((res) => {
        setStudents(res.data.length);
      })
      .catch(() => alert("Failed to fetch data"));
  };

  const fetchCourse = () =>{
    axios.get("https://upskill-server.onrender.com/get-courses")
      .then((res) => {
        setCourse(res.data.length);
      })
      .catch(() => alert("Failed to fetch data"));
  };

  const fetchVisitors = () =>{
    axios.get("https://upskill-server.onrender.com/getVisits")
      .then((res) =>{
        setVisitors(res.data.totalVisits);
      })
      .catch(() => alert("Failed to fetch Visitors data"));
  };
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm text-center border-primary">
            <div className="card-header bg-primary text-white">
              <i className="bi bi-book" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <div className="card-body">
              <h5 className="card-title">Total Courses</h5>
              <h2 className="card-text text-primary fw-bold">{4+course}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center border-info">
            <div className="card-header bg-info text-white">
              <i className="bi bi-briefcase" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <div className="card-body">
              <h5 className="card-title">Job Applicants</h5>
              <h2 className="card-text text-info fw-bold">50</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center border-danger">
            <div className="card-header bg-danger text-white">
              <i className="bi bi-calendar" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <div className="card-body">
              <h5 className="card-title">Total Events</h5>
              <h2 className="card-text text-danger fw-bold">8</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm text-center border-warning">
            <div className="card-header bg-warning text-white">
              <i className="bi bi-clipboard" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <div className="card-body">
              <h5 className="card-title">Enquiry Students</h5>
              <h2 className="card-text text-warning fw-bold">{students}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center border-secondary">
            <div className="card-header bg-secondary text-white">
              <i className="bi bi-file-text" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <div className="card-body">
              <h5 className="card-title">Total Blogs</h5>
              <h2 className="card-text text-secondary fw-bold">23</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center border-dark">
            <div className="card-header bg-dark text-white">
              <i className="bi bi-layers" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <div className="card-body">
              <h5 className="card-title">Number Of Visitors</h5>
              <h2 className="card-text text-dark fw-bold">{visitors}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
