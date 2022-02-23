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

  app.use("/", routes);
  app.use("*", notFoundHandler);

  const port = process.env.PORT || 9000;

  app.listen(port, () => {
    logger.info(`Website API Server is running`, ["Server"]);
    console.log(`Listening to port ${port}`);
  });
}

main();
export default app;
