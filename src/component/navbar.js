import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  let history = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("auth-token");
    history("/login");
  };

  const Location = useLocation();
  useEffect(() => {
    // console.log(Location.pathname);
  }, [Location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand text-warning font-weight-bold" to="/">
            Quick-Money
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link text-light ${
                    Location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link text-light ${
                    Location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              {localStorage.getItem("auth-token") && (
                <li className="nav-item">
                  <Link className={`nav-link text-light`} to="/NewPost">
                    Rent-Money
                  </Link>
                </li>
              )}
              {localStorage.getItem("auth-token") && (
                <li className="nav-item">
                  <Link
                    className={`nav-link text-light ${
                      Location.pathname === "/Profile" ? "active" : ""
                    }`}
                    to="/Profile"
                  >
                    Profile
                  </Link>
                </li>
              )}
              {localStorage.getItem("auth-token") && (
                <li className="nav-item">
                  <Link
                    className={`nav-link text-light ${
                      Location.pathname === "/MyPost" ? "active" : ""
                    }`}
                    to="/MyPost"
                  >
                    My-Post
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("auth-token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-primary mx-2 text-white"
                  to="/Login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2 text-white"
                  to="/SignUp"
                  role="button"
                >
                  Sign-Up
                </Link>
              </form>
            ) : (
              <button
                onClick={handlelogout}
                className="btn btn-danger text-white"
              >
                LogOut
              </button>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          background: linear-gradient(90deg, #0f0f3b, #1e1e2f);
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
        }

        .navbar-brand {
          font-size: 1.8rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .nav-link {
          font-size: 1rem;
          font-weight: 500;
          color: #dcdcdc;
          transition: color 0.3s ease, transform 0.2s ease-in-out;
        }

        .nav-link:hover {
          color: #ffd700;
          transform: scale(1.05);
        }

        .nav-link.active {
          color: #ffd700;
        }

        .btn-primary,
        .btn-danger {
          font-size: 1rem;
          font-weight: 500;
          border-radius: 25px;
          padding: 0.5rem 1.5rem;
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
          transition: background 0.3s ease, transform 0.2s ease-in-out;
        }

        .btn-primary:hover,
        .btn-danger:hover {
          transform: scale(1.05);
        }

        .btn-danger {
          background-color: #dc3545;
        }

        .btn-danger:hover {
          background-color: #b92d2a;
        }
      `}</style>
    </>
  );
};

export default Navbar;
