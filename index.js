const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const allRoutes = require ("./routes/index.js");

app.use(cors());
app.use(morgan('tiny'));6
app.use(express.json());
app.use(cookieParser());

const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/task_management_record");
        console.log("db connected")
    }catch(err){
        console.log(err);
    }
}

app.use('/api',allRoutes);


const PORT = 3000 || process.env.PORT;

app.listen(PORT,()=>console.log("server is running"));