import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Leitura de Consumo de Água e Gás API",
      version: "1.0.0",
      description:
        "API para gerenciamento de leituras de consumo de água e gás",
    },
    servers: [
      {
        url: "http://localhost:3030",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/docs/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
