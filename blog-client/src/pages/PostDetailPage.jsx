import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [id]);

  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          ❌ {error}
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
            ⬅ Back to Home
          </button>
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading post...</p>
      </div>
    );

  return (
    <div className="container my-5">
      <button className="btn btn-outline-primary mb-4" onClick={() => navigate('/')}>
        ⬅ Back to Home
      </button>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-primary mb-3">📝 {post.title}</h2>
          <p className="card-text">{post.content}</p>
          <div className="mt-4">
            <strong>📌 Tags:</strong>{' '}
            <span className="text-muted">{post.tags?.join(', ') || 'No tags'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
