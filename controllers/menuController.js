const Menu = require('../models/menu');

exports.getMenu = async(req, res) => {
    try{
        const menu = await Menu.find();
        return res.status(200).json({
            status: "success",
            message: "Successfuly fetched all menus",
            data: menu || []
        });

    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to fetch menus",
            error: error.message
        });
    }
}

exports.postMenu = async(req, res) => {
    try{
        const {name, description, price, category, available} = req.body;
        if (!name || price == null) {
            return res.status(400).json({
                status: "fail",
                message: "Name and price are required fields"
            });
        }

        const newMenu = await Menu.create({name, description, price, category, available});

        
        return res.status(201).json({
            status: "success",
            message: "Successfuly created new menu",
            menu: newMenu
        });

    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create menu",
            error: error.message
        });
    }
}

exports.editMenu = async(req, res) => {
    try{
        const updateData = req.body;

        const menu = await Menu.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        return res.status(200).json({
            status: "success",
            message: "Menu updated successfully",
            data: menu
        });

    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to update menu",
            error: error.message
        });
    }
}

exports.deleteMenu = async(req, res) => {
    try{
        await Menu.findByIdAndDelete(req.params.id);
        return res.status(204).json();
        
    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "Failed to delete Menu",
            error: error.message
        });
    }
}