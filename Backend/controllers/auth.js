const bcryptjs = require("bcryptjs");
const userModel = require('../models/user.js');
const OAuthModel = require("../models/Oauth.js");

const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/CreateError.js');
const dotenv = require('dotenv');

// const otpGenerator = require('otp-generator');
// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// dotenv.config();
// const user = require("../models/user.js");
const OAuthRegister = async(req,res,next)=>{
    console.log("OAuth req received...")
    if(!req.body.name || !req.body.email){
        return next(errorHandler({status: 400, message: 'Try again...'}));
    }
     try{
        const newUser = new OAuthModel({
            name : req.body.name,
            email : req.body.email,
        })
            await newUser.save().then(()=>console.log(newUser + "sucessfully created")).catch((err)=>{console.log(err)});
            console.log("New User Created!!");
            return res.status(201).json('New user created :)');
        }catch(err){
                console.log(err);
                console.log('error in register creation');
                return next(err);
        }
    try{
        const user = await OAuthModel.findOne({
            email :req.body.email
        }).select('name email');
        if(!user){
            return nexr(errorHandler({status : 400, message  : "No user found"}))
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
const register = async (req,res,next)=>{
    if(!req.body.name || !req.body.email || !req.body.password){
        return next(errorHandler({status: 400, message: 'name,email,password is required'}));
    }
    // const API_KEY = process.env.mailgunAPIkey;
    // const DOMAIN = process.env.mailgunDomain;
    try{
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password,salt);

        const newUser = new userModel({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
        })

        // const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});//OTP genrator

        // const mailgun = new Mailgun(formData);
        // let mg = mailgun.client({username: 'api', key: API_KEY});

        // mg.messages.create(DOMAIN, {
        //     from: "Shree <shreebalajisiva19@gmail.com>",
        //     to: req.body.email,
        //     subject: "Hello",
        //     text: otp,
        // })
        // .then(msg => console.log(msg+ "OTP sent successfully!")) // logs response data
        // .catch(err => console.log(err)); // logs any error

        await newUser.save().then(()=>console.log(newUser + "sucessfully created")).catch((err)=>{console.log(err)});
        console.log("New User Created!!");
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

module.exports = {register,login,logout,isLoggedIn,OAuthRegister};