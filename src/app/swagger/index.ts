import config from "@app/config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition: any = {
    openapi: "3.0.0",
    info: {
        title: "API Rest IdbForm EDUTECT",
        description:
            "Esta API es documentada con Swagger, así se puede lograr un correcto y adecuado manejo a la misma.",
        contact: {
            name: "Juan",
            email: "juanescasa24@hotmail.com",
        },
        version: config.apiVersion,
    },
    servers: [
        {
            url: `http://localhost:5000/api/v1`,
            description: "Local serve",
        },
    ],
    components: {
        securitySchemes: {
            ApiKeyAuth: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
    },
    security: [
        {
            ApiKeyAuth: {
                type: "apiKey",
                name: "Authorization",
            },
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./docs/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
