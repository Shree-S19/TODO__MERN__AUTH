import mongoose from "mongoose";

const{ Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    user : {
        type:Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    password : {
        type : String,
        required : true,
    }
},{ timestamps : true});

module.exports = mongoose.model('User',userSchema);