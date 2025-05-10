import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mini-Blog
        </Link>
        <div>
          {isLoggedIn ? (
            <>
              <Link className="btn btn-outline-light me-2" to="/dashboard">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline-light">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-light" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
