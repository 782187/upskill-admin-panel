import React, { useState } from "react";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    photo: null,
    video: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || (!formData.photo && !formData.video)) return;

    const newEvent = {
      title: formData.title,
      photo: formData.photo ? URL.createObjectURL(formData.photo) : null,
      video: formData.video,
    };

    setEvents((prev) => [...prev, newEvent]);
    setFormData({ title: "", photo: null, video: "" });
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Manage Events</h2>

      {/* Form */}
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
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="video"
            className="form-control mt-4 mt-md-0"
            placeholder="YouTube Link or Video URL"
            value={formData.video}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Add Event
          </button>
        </div>
      </form>

      {/* Event List */}
      <div className="row">
        {events.map((event, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-semibold">{event.title}</h5>
                {event.photo && (
                  <img
                    src={event.photo}
                    alt="Event"
                    className="img-fluid rounded mb-3"
                  />
                )}
                {event.video && event.video.includes("youtube.com") ? (
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={event.video.replace("watch?v=", "embed/")}
                      title="YouTube video"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : event.video ? (
                  <video className="w-100" controls>
                    <source src={event.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageEvents;