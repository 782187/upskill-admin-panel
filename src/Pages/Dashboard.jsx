import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import {
  FaUsers, FaChalkboardTeacher, FaEye,
  FaRegNewspaper, FaUserGraduate, FaCalendarAlt
} from "react-icons/fa";
import "./Dashboard.css";
import EnquiryNotificationToast from "./EnquiryNotificationToast";
import { onMessageListener } from "../components/firebase";
const API_URL = import.meta.env.VITE_API_URL;
function Dashboard() {
  useEffect(() => {
  const unsubscribe = onMessageListener().then((payload) => {
    console.log('Foreground notification:', payload);
    alert(`📢 ${payload.notification.title}\n${payload.notification.body}`);
  });

  return () => unsubscribe;
}, []);

  const [students, setStudents] = useState(0);
  const [course, setCourse] = useState(0);
  const [visitors, setVisitors] = useState(0);
  const [blogs, setBlogs] = useState(0);
  const [event, setEvent] = useState(0);

  useEffect(() => {
    fetchEnquiries();
    fetchCourse();
    fetchVisitors();
    fetchBlogs();

  }, []);

  const fetchEnquiries = () => {
    axios.get(`${API_URL}/get-enquiries`)
      .then((res) => setStudents(res.data.length))
      .catch(() => alert("Failed to fetch enquiries"));
  };

  const fetchCourse = () => {
    axios.get(`${API_URL}/get-courses`)
      .then((res) => setCourse(res.data.length))
      .catch(() => alert("Failed to fetch courses"));
  };

  const fetchVisitors = () => {
    axios.get(`${API_URL}/getVisits`)
      .then((res) => setVisitors(res.data.totalVisits))
      .catch(() => alert("Failed to fetch visitors"));
  };

  const fetchBlogs = () => {
    axios.get(`${API_URL}/getblog`)
      .then((res) => setBlogs(res.data.length))
      .catch(() => alert("Failed to fetch blogs"));
  };

  const fetchEvent = () => {
    axios.get(`${API_URL}/fetch-career-applications`)
      .then((res) => setEvent(res.data.length))
      .catch(() => alert("Failed to fetch events"));
  }
  const barData = [
    { name: "Courses", value: course },
    { name: "Enquiries", value: students },
    { name: "Visitors", value: visitors },
    { name: "Blogs", value: blogs },
    { name: "Events", value: event},
  ];

  const pieData = [
    { name: "Courses", value: course },
    { name: "Enquiries", value: students },
    { name: "Blogs", value: blogs },
  ];

  const COLORS = ["#6366f1", "#10b981", "#14b8a6", "#f59e0b", "#ef4444", "#64748b"];

  return (
    <div className="container py-4">
      <div className="mb-2">
        <p className="badge bg-success p-2 text-white">Welcome back! Here's an overview of your data</p>
      </div>

      <div className="row g-3 mb-4 justify-content-center">
        <StatCard icon={<FaChalkboardTeacher />} label="Courses" value={course} color="#6366f1"/>
        <StatCard icon={<FaUserGraduate />} label="Enquiries" value={students} color="#f59e0b"/>
        <StatCard icon={<FaEye />} label="Visitors" value={visitors} color="#14b8a6"/>
        <StatCard icon={<FaRegNewspaper />} label="Blogs" value={blogs} color="#64748b"/>
        <StatCard icon={<FaCalendarAlt />} label="Events" value={event} color="#ef4444"/>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <h5 className="text-dark fw-bold mb-3">📊 Statistics Overview</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <h5 className="text-dark fw-bold mb-3">🎯 Distribution Overview</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <EnquiryNotificationToast/>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="col-6 col-md-4 col-lg-2">
      <div className="card stat-card border-0 shadow-sm text-white px-3" style={{ backgroundColor: color }}>
        <div className="card-body text-center">
          <div className="fs-3 mb-2">{icon}</div>
          <h6 className="fw-semibold">{label}</h6>
          <h4 className="fw-bold">{value}</h4>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
