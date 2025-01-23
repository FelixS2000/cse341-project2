const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'CRUD API',
            version: '1.0.0',
            description: 'API for managing customers and magazines',
        },
        servers: [
            {
                url: 'https://cse341-project2-yezt.onrender.com/',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const swaggerUi = require('swagger-ui-express');

module.exports = { swaggerDocs, swaggerUi };
