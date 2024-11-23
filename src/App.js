import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Navbar from './component/navbar';
import Mainpage from './component/mainpage';
import MainMoney from "./Context/mainMoney";
import Login from './component/login';
import SignUp from './component/signUp';
import Newpost from "./component/NewPost";
import Alert from "./component/alert";
import Profile from "./component/profile";
import MyPost from "./component/Mypost";
import VerifyUser from "./component/verifyUser";
function App() {
  const[alert,Setalert] = useState(null);
  const EditTheAlert = (status,msg) => {
    Setalert({
      status : status,
      msg : msg
    })
    setTimeout(()=>{
      Setalert(null);
    },1800);
  }
  return (
   <>
    <MainMoney >
      <Router>
      <Navbar/>
      <Alert   ale={alert}/>
      <div className="container">
        <Routes>
            <Route exact path="/" element={<Mainpage  EditTheAlert={EditTheAlert}/> }/>
            <Route  exact path="/login" element={<Login  EditTheAlert={EditTheAlert}/> }/>
            <Route  exact path="/SignUp" element={<SignUp  EditTheAlert={EditTheAlert}/> }/>
            <Route  exact path="/NewPost" element={<Newpost  EditTheAlert={EditTheAlert}/> }/>
            <Route  exact path="/Profile" element={<Profile  EditTheAlert={EditTheAlert}/> }/>
            <Route  exact path="/MyPost" element={<MyPost  EditTheAlert={EditTheAlert}/> }/>
            <Route exact path="/Verify" element={<VerifyUser EditTheAlert={EditTheAlert}/>}/>
        </Routes>
        </div>
      </Router>
      </MainMoney>
   </>
  );
}

export default App;
