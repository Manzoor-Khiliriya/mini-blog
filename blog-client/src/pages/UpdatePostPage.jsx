import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data) {
        setPost(data);
        setUpdateData({
          title: data.title,
          content: data.content,
          tags: data.tags.join(", "),
        });
      }
    };
    fetchPost();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, content, tags } = updateData;
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, tags: tagArray }),
      });
      if (!res.ok) throw new Error("Failed to update post");
      setSuccess("Post updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError("Failed to update post. Please try again.");
      console.error(err.message);
    }
  };

  if (!post) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate} className="mb-4">
        <div className="mb-3">
          <input
            name="title"
            value={updateData.title}
            onChange={(e) =>
              setUpdateData({ ...updateData, title: e.target.value })
            }
            placeholder="Title"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="content"
            value={updateData.content}
            onChange={(e) =>
              setUpdateData({ ...updateData, content: e.target.value })
            }
            placeholder="Content"
            className="form-control"
            rows="6"
            required
          />
        </div>

        <div className="mb-3">
          <input
            name="tags"
            value={updateData.tags}
            onChange={(e) =>
              setUpdateData({ ...updateData, tags: e.target.value })
            }
            placeholder="Enter tags (comma separated)"
            className="form-control"
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button className="btn btn-primary btn-lg w-100">Update Post</button>
      </form>
    </div>
  );
}

export default UpdatePostPage;
