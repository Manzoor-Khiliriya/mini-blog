import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatePostId, setUpdatePostId] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/posts?page=${page}&tag=${tags}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, tags: tagArray }),
      });
      if (!res.ok) throw new Error("Failed to create post");
      e.target.reset();
      setTags("");
      setError("");
      setSuccess("Post created successfully!");
      setPage(1);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, content, tags } = updateData;
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/${updatePostId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content, tags: tagArray }),
        }
      );
      if (!res.ok) throw new Error("Failed to update post");
      setIsUpdating(false);
      setUpdatePostId(null);
      setUpdateData({ title: "", content: "", tags: "" });
      setSuccess("Post updated successfully!");
      fetchPosts();
      navigate("/update-post");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchPosts();
      } catch {
        setError("Failed to delete the post.");
      }
    }
  };

  const handleEdit = (post) => {
    setIsUpdating(true);
    setUpdatePostId(post.id);
    setUpdateData({
      title: post.title,
      content: post.content,
      tags: post.tags.join(", "),
    });
    navigate(`/update-post/${post.id}`);
  };

  useEffect(() => {
    fetchPosts();
  }, [page, tags]);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {/* Post Creation Form */}
      <form onSubmit={handleCreate} className="mb-4">
        <input
          name="title"
          placeholder="Title"
          className="form-control mb-2"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          className="form-control mb-2"
          required
        ></textarea>
        <input
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags"
          className="form-control mb-2"
        />
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>

      {/* Post Update Form */}
      {isUpdating && (
        <form onSubmit={handleUpdate} className="mb-4">
          <input
            name="title"
            value={updateData.title}
            onChange={(e) =>
              setUpdateData({ ...updateData, title: e.target.value })
            }
            placeholder="Title"
            className="form-control mb-2"
            required
          />
          <textarea
            name="content"
            value={updateData.content}
            onChange={(e) =>
              setUpdateData({ ...updateData, content: e.target.value })
            }
            placeholder="Content"
            className="form-control mb-2"
            required
          ></textarea>
          <input
            name="tags"
            value={updateData.tags}
            onChange={(e) =>
              setUpdateData({ ...updateData, tags: e.target.value })
            }
            placeholder="Enter tags"
            className="form-control mb-2"
          />
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      )}

      {/* Loading State */}
      {loading && <div>Loading posts...</div>}

      {/* Posts List */}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="card mb-3">
            <div className="card-body">
              <h5>{post.title}</h5>
              <p>{post.content}</p>
              <div>
                <strong>Tags:</strong> {post.tags?.join(", ")}
              </div>
              <button
                onClick={() => handleEdit(post)}
                className="btn btn-warning mt-2 me-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="btn btn-danger mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="btn btn-outline-secondary"
        >
          ⬅ Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages || posts.length === 0}
        className="btn btn-outline-secondary"
      >
        Next ➡
      </button>
      </div>
      
    </div>
  );
}

export default AdminDashboard;
