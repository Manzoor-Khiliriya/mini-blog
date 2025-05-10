import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts?page=${page}&tag=${tag}`);
      const data = await res.json();
      setPosts(data.posts || []);

      setHasMore((data.posts || []).length === 5);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, tag]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 border-bottom pb-2">📚 All Blog Posts</h2>

      {/* Tag filter input */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
              setPage(1);
            }}
            placeholder="🔍 Filter by tag (e.g., tech, life)"
            className="form-control shadow-sm"
          />
        </div>
      </div>

      {/* Display posts */}
      <div className="row">
        {posts.length === 0 ? (
          <p className="text-center text-muted">No posts found.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">📌 {post.title}</h5>
                  <p className="card-text flex-grow-1">{post.content.slice(0, 100)}...</p>
                  <div className="mb-2">
                    <strong>Tags:</strong> <span className="text-muted">{post.tags.join(', ')}</span>
                  </div>
                  <Link to={`/post/${post.id}`} className="btn btn-outline-primary mt-auto">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-outline-secondary"
        >
          ⬅ Prev
        </button>
        {hasMore && (
          <button
            onClick={() => setPage(page + 1)}
            className="btn btn-outline-secondary"
          >
            Next ➡
          </button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
