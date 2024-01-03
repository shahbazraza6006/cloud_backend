const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    StudentID : {
        type : String,
        required : true,
        unique : true,
        
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password:{
        type: String,
        required: true,
    },
    Dob : {
        type : String,
        required : true,
    }
    
    });
   
    module.exports = mongoose.model("User", userSchema);
