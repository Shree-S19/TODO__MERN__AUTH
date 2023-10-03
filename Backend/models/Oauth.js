const mongoose = require("mongoose");

const { Schema } = mongoose;

const OAuthSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
},{ timestamps : true});

module.exports = mongoose.model('Oauth',OAuthSchema);