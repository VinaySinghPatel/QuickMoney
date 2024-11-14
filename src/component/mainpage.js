import React, { useState, useContext, useEffect } from 'react';
import Postcard from './postcard';
import mainContext from '../Context/mainContext';

const Mainpage = (props) => {
  const context = useContext(mainContext);
  const { GetAllPost, Posts } = context;

  useEffect(() => {
    GetAllPost();
  }, []);

  return (
    <>
      <div className="row my-4">
        <h1 className="text-primary">POSTS</h1>
        <div className="container text-muted">
          {Array.isArray(Posts) && Posts.length === 0 && 'No Records Here'}
        </div>
        
        {/* Map over Posts after sorting by date */}
        {Array.isArray(Posts) && 
          Posts
            .slice() // Copy array to avoid mutating original
            .sort(
              (a, b) => new Date(b.fromDate) - new Date(a.fromDate)) //  Decending order thats why we are doing b - a here
              // new Date in function and b.fromDate and a.fromdate is b and a 
            .map((record) => (
              <Postcard
                key={record.id} // Unique key for each post
                EditTheAlert={props.EditTheAlert} // Pass alert function
                post={record} // Pass each post's data
              />
          ))
        }
      </div>
    </>
  );
};

export default Mainpage;
