require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
connectDB();
const User = require("./src/models/user");
const Passenger = require("./src/models/passenger");
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
app.use(cors("*"));
app.post("/signup", async (req, res) => {
    try {
        const { username, age, gender,password,email } = req.body;
        console.log("password",password)
        if (!username || !age || !gender || !password || !email) {
           return res.status(400).json({ message: "All Fields are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, age, gender, email,password:hashedPassword })
        return res.status(201).json({
         message: 'Account created successfully',
         user: {
         username: user.username,
         age:user.age,
        
      }
    });
    }


    catch (err) {
        if(err.code === 11000){
          return  res.json({message:'username already registered'});
        }
        return res.status(500).json({ message: err.message });

    }

}
);

//Login
app.post("/login",async(req,res) => {
    try{
        const {username,password} = req.body;
        console.log("username",username);
        if(!username || !password){
           return res.status(400).json({message:"username and password are required"});

        }
        const user = await User.findOne({username})
        if(!user){
           return res.status(404).json({message:"Account not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           return res.status(401).json({message:"Invalid Login Credentials"});
        }
        return res.status(200).json({
        message: 'Login successful',
        user: {
            username: user.username,
            email: user.email
        }
    });

    }
    catch(err){
       return res.json({message:err.message})
    }
})

//passenger


app.post("/passenger", async (req, res) => {
    try {
        const {
            username,
            age,
            gender,
            seatPreference,
            mealPreference,
            idProof,
            idNumber,
            userId
        } = req.body;

        // validation
        if (!username || !age || !gender || !idProof || !idNumber || !userId) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const passenger = await Passenger.create({
            username,
            age,
            gender,
            seatPreference,
            mealPreference,
            idProof,
            idNumber,
            userId
        });

        return res.status(201).json({
            message: "Passenger created successfully",
            passenger
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});






app.listen(3000, () => {
    console.log("Server Started on port 3000");
})
