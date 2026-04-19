require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");
connectDB();
const user = require("./models/user")

const app = express();

app.use(express.json());
app.use(cors());
app.listen(3000,() => {
    console.log("Server Started");
})
