const User = require("../models/user.js");


const getUserInfo = async (req,res,next) =>{
    try{
        const data = await User.findById(req.user.id).select('name email tasks');
        return res.status(200).json(data);
    }catch(err){
        return next(err);    
    }
}

const updateUser = async(req,res,next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name : req.body.name,
            email : req.body.email
        }, {
            new : true
        }).select('name eamil');
        return res.status(200).json(updatedUser);
    }catch(err){
        return next(err);
    }
}

module.exports = {getUserInfo,updateUser};