require("dotenv").config();  
import app from './app';
import mongoose from 'mongoose';
import swaggerDocs from "./swagger";

const DATABASE = process.env.DATABASE;
const PORT:number = Number(process.env.PORT );

if(!DATABASE) {
  throw new Error('DATABASE environment variable is not set');
}

mongoose.connect(DATABASE).then(()=>{
    console.log('mongoose connected');

    swaggerDocs(app);

    app.listen(PORT, ()=>{
        console.log(`Server started running on port ${PORT}`);
    });
}).catch((err)=>{
    console.log('Database connection error', err);
});