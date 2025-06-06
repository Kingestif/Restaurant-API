const User = require('../models/users');

exports.viewAllUsers = async(req, res) => {
    try{
        const user = await User.find();

        return res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: user
        });
    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch users"
        });
    }
}

exports.viewUserProfile = async(req, res) => {
    try{
        const user = await User.findById(req.params.id);

        return res.status(200).json({
            status: "success",
            message: "Users profile fetched successfully",
            data: user
        });
    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch the user"
        });
        
    }
}


exports.updateUserRole = async(req, res) => {
    try{
        const updateData = req.body;
        
        const user = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        return res.status(200).json({
            status: "success",
            message: "Users profile updated successfully",
            data: user
        });

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "Failed to update user"
        });
        
    }
}


exports.deleteUser = async(req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        return res.status(204).json();

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch the user",
            error: error.message
        });
    }
}