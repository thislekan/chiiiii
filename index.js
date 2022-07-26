require("core-js/stable");
require("regenerator-runtime/runtime");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const routes = require("./server/routes");
// const swaggerDocument = require("./swagger.json");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for chimoney assessment",
    version: "1.0.0",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "thislekan",
      url: "https://www.linkedin.com/in/ibrahim-omoniyi/",
    },
  },
  servers: [
    {
      url: "http://localhost:8085/api/v1",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // definition: {
  //   openapi: "3.0.0",
  //   info: {
  //     title: "Hello World",
  //     version: "1.0.0",
  //   },
  // },
  apis: ["./server/routes/*.js"], // Path to the API docs
};

const openapiSpecification = swaggerJsdoc(options);
const app = express();

app.use(express.json());
app.use("/api/v1/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.listen(8085, () => console.log("Server started"));

module.exports = app;
