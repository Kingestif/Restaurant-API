require("dotenv").config();  
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('mongoose connected');

    const port = process.env.PORT;
    app.listen(port, ()=>{
        console.log(`Server started running on port ${port}`);
    });
}).catch((err)=>{
    console.log('Database connection error', err);
});