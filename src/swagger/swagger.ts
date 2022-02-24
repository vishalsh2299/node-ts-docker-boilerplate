export default {
  swaggerDefinition: {
    openapi: "3.0.2",
    info: {
      version: "v0",
      title: "Website APIs",
      description:
        "Website documentation to create a CRUD style API in NodeJs using TypeScript",
    },
    servers: [
      {
        url: "http://localhost:9000",
        description: "LOCAL 9000",
      },
    ],
    components: {
      securitySchemes: {
        BasicAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["**/*.ts", "./routes/**/*.ts", "./routes/**/*.js"],
};
