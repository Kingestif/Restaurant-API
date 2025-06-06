const User = require('../models/users');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.signup = async(req,res)=>{
    
    try{
        const {email, password, role} = req.body;
        const newuser = await User.create({email, password, role});
        
        // ------------verificationToken
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
        newuser.verificationToken = hashedToken;
        
        await newuser.save();

        newuser.password = undefined;

        res.status(201).json({
            status: 'success',
            user: newuser
        });

    }catch(error){
        if (error.code === 11000) {
            return res.status(400).json({
                status: "error",
                message: `User with ${Object.keys(error.keyPattern)[0]} already exists`
            });
        }

        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

exports.login = async(req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                status: "error",
                message:"Please Provide email and password",
            });
        }

        const user = await User.findOne({email}).select('+password');

        if(!user || !await user.checkPassword(password, user.password)){
            return res.status(401).json({
                status: "error",
                message:"Incorrect email or password",
            });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        await user.save();

        res.status(200).json({
            status: "success",
            token: token,
            role: user.role
        });

    }catch(error){
        return res.status(401).json({
            status: "error",
            message:error.message || "Error trying to log in"
        });
    }
}