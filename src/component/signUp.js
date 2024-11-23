import React from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SignUp = (props) => {
  const navigate = useNavigate();
  const [Credential, ChangeCred] = useState({email : "",password : "",name:"",username: "",mobilenumber : ""})
  const handleSubmit = async (e) => {
      try {
          e.preventDefault();
          let {name,email,password,username,mobilenumber} = Credential;
          let response = await fetch (`http://localhost:5000/api/auth/createuser`,{
              method : 'POST',
              headers : {
                  'Content-Type' : 'application/json'
              },
              body : JSON.stringify({name,email,password,username,mobilenumber})
            })
            let json = await response.json();
            console.log(json);
            if(json.Succes){
              // Save karo Auth-Token aor redirect kar do
              localStorage.setItem('auth-token', json.Authtoken);
              localStorage.setItem('userId', json._id); // Save the userId 
              console.log(json._id);
              navigate("/Verify");
              props.EditTheAlert("Succes","Succesfully You Are Logged In");
         }else{
           props.EditTheAlert("Error","Some Error Occured");
         }
      } catch (error) {
          console.log("There is an Error in API Data Fetching");
      }
  
  }

  const onChange = (e) => {
      ChangeCred({ ...Credential, [e.target.name]: e.target.value });
  };

  return (
    <div className='container my-3 bg-dark text-white p-2 rounded'>
      <h2 className="mb-4 text-center">Sign Up</h2>
    <div className='container'>
      <form onSubmit={handleSubmit}>
        
  <div className="mb-1">
    <label htmlFor="username" className="form-label">Username</label>
    <input type="text" className="form-control" id="username" name='username' onChange={onChange} aria-describedby="emailHelp"/>
  </div>

      <div className="mb-1">
    <label htmlFor="name" className="form-label">Your Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
  </div>

  <div className="mb-1">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' id="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-1">
    <label htmlFor="password" className="form-label">Mobile Number</label>
    <input type="number" className="form-control" name='mobilenumber' onChange={onChange} minLength={10} required id="mobilenumber"/>
  </div>

  <div className="mb-1">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' onChange={onChange} minLength={8} required id="password"/>
  </div>

 <div className="mb-1">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword' minLength={8} required id="cpassword"/>
  </div>
 
  <button type="submit" className="btn btn-primary my-2">Sing-Up</button>
</form>
    </div>
    </div>
  )
}

export default SignUp
