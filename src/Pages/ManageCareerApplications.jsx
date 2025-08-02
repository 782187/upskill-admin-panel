import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageCareerApplications() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    const results = applications.filter(application =>
      Object.values(application).some(
        value =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredApplications(results);
  }, [searchTerm, applications]);

  const fetchApplications = () => {
    setIsLoading(true);
    axios
      .get("https://upskill-server.onrender.com/fetch-career-applications")
      .then((res) => {
        setApplications(res.data);
        setFilteredApplications(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Failed to fetch career applications");
        setIsLoading(false);
      });
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
            setFilteredApplications((prev) => prev.filter((item) => item.id !== id));
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
        link.setAttribute('download', filename || `resume_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => alert("Failed to download resume"));
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Career Applications</h2>

      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text bg-light">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search applications..."
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

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading applications...</p>
        </div>
      ) : (
        <>
          <div className="table-responsive d-none d-lg-block">
            <table className="table table-hover table-bordered rounded">
              <thead className="table-dark">
                <tr>
                  <th className="text-center">ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Position</th>
                  <th className="text-center">Resume</th>
                  <th>Applied On</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <tr key={app.id}>
                      <td className="text-center">{app.id}</td>
                      <td className="fw-semibold">{app.name}</td>
                      <td>
                        <a href={`mailto:${app.email}`}>{app.email}</a>
                      </td>
                      <td>{app.phone}</td>
                      <td>{app.location}</td>
                      <td>{app.position}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-sm px-3"
                          onClick={() => handleDownload(app.id, app.resume_filename)}
                          title="Download Resume"
                        >
                          <i className="bi bi-download"></i>
                        </button>
                      </td>
                      <td>{new Date(app.application_date).toLocaleDateString()}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger btn-sm px-3"
                          onClick={() => handleDelete(app.id)}
                          title="Delete Application"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      <div className="text-muted">
                        {searchTerm
                          ? "No matching applications found"
                          : "No career applications found"}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="row d-block d-lg-none">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <div className="col-12 mb-3" key={app.id}>
                  <div className="card shadow-sm border-0">
                    <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{app.name}</h5>
                      <div>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleDownload(app.id, app.resume_filename)}
                          title="Download Resume"
                        >
                          <i className="bi bi-download"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(app.id)}
                          title="Delete Application"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p className="mb-2">
                            <strong>ID:</strong> {app.id}
                          </p>
                          <p className="mb-2">
                            <strong>Email:</strong> <a href={`mailto:${app.email}`}>{app.email}</a>
                          </p>
                          <p className="mb-2">
                            <strong>Phone:</strong> {app.phone}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-2">
                            <strong>Location:</strong> {app.location}
                          </p>
                          <p className="mb-2">
                            <strong>Position:</strong> {app.position}
                          </p>
                          <p className="mb-2">
                            <strong>Applied On:</strong> {new Date(app.application_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-info">
                  {searchTerm
                    ? "No matching applications found"
                    : "No career applications found"}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ManageCareerApplications;