const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env" + `.${process.env.NODE_ENV}`),
});

import express from "express";
import cors from "cors";
import { logger } from "./config/logger";
import morganLogger from "./config/morgan";
import routes from "./routes";
import { notFoundHandler } from "./helpers/notfound_handler";
import db from "./db";
import swaggerJsdoc from "swagger-jsdoc";
import options from "./swagger/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();

async function main() {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "1.5MB" }));

  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );

  app.use(morganLogger);

  await db.runMigrations();

  /// Swagger setup
  try {
    const openapiSpecification = swaggerJsdoc(options);
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
  } catch (e) {
    logger.error(`main(): Swagger error: ${e}`);
  }

  app.use("/", routes);
  app.use("*", notFoundHandler);

  const port = process.env.PORT || 9000;

  app.listen(port, () => {
    logger.info(`Website API Server is running`, ["Server"]);

    console.log(
      "\x1b[33m%s\x1b[0m",
      `Server :: Running @ 'http://localhost:${port}'`
    );
  });
}

main();
export default app;
