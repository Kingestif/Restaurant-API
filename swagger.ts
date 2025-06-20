import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {Express} from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Restaurant API",
            version: "1.0.0",
            description: "API documentation for Restaurant project",
        },

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",  
                },
            },
        },

        security: [
            {
                bearerAuth: [],  
            },
        ],

        servers: [
            {
                url: "https://restaurant-api-27es.onrender.com",  
                description: "Deployed Server",
            },
        ],
    },
    apis: ["./routes/*.js"], 
}; 

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger Docs available at https://restaurant-api-27es.onrender.com/api-docs");
};

export default swaggerDocs; 
