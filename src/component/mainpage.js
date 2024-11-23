import React, { useEffect, useContext } from 'react';
import Postcard from './postcard';
import mainContext from '../Context/mainContext';

const Mainpage = (props) => {
  const context = useContext(mainContext);
  const { GetAllPost, Posts } = context;

  useEffect(() => {
    GetAllPost();
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #1e1e2f, #121214)',
        minHeight: '100vh',
        padding: '2rem 1rem',
        borderRadius: '15px'
      }}
    >
      <div className="container">
        <h1
          style={{
            color: '#FFD700',
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
            marginBottom: '1.5rem',
          }}
        >
          POSTS
        </h1>
        <div className="row my-4">
          <div
            className="container text-center text-muted"
            style={{
              color: '#AAAAAA',
              fontSize: '1.2rem',
              marginBottom: '1rem',
            }}
          >
            {Array.isArray(Posts) && Posts.length === 0 && 'No Records Here'}
          </div>
          {/* Map over Posts */}
          {Array.isArray(Posts) &&
            Posts.slice()
              .sort((a, b) => new Date(b.fromDate) - new Date(a.fromDate))
              .map((record) => (
                <Postcard
                  key={record.id}
                  EditTheAlert={props.EditTheAlert}
                  post={record}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
