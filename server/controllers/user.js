const User = require("../models/User");

const saveUser = async(req,res)=>{
    const {name,email,phone} = req.body;

    if(!name || !email || !phone){
        return res.status(400).json({message:"invalid data, must required name, email, phone"});
    }

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({message:"user email already exists"});
        }
        const newUser = new User({
            name,
            email,
            phone
        });

        await newUser.save();
        return res.status(201).json({message:"user saved successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }

}

module.exports = {
    saveUser
}