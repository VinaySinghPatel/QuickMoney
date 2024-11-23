import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ClipLoader } from 'react-spinners';

const Postcard = (props) => {
  const { post } = props;
  const [isLoading, setIsLoading] = useState(true);

  const postDate = new Date(post.fromDate);
  const day = postDate.getDate();
  const month = postDate.toLocaleString('default', { month: 'long' });
  const year = postDate.getFullYear();
  const hours = postDate.getHours().toString().padStart(2, '0');
  const minutes = postDate.getMinutes().toString().padStart(2, '0');
  const readableDate = `${day} ${month} ${year}, ${hours}:${minutes}`;

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="col-md-3">
      {isLoading && (
        <div
          className="loading-spinner d-flex justify-content-center align-items-center"
          style={{ height: '380px' }}
        >
          <ClipLoader color="#FFD700" size={50} />
        </div>
      )}
      <div
        className={`card my-3 bg-dark text-white ${isLoading ? 'd-none' : ''}`}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
          borderRadius: '1.2rem',
          transition: 'transform 0.3s, box-shadow 0.3s',
          overflow: 'hidden',
          maxHeight: '420px', 
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0px 10px 25px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.3)';
        }}
        data-aos="fade-up"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem',
            background: 'linear-gradient(to right, #1e1e2f, #FFD700)',
            borderRadius: '1.2rem 1.2rem 0 0',
          }}
        >
          <img
            src={'VinayPIC (2).jpg'}
            alt={`Vinay's profile`}
            style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              marginRight: '10px',
              objectFit: 'cover',
            }}
          />
          <span
            style={{
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
            }}
          >
            Vinay Singh Patel
          </span>
        </div>
        <div style={{ position: 'relative' }}>
          <img
            src="DoneWithThis.jpeg"
            style={{
              borderRadius: '0 0 1.2rem 1.2rem',
              height: '140px',
              width: '100%',
              objectFit: 'cover',
              filter: 'blur(4px)',
            }}
            className="card-img-top"
            alt="Indian Currency"
            onLoad={handleImageLoad}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#FFD700',
              fontSize: '2rem',
              fontWeight: 'bold',
              textShadow: '3px 3px 8px black',
            }}
          >
            ₹{post.money}
          </div>
        </div>

        <div className="card-body p-3">
          <p style={{ color: '#FFDDC1', fontSize: '0.9rem' }}>
            📞 {post.mobilenumber}
          </p>
          <h6
            className="card-title"
            style={{ color: '#FFFFFF', fontSize: '1rem' }}
          >
            {post.tittle}
          </h6>
          <p
            className="card-text"
            style={{
              color: '#EAEAEA',
              fontSize: '0.85rem',
              marginBottom: '0.5rem',
            }}
          >
            {post.description}
          </p>
        
          <p
            style={{
              fontSize: '0.85rem',
              color: '#FFD700',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}
          >
            📊 Loan Interest Rate: <span style={{ color: '#FFFFFF' }}>{post.loanRate}% per month</span>
          </p>
          <p
            className="card-time"
            style={{ fontSize: '0.75rem', color: '#AAAAAA' }}
          >
            {readableDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Postcard;
