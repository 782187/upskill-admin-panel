import React, { useState } from "react";

function ManagePlacement() {
  const [placements, setPlacements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    education: "",
    passingYear: "",
    companyName: "",
  });

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData(student);
  };

  const handleDelete = (id) => {
    setPlacements(placements.filter((s) => s.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setPlacements((prev) =>
        prev.map((s) => (s.id === editingId ? formData : s))
      );
      setEditingId(null);
    } else {
      setPlacements([...placements, { ...formData, id: Date.now() }]);
    }

    setFormData({
      id: "",
      name: "",
      phone: "",
      email: "",
      education: "",
      passingYear: "",
      companyName: "",
    });
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Placement Records</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6 col-lg-4">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 col-lg-4">
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Contact Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 col-lg-4">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 col-lg-4">
          <input
            type="text"
            name="education"
            className="form-control"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 col-lg-4">
          <input
            type="number"
            name="passingYear"
            className="form-control"
            placeholder="Passing Year"
            value={formData.passingYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 col-lg-4">
          <input
            type="text"
            name="companyName"
            className="form-control"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-dark w-100">
            {editingId ? "Update Record" : "Add Placement"}
          </button>
        </div>
      </form>

      {/* Responsive Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Education</th>
              <th>Passing Year</th>
              <th>Company Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {placements.length > 0 ? (
              placements.map((s, idx) => (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.phone}</td>
                  <td>{s.email}</td>
                  <td>{s.education}</td>
                  <td>{s.passingYear}</td>
                  <td>{s.companyName}</td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm me-2"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No placement records available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagePlacement;
