import React from 'react';
import mainContext from '../Context/mainContext';
import { useContext, useState } from 'react';

const NewPost = (props) => {
  const context = useContext(mainContext);
  const { AddPost } = context;

  const [Post, SetPost] = useState({
    tittle: "",
    money: "",
    description: "",
    mobilenumber: ""
  });

  const handleclick = (e) => {
    e.preventDefault(); 
    AddPost(Post.tittle, Post.money, Post.description, Post.mobilenumber);
    SetPost({ tittle: "", money: "", description: "", mobilenumber: "" });
    props.EditTheAlert("Succes","Succesfully Added")
    console.log(Post.tittle, Post.money, Post.description, Post.mobilenumber);
  };

  const onChange = (e) => {
    SetPost({ ...Post, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='container my-5 bg-dark text-white p-5 rounded'>
        <h2 className="mb-4 text-center">Create a New Post</h2>
        <form className="row g-4 needs-validation" noValidate>

          <div className="col-12">
            <input
              type="text"
              className="form-control"
              name="tittle"
              id="tittle"
              onChange={onChange}
              value={Post.tittle}
              placeholder="Enter Title"
              required
            />
          </div>

          <div className="col-12">
            <input
              type="number"
              className="form-control"
              name="money"
              id="money"
              onChange={onChange}
              value={Post.money}
              placeholder="Enter Amount less than 9000"
              required
            />
          </div>

          <div className="col-12">
            <textarea
              className="form-control"
              name="description"
              id="description"
              onChange={onChange}
              value={Post.description}
              placeholder="Enter Description"
              rows="3"
              required
            />
          </div>

          <div className="col-12">
            <input
              type="tel"
              className="form-control"
              name="mobilenumber"
              id="mobilenumber"
              onChange={onChange}
              value={Post.mobilenumber}
              placeholder="Enter Mobile Number"
              required
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary w-100" onClick={handleclick}>
              Public Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPost;
