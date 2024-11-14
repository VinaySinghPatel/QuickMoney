import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import mainContext from '../Context/mainContext';

const Mypost = (props) => {
    const context = useContext(mainContext);
    const navigate = useNavigate();
    const { GetPost, Posts, DeletePost, EditPost } = context;
    const [record, setRecord] = useState({ id: "", tittle: "", money: 0, description: "", mobilenumber: "" });
    const [isEditing, setIsEditing] = useState(false); 
  
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            GetPost();
        } else {
            navigate('/');
        }
        AOS.init({ duration: 4000 });
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const UpdateRecord = (post) => {
        ref.current.click();
        setRecord({
            id: post._id,
            tittle: post.tittle,
            money: post.money,
            description: post.description,
            mobilenumber: post.mobilenumber
        });
        setIsEditing(true);
    };

    const handleClick = () => {
        EditPost(record.id, record.tittle, record.money, record.description, record.mobilenumber);
        refClose.current.click();
        props.EditTheAlert("Success", "Record updated successfully");
        setIsEditing(false);
    };

    const onChange = (e) => {
        setRecord({ ...record, [e.target.name]: e.target.value });
    };

    return (
        <>  
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Post
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '10px' }}>
                        <div className="modal-header bg-primary text-white" style={{ borderRadius: '10px 10px 0 0' }}>
                            <h5 className="modal-title" id="exampleModalLabel">Edit Record</h5>
                            <button ref={refClose} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsEditing(false)}></button>
                        </div>
                        <div className="modal-body p-4">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="tittle" className="text-dark">Title</label>
                                    <input type="text" className="form-control border-2" id="tittle" name="tittle" value={record.tittle} onChange={onChange} placeholder="Enter title" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="money" className="text-dark">Money</label>
                                    <input type="number" className="form-control border-2" id="money" name="money" value={record.money} onChange={onChange} placeholder="Enter amount" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description" className="text-dark">Description</label>
                                    <textarea className="form-control border-2" id="description" name="description" value={record.description} onChange={onChange} rows="3" placeholder="Enter description"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="mobilenumber" className="text-dark">Mobile Number</label>
                                    <input type="number" className="form-control border-2" id="mobilenumber" name="mobilenumber" value={record.mobilenumber} onChange={onChange} placeholder="Enter mobile number" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer bg-light border-0">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsEditing(false)}>Close</button>
                            <button type="button" className="btn btn-success" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-4">
                <h1 className="text-primary">My-Posts</h1>
                <div className="container text-muted">
                    <div className="row">
                        {(!Array.isArray(Posts) || Posts.length === 0) && <p>No posts to display.</p>}
                        {Array.isArray(Posts) && Posts.map((post) => {
                            const postDate = new Date(post.fromDate);
                            const day = postDate.getDate();
                            const month = postDate.toLocaleString("default", { month: "long" });
                            const year = postDate.getFullYear();
                            const hours = postDate.getHours().toString().padStart(2, "0");
                            const minutes = postDate.getMinutes().toString().padStart(2, "0");
                            const readableDate = `${day} ${month} ${year}, ${hours}:${minutes}`;

                            return (
                                <div className="col-md-3" key={post._id} data-aos="fade-right">
                                    <div
                                        className="card my-3 bg-dark text-white"
                                        style={{
                                            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                                            borderRadius: "1.2rem",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            overflow: "hidden",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.05)";
                                            e.currentTarget.style.boxShadow = "0px 10px 25px rgba(0, 0, 0, 0.4)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                            e.currentTarget.style.boxShadow = "0px 6px 15px rgba(0, 0, 0, 0.3)";
                                        }}
                                    >
                                      
                                        <div style={{ display: "flex", alignItems: "center", padding: "0.5rem", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "1.2rem 1.2rem 0 0" }}>
                                            <img
                                                src={"VinayPIC (2).jpg"} 
                                                alt={`Vinay's profile`}
                                                style={{ width: "35px", height: "35px", borderRadius: "50%", marginRight: "10px", objectFit: "cover" }}
                                            />
                                            <span style={{ color: "#FFD700", fontSize: "0.9rem", fontWeight: "bold" }}>Vinay Singh Patel</span>
                                        </div>


                                        <div style={{ position: "relative" }}>
                                        <img
                                            style={{
                                                borderRadius: "0 0 1.2rem 1.2rem",
                                                height: "150px",
                                                objectFit: "cover",
                                                filter: "blur(4px)"
                                            }}
                                            src="DoneWithThis.jpeg"
                                            className="card-img-top"
                                            alt="Money" 
/>
                                            <div style={{
                                              position: "absolute",
                                              top: "50%",
                                              left: "50%",
                                              transform: "translate(-50%, -50%)",
                                              color: "#FFD700",
                                              fontSize: "2rem",
                                              fontWeight: "bold",
                                              textShadow: "3px 3px 8px black",
                                            }}
                                          >
                                            ₹{post.money}
                                          </div>
                                        </div>
                                        <div className="card-body">
                                            <p style={{ color: "#FFDDC1" }}>📞 {post.mobilenumber}</p>
                                            <h5 style={{ color: "#FFFFFF" }}>{post.tittle}</h5>
                                            <p style={{ color: "#EAEAEA" }}>{post.description}</p>
                                            <p style={{ color: "#EAEAEA" }}>{readableDate}</p>
                                            <div className="d-flex justify-content-between mt-3">
                                                <i
                                                    className="fa-solid fa-trash text-danger"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        DeletePost(post._id);
                                                        props.EditTheAlert("Delete", "Record deleted successfully");
                                                    }}
                                                ></i>
                                                <i
                                                    className="fa-solid fa-pen-to-square text-primary"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => { UpdateRecord(post); }}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mypost;
