import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageDemoBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios
      .get("https://upskill-server.onrender.com/fetch-demo-bookings")
      .then((res) => setBookings(res.data))
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

      <div className="table-responsive d-none d-lg-block">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Course</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.name}</td>
                  <td>{booking.contact}</td>
                  <td>{booking.email}</td>
                  <td>{booking.course}</td>
                  <td>{booking.created_at}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No demo bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="row d-block d-lg-none">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="col-12 mb-3" key={booking.id}>
              <div className="card p-3 shadow-sm">
                <div className="d-flex justify-content-between">
                  <h5>{booking.name}</h5>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </button>
                </div>
                <p><strong>ID:</strong> {booking.id}</p>
                <p><strong>Contact:</strong> {booking.contact}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Course:</strong> {booking.course}</p>
                <p><strong>Created At:</strong> {booking.created_at}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning">No demo bookings found.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageDemoBooking;
