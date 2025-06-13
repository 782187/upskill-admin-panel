import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    content: "",
    image: null,
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get("https://upskill-server.onrender.com/getblog");
      setBlogs(res.data);
    } catch (err) {
      console.error("Cannot fetch blogs", err);
    }
  };

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
      await axios.post("https://upskill-server.onrender.com/addblog", data);
      setSuccessMessage("Blog posted successfully!");
      setFormData({ title: "", shortDesc: "", content: "", image: null });
      fetchBlog();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios({
        method: "post",
        url: "https://upskill-server.onrender.com/deleteblog",
        params: { id: id },
      })
      .then(() => {
        alert("Blog deleted successfully.: " + id);
        fetchBlog();
      })
      .catch((err) => {
        alert("Error deleting Blog.");
        console.error(err);
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Post a New Blog</h2>

      <form onSubmit={handleSubmit} className="mb-3">
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

      {successMessage && (
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}

      <h3 className="mb-3">All Blogs</h3>
      {blogs.length === 0 ? (
        <p>No blogs posted yet.</p>
      ) : (
        <div className="row">
          {blogs.map((blog, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card h-100">
                <img src={blog.image} alt="Blog" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <h6 className="text-muted">{blog.short_desc}</h6>
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
