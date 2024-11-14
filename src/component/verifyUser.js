import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyUser = (props) => {
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [credential, setCredential] = useState({ email: "" });
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  let Loading = false;
  if(Loading === true){
    <h1>Loading...........</h1>
  }else{
    
  }
  

  const handleSendOtp = async (e) => {
     Loading = true;
   
    e.preventDefault();
    try {
      let response = await fetch('https://quickmoney-backend.onrender.com/api/otp/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credential.email })
      });
      let json = await response.json();
      console.log(json);
      if (json.Succes) {
        Loading = true;
        props.EditTheAlert("Success", "OTP sent to your email.");
        Loading = false;
        setShowOtpSection(true); 
      } else {
        props.EditTheAlert("Error", "OTP was not sent. Please try again.");
      }
    } catch (error) {
      console.log("Error in API request:", error);
    }
  };

 
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch('https://quickmoney-backend.onrender.com/api/otp/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credential.email, otp })
      });
      let json = await response.json();
      console.log(json);
      if (json.Succes) {
        localStorage.setItem('token', json.authToken);
        navigate('/');
        props.EditTheAlert("Success", "OTP verified successfully.");
      } else {
        props.EditTheAlert("Error", "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log("Error verifying OTP:", error);
    }
  };

  
  const handleChange = (e) => {
    let { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">
                {showOtpSection ? 'Verify Your Email' : 'Send OTP'}
              </h4>

           
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={credential.email}
                  onChange={handleChange}
                  required
                />
              </div>

    
              {showOtpSection ? (
                <>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      name="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    type="button"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </button>
                </>
              ) : (
                
                <button
                  className="btn btn-primary w-100"
                  type="button"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
