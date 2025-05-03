import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageEnquiry() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = () => {
    axios
      .get("https://upskill-servlet.onrender.com/get-enquiries")
      .then((res) => setStudents(res.data))
      .catch(() => alert("Failed to fetch data"));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      axios.post("https://upskill-servlet.onrender.com/delete-enquiry", null, {
          params: { id },
        })
        .then((res) => {
          if (res.data.status === "success") {
            setStudents((prev) => prev.filter((student) => student.id !== id));
          } else {
            alert("Delete failed: " + res.data.message);
          }
        })
        .catch(() => alert("Delete request failed"));
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Student Enquiries</h2>
      
      {/* Table for larger screens */}
      <div className="table-responsive d-none d-lg-block">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Passing Year</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.phone}</td>
                  <td>{student.email}</td>
                  <td>{student.year}</td>
                  <td>{student.created_at}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No enquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for smaller screens */}
      <div className="row d-block d-lg-none">
        {students.length > 0 ? (
          students.map((student) => (
            <div className="col-12 mb-3" key={student.id}>
              <div className="card p-3 shadow-sm">
                <div className="d-flex justify-content-between">
                  <h5>{student.name}</h5>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </div>
                <p><strong>ID:</strong> {student.id}</p>
                <p><strong>Contact:</strong> {student.phone}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Passing Year:</strong> {student.year}</p>
                <p><strong>Created At:</strong> {student.created_at}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning">No enquiries found.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageEnquiry;
