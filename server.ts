import app from './app';
import mongoose from 'mongoose';
import swaggerDocs from "./swagger";
import { config } from './config/config';
import { connectRedis } from './redis';

const DATABASE = config.MONGO_URI;
const PORT = Number(config.PORT);
const DB_TYPE = config.DB_TYPE;

if (!DATABASE) {
  throw new Error('DATABASE environment variable is not set');
}

async function startServer() {
  await connectRedis();

  if(DB_TYPE === "mongo") {
    mongoose.connect(DATABASE).then(() => {
    console.log('mongoose connected');

    swaggerDocs(app);

    app.listen(PORT, () => {
        console.log(`Server started running on port ${PORT}`);
    });

    }).catch((err) => {
        console.log('Database connection error', err);
    });

  } else if (DB_TYPE === "prisma") {
    swaggerDocs(app);
    
    app.listen(PORT, () => {
      console.log(`Server started running on port ${PORT}`);
    });
  }
}

startServer();