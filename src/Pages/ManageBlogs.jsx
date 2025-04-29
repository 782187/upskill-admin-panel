import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const newBlog = {
      title: formData.title,
      content: formData.content,
      image: formData.image ? URL.createObjectURL(formData.image) : null,
    };

    setBlogs((prev) => [newBlog, ...prev]);

    setFormData({ title: "", content: "", image: null });
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
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt="blog visual"
                      className="img-fluid rounded mb-3"
                    />
                  )}
                  <p className="card-text">{blog.content}</p>
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