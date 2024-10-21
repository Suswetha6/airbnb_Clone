const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "sdnwkfnwir";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true , 
  origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL)
 
app.get('/test',(req,res)=>{
  res.json('test ok');
});

app.post('/register',async (req,res)=>{
  const {name,email,password} = req.body ;
  try{
    const userDoc = await UserModel.create({
      name,
      email,
      password:bcrypt.hashSync(password,bcryptSalt),
    });
  
    res.json(userDoc);
  }catch(e){
    res.status(422).json(e);
  }
  
})

 app.post('/login',async(req,res)=>{
  const {email,password} = req.body;
  const userDoc =await UserModel.findOne({email});
  console.log(userDoc);
  if(userDoc){
    const passOk = bcrypt.compareSync(password,userDoc.password);
    if(passOk){
      jwt.sign({email:userDoc.email,id:userDoc._id,
      },jwtSecret,{},(err,token)=>{
        if(err) throw err ;
        res.cookie('token',token).json(userDoc)
      });
    }
    else{
      res.status(422).json('pass not ok');
    }
  }else{
    res.json('Not found') ;
  }
});

app.get('/profile',(req,res)=>{
  const{token} = req.cookies ;
  if(token){
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
      if(err) throw err ;
      const {name,email,_id} =await UserModel.findById(userData.id) ;
      res.json({name,email,_id});
     })
  }else{
    res.json(null);
  }
  
})
app.post('/logout',(req,res)=>{
  res.cookie('token','').json(true);
})
app.listen(4000);

