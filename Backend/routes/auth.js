const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
let jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let jwt_token = "VinaySinghPatel"
const fecthUser = require('../middleware/FetchUser');
const jwt_secret = "ThisIsAnSecret";  

router.post('/createuser',[
  body('email').isEmail().withMessage('Not a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('name').notEmpty().withMessage('Name must be at least 2 characters long'),
  body('username').notEmpty().withMessage('Username must be at least 3 characters long'),
  body('mobilenumber').isLength({ min: 10 }).withMessage('Mobile Number must be 10 character')
  
], async (req,res) => {
    let Succes = false;
    // Yaha per ham validationResult ki mdad se erro pata laga rahe hai req kar ke
    try { 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ Succes, errors: errors.array() });
      }

        let user = await User.findOne({Email : req.body.email});
        if(user){
            return res.status(401).json({Succes,error : "Ye Gmail Pehle Se Registered hai"});
        }


        var salt = await bcrypt.genSaltSync(10);
      var SaltPass = await bcrypt.hashSync(req.body.password, salt);


      // Yaha per ham Body me Requiest kar ke User ka data mongoose ke jariye store kar rahe hai
      user = await User.create({
        name : req.body.name,
        username : req.body.username,
        password : SaltPass,
        email : req.body.email,
        mobilenumber : req.body.mobilenumber
      })


      
        // yaha per ham User ki id nikal kar use jwt ke jariye Auhttoken Return kar rahe hai
      let UserId  = {
        user : {
            id : user.id
        }
      }
      let AuthToken = jwt.sign(UserId,jwt_token);
      Succes = true;
       res.json({Succes,AuthToken});
        
    } catch (error) {
      console.error(error.message);
        return res.status(400).json({error : "There is an error there Are"});
    }
})


router.post('/Login',[
  body('email').isEmail().withMessage('Not a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
],async (req,res)=>{


    let Succes = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ Succes, errors: errors.array() });
  }

  const {email,password} = req.body;

  try {
  const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({Succes,error : "Ye Gmail galat hai"});
    }

  const PassCompare = await bcrypt.compare(password,user.password);
  if(!PassCompare){
    return res.status(401).json({error:"The Pass is Not Correct"});
  }

  const UserId = {
   user :  {
    id : user.id
  }}

    // Yaha per sign kr rahe kyu ham crediatial se login kar rahe hai 
  const Authtoken = await jwt.sign(UserId,jwt_token);
  Succes = true;
  res.json({Succes : "Succesfully Login",Authtoken})
} catch (error) {
  console.error(error.message);
  console.log("There is an error in Email Pass Login ");
}
 
})

router.post('/getuser', fecthUser, async (req, res) => {
  try {
    let userId = req.body._id;
    let user = await User.findOne({ _id: userId }).select('-password');
    res.json({ user });
  } catch (error) {
    console.error("Error in fetching user: ", error.message);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;