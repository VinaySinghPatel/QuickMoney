import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const [Credential, ChangeCred] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    console.log('Submit');
    try {
      e.preventDefault();
      let response = await fetch('http://localhost:5000/api/auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: Credential.email, password: Credential.password }),
      });
      
      let json = await response.json();
      console.log(json);

      if (json.Succes) {
        // Save the Auth-Token and User ID
        localStorage.setItem('auth-token', json.Authtoken);
        localStorage.setItem('userId', json._id); // Save the userId 
        console.log(json._id);
        
        // Redirect user to the home page
        navigate('/');

        // Show success message
        props.EditTheAlert('Success', 'Successfully You Are Logged In');
      } else {
        // Show error message
        props.EditTheAlert('Error', 'There is an Error');
      }
    } catch (error) {
      console.log('Error in API Data Fetching:', error);
    }
  };

  const onChange = (e) => {
    ChangeCred({ ...Credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5 bg-dark text-white p-5">
      <div>
        <div className="py-2">
          <h1>Login With Your Details</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control my-2"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onChange}
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group my-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control my-2"
              id="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
