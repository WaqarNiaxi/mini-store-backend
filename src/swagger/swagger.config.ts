import swaggerJSDoc, { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mini Store API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/modules/**/*.swagger.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
