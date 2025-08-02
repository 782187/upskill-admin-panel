import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageCareerApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    axios
      .get("https://upskill-server.onrender.com/fetch-career-applications")
      .then((res) => setApplications(res.data))
      .catch(() => alert("Failed to fetch career applications"));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      axios
        .post("https://upskill-server.onrender.com/delete-career-application", null, {
          params: { id },
        })
        .then((res) => {
          if (res.data.status === "success") {
            setApplications((prev) => prev.filter((item) => item.id !== id));
          } else {
            alert("Delete failed: " + res.data.message);
          }
        })
        .catch(() => alert("Delete request failed"));
    }
  };

  const handleDownload = (id, filename) => {
    axios({
      url: `https://upskill-server.onrender.com/download-resume?id=${id}`,
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => alert("Failed to download resume"));
  };


  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Career Applications</h2>

      <div className="table-responsive d-none d-lg-block">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Position</th>
              <th>Resume</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{app.location}</td>
                  <td>{app.position}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleDownload(app.id, app.resume_filename)}
                    >
                      Download
                    </button>
                  </td>
                  <td>{app.application_date}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(app.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No career applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="row d-block d-lg-none">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div className="col-12 mb-3" key={app.id}>
              <div className="card p-3 shadow-sm">
                <div className="d-flex justify-content-between">
                  <h5>{app.name}</h5>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(app.id)}
                  >
                    Delete
                  </button>
                </div>
                <p><strong>ID:</strong> {app.id}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Phone:</strong> {app.phone}</p>
                <p><strong>Location:</strong> {app.location}</p>
                <p><strong>Position:</strong> {app.position}</p>
                <p>
                  <strong>Resume:</strong>
                  <button
                    className="btn btn-primary p-0 ms-2"
                    onClick={() => handleDownload(app.id, app.resume_filename)}
                  >
                    Download
                  </button>
                </p>
                <p><strong>Applied On:</strong> {app.application_date}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning">No career applications found.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageCareerApplications;