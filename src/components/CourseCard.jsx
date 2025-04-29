import React, { useState, useEffect } from "react";
import axios from "axios";

function CourseCard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get("http://localhost:8080/UpskillServlet/get-courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios({
        method: "post",
        url: "http://localhost:8080/UpskillServlet/delete-course",
        params: { id: id },
      })
        .then((res) => {
          alert("Course deleted successfully.");
          fetchCourses();
        })
        .catch((err) => {
          alert("Error deleting course.");
          console.error(err);
        });
    }
  };


  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">Available Courses</h2>
      <div className="row g-4">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold">{course.title}</h5>
                <p className="card-text text-muted">Duration: {course.duration}</p>
                <p className="card-text">
                  <strong>Mode:</strong> {course.mode}
                </p>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseCard;
