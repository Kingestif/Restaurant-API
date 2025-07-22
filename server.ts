require("dotenv").config();  
import app from './app';
import swaggerDocs from "./swagger";
import { config } from './config/config';
import { connectRedis } from './redis';

const PORT = Number(config.PORT );

async function startServer() {
    await connectRedis();

    swaggerDocs(app);

    app.listen(PORT, () => {
        console.log(`Server started running on port ${PORT}`);
    });
}

startServer();