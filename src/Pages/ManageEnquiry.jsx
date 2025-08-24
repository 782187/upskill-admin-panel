import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageEnquiry() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    const results = students.filter(student =>
      Object.values(student).some(
        value =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredStudents(results);
  }, [searchTerm, students]);

  const fetchEnquiries = () => {
    axios
      .get(`https://upskill-server.onrender.com/get-enquiries`)
      .then((res) => {
        setStudents(res.data);
        setFilteredStudents(res.data);
      })
      .catch(() => alert("Failed to fetch data"));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      axios
        .post(`https://upskill-server.onrender.com/delete-enquiry`, null, {
          params: { id },
        })
        .then((res) => {
          if (res.data.status === "success") {
            setStudents((prev) => prev.filter((student) => student.id !== id));
            setFilteredStudents((prev) =>
              prev.filter((student) => student.id !== id)
            );
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

      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text bg-light">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search enquiries..."
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
              <th>Student Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th className="text-center">Passing Year</th>
              <th>Created At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="text-center">{student.id}</td>
                  <td className="fw-semibold">{student.name}</td>
                  <td>{student.phone}</td>
                  <td>
                    <a href={`mailto:${student.email}`}>{student.email}</a>
                  </td>
                  <td className="text-center">{student.year}</td>
                  <td>{new Date(student.created_at).toLocaleString()}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm px-3"
                      onClick={() => handleDelete(student.id)}
                      title="Delete Enquiry"
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
                      ? "No matching enquiries found"
                      : "No enquiries found"}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="row d-block d-lg-none">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div className="col-12 mb-3" key={student.id}>
              <div className="card shadow-sm border-0">
                <div className="card-header bg-light d-flex justify-content-between align-items-center border border-1">
                  <h5 className="mb-0">{student.name}</h5>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student.id)}
                    title="Delete Enquiry"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <p className="mb-2">
                        <strong>ID:</strong> {student.id}
                      </p>
                      <p className="mb-2">
                        <strong>Contact:</strong>{" "}
                        <a href={`tel:${student.phone}`} className="text-decoration-none">
                          {student.phone}
                        </a>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="mb-2">
                        <strong>Year:</strong> {student.year}
                      </p>
                      <p className="mb-2">
                        <strong>Date:</strong>{" "}
                        {new Date(student.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="mb-0">
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${student.email}`} className="text-decoration-none">
                      {student.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
              {searchTerm ? "No matching enquiries found" : "No enquiries found"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageEnquiry;