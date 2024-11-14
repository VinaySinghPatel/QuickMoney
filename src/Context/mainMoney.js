import  { useState } from "react";
import MainContext from "./mainContext";

const MainMoney = (props) => {
     const initialpost = [];
     const [Posts,Setpost] = useState(initialpost);
    //  let token = "";

     const GetPost = async () => {
            let Token = localStorage.getItem('auth-token');
            if(!Token){
                console.log("The Token Are not Found in the Storage");
            }
            try {
                const response = await fetch('http://localhost:5000/api/post/getallpost',{
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'auth-token': Token,  
                    },
                })
                let Json = await response.json();
                Setpost(Json);
            } catch (error) {
           
                console.log(error);
            }
     };


     const GetAllPost = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/post/getalldbpost',{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
            }
            )
                let Json = await response.json();
                Setpost(Json);
            
        } catch (error) {
            console.log("There is error Occured Herer",error);
        }
     }

     
     const AddPost = async (tittle,money,description,mobilenumber) => {
        let Token = localStorage.getItem('auth-token');
        if(!Token){
            console.log("Token Are Not Exist While AddPost");
        }
        try {
            let response = await fetch('http://localhost:5000/api/post/createpost',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'auth-token' : Token,
                },
                body : JSON.stringify({tittle,money,description,mobilenumber})
            })
            let post = await response.json();
            Setpost(Posts.concat(post));
            
        } catch (error) {
            console.log("There is an error in AddPost API",error);
        }
     }


     const EditPost = async (id,tittle,money,description,mobilenumber) => {
        let Token = localStorage.getItem('auth-token');
        if(!Token){
            console.log("Token Are Not Exist While AddPost");
        }
        try {
            await fetch(`http://localhost:5000/api/post/updatepost/${id}`,{
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                    'auth-token' : Token,
                },
                body : JSON.stringify({tittle,money,description,mobilenumber})
            })  
            let NewEditPost = JSON.parse(JSON.stringify(Posts));
                for(let i =0; i<NewEditPost.length; i++){
                    if(NewEditPost[i]._id === id){
                        NewEditPost[i].tittle = tittle;
                        NewEditPost[i].money = money;
                        NewEditPost[i].description = description;
                        NewEditPost[i].mobilenumber = mobilenumber;
                        break;
                        }
                }
                Setpost(NewEditPost);
     }catch{
        console.log("There is an Error there are");
     }
    };


        const DeletePost = async (_id) => {
            let Token = localStorage.getItem('auth-token');
            if(!Token){
                console.log("Token Are Not Exist While AddPost");
            }
            try {
                await fetch(`http://localhost:5000/api/post/deletepost/${_id}`,{
                    method : 'DELETE',
                    headers : {
                        'Content-Type' : 'application/json',
                        'auth-token' : Token,
                    }
                })
                const NewPost = Posts.filter((post)=>post._id !== _id);
                Setpost(NewPost);  
            } catch (error) {
                console.log("There is an Error occured");
            }
        }


    return(
        <MainContext.Provider value={{Posts,GetAllPost,DeletePost,EditPost,AddPost,GetPost}}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainMoney;