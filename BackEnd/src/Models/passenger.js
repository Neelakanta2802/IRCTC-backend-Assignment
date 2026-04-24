const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Define Schema from the mongoose object
const passengerSchema = new mongoose.Schema (
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
            min:1,
            max: 120
        },
        gender : {
            type : String,
            required : [ true, 'Gender is required'],
            enum: ['male', 'female', 'other'],

        },
        seatPreference : {
            type : String,
            
        enum: ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper', 'No Preference'],
        default: 'No Preference'

        },
        mealPreference : {
            type : String,
            enum: ['veg', 'non-veg', 'No Meal'],
            default: 'No Meal'

        },
        idProof : {
            type : String,
            required : [ true, 'idProof is required'],
            enum : ['Aadhaar','PAN','Passport','VoterID','Driving Licence'],


        },
        idNumber : {
            type : String,
            required : [ true, 'Id number is required'],
           
        },
        userId : {
             type : Schema.Types.ObjectId,
             ref: 'User', // Refers to the User model
             required: true // Ensures it is required [1]

        }
    }
)

const passenger = mongoose.model('Passenger', passengerSchema);
module.export = passenger;
