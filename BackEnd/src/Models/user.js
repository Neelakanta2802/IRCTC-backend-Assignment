const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Define Schema from the mongoose object
const userSchema = new mongoose.Schema (
    {
        username : {
            type : String,
            required : [ true, 'Username is required'],
            unique : true,
            trim : true,
            minlength : [4,'Minimum 4 Characters']
        },
        age : {
            type : Number,
            required : [ true, 'Age is required'],
            minlength : [1,'Minimum age is 1'],
            maxlength : [120,'Maximum age is 120']
        },
        gender : {
            type : String,
            required : [ true, 'Gender is required'],
            enum: ['male', 'female', 'other'],

        },
       
        password : {
            type : String,
            required : [ true, 'password is required'],


        },
        email : {
            type : String,
            required : [ true, 'email is required'],


        }
    }
)

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
