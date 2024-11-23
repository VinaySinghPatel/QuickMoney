import React, { useState, useContext } from "react";
import mainContext from "../Context/mainContext";

const NewPost = (props) => {
  const context = useContext(mainContext);
  const { AddPost } = context;

  const [Post, SetPost] = useState({
    tittle: "",
    money: "",
    description: "",
    mobilenumber: "",
  });

  const handleclick = (e) => {
    e.preventDefault();
    AddPost(Post.tittle, Post.money, Post.description, Post.mobilenumber);
    SetPost({ tittle: "", money: "", description: "", mobilenumber: "" });
    props.EditTheAlert("Success", "Successfully Added");
  };

  const onChange = (e) => {
    SetPost({ ...Post, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container my-5 p-5 rounded"
      style={{
        background: "linear-gradient(to bottom, #111827, #1f2937)",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
        color: "#ffffff",
      }}
    >
      <h2
        className="mb-4 text-center"
        style={{
          color: "#FFD700",
          fontWeight: "bold",
          letterSpacing: "1.5px",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
        }}
      >
        Create a New Post
      </h2>
      <form className="row g-4 needs-validation" noValidate>
     
        <div className="col-12">
          <label
            htmlFor="tittle"
            style={{
              color: "#FFD700",
              fontWeight: "bold",
              fontSize: "0.9rem",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            name="tittle"
            id="tittle"
            onChange={onChange}
            value={Post.tittle}
            placeholder="Enter Title"
            style={{
              backgroundColor: "#1f2937",
              color: "#FFFFFF",
              border: "2px solid #FFD700",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "1rem",
            }}
            required
          />
        </div>

        <div className="col-12">
          <label
            htmlFor="money"
            style={{
              color: "#FFD700",
              fontWeight: "bold",
              fontSize: "0.9rem",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Loan Amount (₹)
          </label>
          <input
            type="number"
            className="form-control"
            name="money"
            id="money"
            onChange={onChange}
            value={Post.money}
            placeholder="Enter Loan Amount (₹)"
            style={{
              backgroundColor: "#1f2937",
              color: "#FFFFFF",
              border: "2px solid #FFD700",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "1rem",
            }}
            required
          />
        </div>

        <div className="col-12">
          <label
            htmlFor="description"
            style={{
              color: "#FFD700",
              fontWeight: "bold",
              fontSize: "0.9rem",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Loan Interest Rate
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            onChange={onChange}
            value={Post.description}
            placeholder="Enter Loan Interest Rate (e.g., 5% per month)"
            rows="3"
            style={{
              backgroundColor: "#1f2937",
              color: "#FFFFFF",
              border: "2px solid #FFD700",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "1rem",
            }}
            required
          />
        </div>

        <div className="col-12">
          <label
            htmlFor="mobilenumber"
            style={{
              color: "#FFD700",
              fontWeight: "bold",
              fontSize: "0.9rem",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Mobile Number
          </label>
          <input
            type="tel"
            className="form-control"
            name="mobilenumber"
            id="mobilenumber"
            onChange={onChange}
            value={Post.mobilenumber}
            placeholder="Enter Mobile Number"
            style={{
              backgroundColor: "#1f2937",
              color: "#FFFFFF",
              border: "2px solid #FFD700",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "1rem",
            }}
            required
          />
        </div>

        <div className="col-12">
          <button
            className="btn btn-warning w-100"
            onClick={handleclick}
            style={{
              backgroundColor: "#FFD700",
              color: "#1f2937",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0px 6px 15px rgba(255, 215, 0, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0px 4px 10px rgba(255, 215, 0, 0.3)";
            }}
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
