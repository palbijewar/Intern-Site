const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const route = require('./routes/route');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.mongoose,{
useNewUrlParser:true
}).then(()=>{console.log('Mongoose connected!')}).catch((error)=>console.log(error));

app.get('/',(req,res)=>{
    res.status(200).json({status : true, message : "API is Live"})
  })

app.use('/',route);

app.listen(process.env.PORT, ()=>{
    console.log(`server is runing on PORT : ${process.env.PORT}`)
});

