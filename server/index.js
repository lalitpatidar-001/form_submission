const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

// router imports
const userRouter = require("./routers/user");

// middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],      
  }))
app.use(express.json());

// routes
app.use("/api/v1/user",userRouter);

if(!process.env.DB_URL || process.env.DB_URL.length === 0  )
    throw new Error("Database URL not found");
mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("DB Connected successfully"))
    .catch(error=>console.log(error,"DB Error"));

if(!process.env.PORT || process.env.PORT.length === 0  )
    throw new Error("PORT number not found");
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});