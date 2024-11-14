import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import { useNavigate,useLocation } from 'react-router-dom';
const Navbar = () => {
  let history = useNavigate();
  const handlelogout = ()=>{
localStorage.removeItem('auth-token');
history('/login');
  }
  const Location = useLocation();
  useEffect(()=>{
    // console.log(Location.pathname);
  },[Location])
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Quick-Money</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${Location.pathname === "/" ? "active" : ""} `} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${Location.pathname === "/about" ? "active" : ""} `} to="/About">About</Link>
          </li>
          {localStorage.getItem('token') && (
                <li className="nav-item">
                  <Link className={`nav-link`} to="/NewPost">Rent-Money</Link>
                </li>
              )}
              {localStorage.getItem('token') && (
           <li className="nav-item">
            <Link className={`nav-link ${Location.pathname === "/Profile" ? "active" : ""} `} to="/Profile">Profile</Link>
          </li>)}
          {localStorage.getItem('token') && (
           <li className="nav-item">
            <Link className={`nav-link ${Location.pathname === "/MyPost" ? "active" : ""} `} to="/MyPost">My-Post</Link>
          </li>)}
        </ul>
       {!localStorage.getItem('token') ?
        <form className="d-flex" role="search">
          <Link className="btn btn-primary mx-2" to="/Login" role="button">Login</Link>
        <Link className="btn btn-primary mx-2" to="/SignUp" role="button">Sign-Up</Link>
        <li className="nav-item">
            <Link className={`nav-link ${Location.pathname === "/Verify" ? "active" : ""} `} to="/Verify">Verify</Link>
          </li>
        </form>
     : <button onClick={handlelogout} className='btn btn-primary'>LogOut</button>  }
      </div>
    </div>
  </nav>
</>
  )
}

export default Navbar;
