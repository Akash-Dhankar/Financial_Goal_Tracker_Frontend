import { Link, useLocation } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth'; 

function Header() {
  const location = useLocation();
  const loggedIn = isLoggedIn(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Goal Tracker</Link>

      <div className="ms-auto">
        {!loggedIn ? (
          <>
            {location.pathname !== '/login' && (
              <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
            )}
            {location.pathname !== '/register' && (
              <Link className="btn btn-outline-light" to="/register">Signup</Link>
            )}
          </>
        ) : (
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Header;
