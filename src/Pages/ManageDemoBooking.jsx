import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageDemoBooking() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    const results = bookings.filter(booking =>
      Object.values(booking).some(
        value =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredBookings(results);
  }, [searchTerm, bookings]);

  const fetchBookings = () => {
    axios
      .get("https://upskill-server.onrender.com/fetch-demo-bookings")
      .then((res) => {
        setBookings(res.data);
        setFilteredBookings(res.data);
      })
      .catch(() => alert("Failed to fetch demo bookings"));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this demo booking?")) {
      axios
        .post("https://upskill-server.onrender.com/delete-demo-booking", null, {
          params: { id },
        })
        .then((res) => {
          if (res.data.status === "success") {
            setBookings((prev) => prev.filter((item) => item.id !== id));
            setFilteredBookings((prev) => prev.filter((item) => item.id !== id));
          } else {
            alert("Delete failed: " + res.data.message);
          }
        })
        .catch(() => alert("Delete request failed"));
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Demo Bookings</h2>

      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text bg-light">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="table-responsive d-none d-lg-block">
        <table className="table table-hover table-bordered rounded">
          <thead className="table-dark">
            <tr>
              <th className="text-center">ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Course</th>
              <th>Created At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="text-center">{booking.id}</td>
                  <td className="fw-semibold">{booking.name}</td>
                  <td>{booking.contact}</td>
                  <td>
                    <a href={`mailto:${booking.email}`}>{booking.email}</a>
                  </td>
                  <td>{booking.course}</td>
                  <td>{new Date(booking.created_at).toLocaleString()}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm px-3"
                      onClick={() => handleDelete(booking.id)}
                      title="Delete Booking"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  <div className="text-muted">
                    {searchTerm
                      ? "No matching bookings found"
                      : "No demo bookings found"}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="row d-block d-lg-none">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div className="col-12 mb-3" key={booking.id}>
              <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{booking.name}</h5>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(booking.id)}
                    title="Delete Booking"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <p className="mb-2">
                        <strong>ID:</strong> {booking.id}
                      </p>
                      <p className="mb-2">
                        <strong>Contact:</strong> {booking.contact}
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="mb-2">
                        <strong>Course:</strong> {booking.course}
                      </p>
                      <p className="mb-2">
                        <strong>Date:</strong>{" "}
                        {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="mb-0">
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${booking.email}`}>{booking.email}</a>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
              {searchTerm
                ? "No matching bookings found"
                : "No demo bookings found"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageDemoBooking;