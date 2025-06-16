import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ManagePlacement() {
  const [placements, setPlacements] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    image: null,
    companyLogo: null,
  });

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const res = await axios.get("https://upskill-server.onrender.com/getplacement");
      setPlacements(res.data);
    } catch (err) {
      console.error("Cannot fetch placements", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("companyName", formData.companyName);
    if (formData.image) data.append("image", formData.image);
    if (formData.companyLogo) data.append("companyLogo", formData.companyLogo);

    try {
      await axios.post("https://upskill-server.onrender.com/addplacement", data);
      setSuccessMessage("Placement record added successfully!");
      setFormData({
        name: "",
        companyName: "",
        image: null,
        companyLogo: null,
      });
      fetchPlacements();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding placement:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this placement?")) {
      axios
        .post("https://upskill-server.onrender.com/deleteplacement", null, {
          params: { id },
        })
        .then(() => {
          alert("Placement deleted successfully.");
          fetchPlacements();
        })
        .catch((err) => {
          alert("Error deleting placement.");
          console.error(err);
        });
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-primary">Manage Placement Records</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6 col-lg-4">
          <input type="text" name="name" className="form-control"	placeholder="Student Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6 col-lg-4">
          <input type="text"	name="companyName" className="form-control"	placeholder="Company Name" value={formData.companyName}	onChange={handleChange}	required />
        </div>
        <div className="col-md-6 col-lg-4">
          <input type="file" name="image"	className="form-control"	accept="image/*" onChange={handleChange}	required />
        </div>
        <div className="col-md-6 col-lg-4">
          <input type="file" name="companyLogo"	className="form-control" accept="image/*" onChange={handleChange}	required />
        </div>
        <div className="col-12">
          <button type="submit"		className="btn btn-success w-100">
            Add Placement
          </button>
        </div>
      </form>

      {successMessage && (
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Student Name</th>
              <th>Company Name</th>
              <th>Student Image</th>
              <th>Company Logo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {placements.length > 0 ? (
              placements.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.company_name}</td>
                  <td>
                    <img src={`data:image/jpeg;base64,${s.image}`} alt="Student" />
                  </td>
                  <td>
                    <img src={`data:image/jpeg;base64,${s.companyLogo}`} alt="Company Logo" />
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No placement records available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagePlacement;
