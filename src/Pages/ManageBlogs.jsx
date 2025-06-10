import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.shortDesc || !formData.content) return;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("shortDesc", formData.shortDesc);
    data.append("content", formData.content);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post("https://upskill-server.onrender.com/addblog", data);
      const savedBlog = response.data;
      setBlogs((prev) => [savedBlog, ...prev]); 
    } catch (error) {
      console.error("Error posting blog:", error);
    }

    setFormData({ title: "", shortDesc: "", content: "", image: null });
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("https://upskill-server.onrender.com/deleteblog", { id });
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Post a New Blog</h2>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="shortDesc"
            className="form-control"
            placeholder="Short Description"
            value={formData.shortDesc}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            name="content"
            className="form-control"
            placeholder="Write your blog content..."
            rows="6"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Post Blog
        </button>
      </form>

      <h3 className="mb-3">All Blogs</h3>
      {blogs.length === 0 ? (
        <p>No blogs posted yet.</p>
      ) : (
        <div className="row">
          {blogs.map((blog, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <h6 className="text-muted">{blog.shortDesc}</h6>
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt="blog"
                      className="img-fluid rounded mb-3"
                    />
                  )}
                  <p className="card-text">{blog.content}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageBlogs;
