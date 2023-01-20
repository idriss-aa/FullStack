const { Express, Request , Response } = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('./package.json');


const options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:'REST API Docs',
            version
        },
        componenets:{
            securitySchemas:{
                bearerAuth:{
                    type:'http',
                    scheme: 'bearer',
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ['./Routes/*.js','./models/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Docs in JSON format
    app.get('docs.json',  (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

module.exports = {
    swaggerDocs
}
