import React, { useState, useEffect } from "react";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ title: "", photo: null });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetch(`https://upskill-server.onrender.com/getEvents`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((event) => ({
          ...event,
          photoUrl: event.photo
            ? `data:image/jpeg;base64,${event.photo}`
            : null,
        }));
        setEvents(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.photo) {
      alert("Please fill in all fields");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("photo", formData.photo);

    setLoading(true);
    try {
      const res = await fetch(`https://upskill-server.onrender.com/addEvent`, {
        method: "POST",
        body: payload,
      });

      if (res.ok) {
        setFormData({ title: "", photo: null });
        setMessage("Event added successfully!");

        const updated = await fetch(`https://upskill-server.onrender.com/getEvents`).then((res) =>
          res.json()
        );
        const formatted = updated.map((event) => ({
          ...event,
          photoUrl: event.photo
            ? `data:image/jpeg;base64,${event.photo}`
            : null,
        }));
        setEvents(formatted);
      } else {
        setMessage("Failed to add event");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("Something went wrong");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`https://upskill-server.onrender.com/deleteEvent?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEvents((prev) => prev.filter((event) => event.id !== id));
      } else {
        console.error("Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
    setDeletingId(null);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Manage Events</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-5">
        <div className="col-md-12">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Upload Photo:</label>
          <input
            type="file"
            name="photo"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Submitting..." : "Add Event"}
          </button>
        </div>
      </form>

      {message && (
        <div className="alert alert-info text-center">{message}</div>
      )}

      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-semibold">{event.title}</h5>
                {event.photoUrl && (
                  <img
                    src={event.photoUrl}
                    alt="Event"
                    className="img-fluid rounded mb-3"
                  />
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(event.id)}
                  disabled={deletingId === event.id}
                >
                  {deletingId === event.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageEvents;
