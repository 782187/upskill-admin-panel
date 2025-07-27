import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageCourse() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState("");
  const [technology, setTechnology] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [certificateImage, setCertificateImage] = useState(null);
  const [coursePdf, setCoursePdf] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("mode", mode);
    formData.append("description", description);
    formData.append("topics", topics);
    formData.append("technology", technology);
    formData.append("courseimg", courseImage);
    formData.append("certificateimg", certificateImage);
    formData.append("coursepdf", coursePdf); 

    try {
      const response = await axios.post("https://upskill-server.onrender.com/uploadCourse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data);
      setTitle("");
      setDuration("");
      setMode("");
      setDescription("");
      setTopics("");
      setTechnology("");
      setCourseImage(null);
      setCertificateImage(null);
      setCoursePdf(null); 
    } catch (error) {
      alert("Error uploading course: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Course</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        <input type="text" placeholder="Course Title" className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Course Duration" className="form-control mb-2" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        <input type="text" placeholder="Course Mode" className="form-control mb-2" value={mode} onChange={(e) => setMode(e.target.value)} required />
        <textarea placeholder="Add HTML Template Description" className="form-control mb-2" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <textarea placeholder="Add HTML Template Topics" className="form-control mb-2" value={topics} onChange={(e) => setTopics(e.target.value)} required />
        <textarea placeholder="Technology" className="form-control mb-2" value={technology} onChange={(e) => setTechnology(e.target.value)} required />

        <label>Course Image:</label>
        <input type="file" className="form-control mb-2" onChange={(e) => setCourseImage(e.target.files[0])} required />

        <label>Certificate Image:</label>
        <input type="file" className="form-control mb-2" onChange={(e) => setCertificateImage(e.target.files[0])} />

        <label>Course PDF:</label>
        <input type="file" className="form-control mb-3" accept="application/pdf" onChange={(e) => setCoursePdf(e.target.files[0])} />

        <button type="submit" className="btn btn-success w-100">Submit</button>
      </form>

      <button className="btn btn-primary mt-3" onClick={() => navigate("/coursecard")}>
        View Courses
      </button>
    </div>
  );
}

export default ManageCourse;