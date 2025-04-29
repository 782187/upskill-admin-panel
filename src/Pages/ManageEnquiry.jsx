import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageEnquiry() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = () => {
    axios
      .get("http://localhost:8080/UpskillServlet/get-enquiries")
      .then((res) => setStudents(res.data))
      .catch(() => alert("Failed to fetch data"));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      axios.post("http://localhost:8080/UpskillServlet/delete-enquiry", null, {
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
      <h2 className="fw-bold mb-4">Student Enquiries</h2>
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
  );
}

export default ManageEnquiry;
