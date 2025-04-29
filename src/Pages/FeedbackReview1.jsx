import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, Trash2 } from "lucide-react";

function FeedbackReview() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:8080/UpskillServlet/FetchFeedbackServlet");
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !course || !comment || rating === 0) {
      alert("Please fill all fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("course", course);
    formData.append("comment", comment);
    formData.append("rating", rating);
    if (photo) {
      formData.append("photo", photo);
    }
    try {
      await axios.post("http://localhost:8080/UpskillServlet/SubmitFeedbackServlet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setCourse("");
      setComment("");
      setRating(0);
      setPhoto(null);
      fetchReviews();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleDelete = async (review) => {
    if (!window.confirm(`Delete feedback of ${review.name}?`)) return;
    try {
      const formData = new FormData();
      formData.append("name", review.name);
      formData.append("course", review.course);
      await axios.post("http://localhost:8080/UpskillServlet/DeleteFeedbackServlet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchReviews();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const renderStars = (ratingValue, setRatingFunc = null) => (
    <div style={{ display: "inline-flex", gap: "5px", cursor: setRatingFunc ? "pointer" : "default" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          onClick={setRatingFunc ? () => setRatingFunc(star) : null}
          style={{
            fill: star <= ratingValue ? "#ffc107" : "none",
            color: star <= ratingValue ? "#ffc107" : "#e4e5e9",
            transition: "transform 0.2s",
          }}
          onMouseOver={setRatingFunc ? (e) => (e.target.style.transform = "scale(1.2)") : null}
          onMouseOut={setRatingFunc ? (e) => (e.target.style.transform = "scale(1)") : null}
        />
      ))}
    </div>
  );

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Student Feedback & Reviews</h2>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Write your feedback"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating:</label>
          <div>{renderStars(rating, setRating)}</div>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Submit Feedback
        </button>
      </form>
      <h3 className="fw-bold mb-3">Uploaded Reviews</h3>
      <div className="row g-4">
        {reviews.length === 0 ? (
          <p>No reviews uploaded yet.</p>
        ) : (
          reviews.map((review, idx) => (
            <div key={idx} className="col-md-4">
              <div className="card h-100 shadow">
                <div className="card-body text-center">
                  <img
                    src={review.image || "https://via.placeholder.com/60"}
                    alt={review.name}
                    className="rounded-circle mb-3 border border-primary shadow"
                    style={{ width: 70, height: 70, objectFit: "cover" }}
                  />
                  <h6 className="fw-bold">{review.name}</h6>
                  <p className="text-muted small">{review.course}</p>
                  {renderStars(review.rating)}
                  <p className="text-muted small mt-2" style={{ height: "5rem", overflowY: "auto" }}>
                    {review.review}
                  </p>
                  <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => handleDelete(review)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FeedbackReview;
