const bcryptjs = require("bcryptjs");
const userModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/CreateError.js');
// const user = require("../models/user.js");

const register = async (req,res,next)=>{
    if(!req.body.name || !req.body.email || !req.body.password){
        return next(errorHandler({status: 400, message: 'name,email,password is required'}));
    }

    try{
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password,salt);

        const newUser = new userModel({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
        })
        await newUser.save().then(()=>console.log(newUser)).catch((err)=>{console.log(err)});
        // console.log(newUser);
        return res.status(201).json('New user created :)');
    }catch(err){
        console.log(err);
        console.log('error in register creation');
        
        return next(err);
    }
}


const login = async (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return next(errorHandler({status : 400, message:"Name, email is required"}));
    }
    try{
        const user = await userModel.findOne({
            email :req.body.email
        }).select('name email password');
        if(!user){
            return nexr(errorHandler({status : 400, message  : "No user found"}))
        }
        const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return next(errorHandler({status:400, message:"password is incorrect!"}));
        }
        const payload = {
            id : user._id,
            name : user.name
        }
        // console.log(payload);
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        // Set the JWT token as a cookie
        res.cookie('access_token', token, {
            httpOnly: true
        });

        return res.status(200).json({'message' : "login sucess",payload});
    }catch(err){
        next(err);
    }
}

const logout = (req,res) =>{
    res.clearCookie('access_token');
    return res.status(200).send("logged out");
}

const isLoggedIn = async(req,res)=>{
    const token = await req.cookies.access_token;
    console.log("cookie is served");
    if(!token){
        return res.json(false);
    }

    return jwt.verify(token , process.env.JWT_SECRET,(err)=>{
        if(err){
            return res.json(err);
        }
        return res.json(true);
    })
}

module.exports = {register,login,logout,isLoggedIn};