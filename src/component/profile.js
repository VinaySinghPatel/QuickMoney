import React, { useState, useEffect } from 'react';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const fetchUserData = async () => {
    let token = localStorage.getItem('auth-token');
    try {
      let response = await fetch('http://localhost:5000/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        }
      });

      // Check if the response is ok (status code in the range 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let data = await response.json(); 
      setUser(data.user); 
    } catch (error) {
      console.error('Error fetching user data', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }
  const postDate = new Date(user.fromDate);
  const day = postDate.getDate();
  const month = postDate.toLocaleString('default', { month: 'long' });
  const year = postDate.getFullYear();
  const hours = postDate.getHours().toString().padStart(2, '0'); 
  const minutes = postDate.getMinutes().toString().padStart(2, '0');
  const readableDate = `${day} ${month} ${year}, ${hours}:${minutes}`;

  return (
    <>
      <section className="">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".7rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem"
                    }}
                  >
                    <img
                      src="image.jpg"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px", borderRadius: "2rem" }}
                    />
                    <h5>{user.name || 'User Name'}</h5>
                    <h6>{user.username}</h6>
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{user.email || 'Email not available'}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>User ID</h6>
                          <p className="text-muted">{user._id || 'ID not available'}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Mobile Number</h6>
                          <p className="text-muted">{user.mobilenumber || '8770686758'}</p>
                        </div>
                      </div>
                      <h6>Other Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>From Date</h6>
                          <p className="text-muted">{readableDate|| 'Not available'}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start">
                        <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                        <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                        <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
