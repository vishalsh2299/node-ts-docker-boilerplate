import express from "express";
import cors from "cors";
import { logger } from "./config/logger";
import morganLogger from "./config/morgan";
import routes from "./routes";
import { notFoundHandler } from "./helpers/notfound_handler";

const app = express();

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

app.use("/", routes);
app.use("*", notFoundHandler);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  logger.info(`Website API Server is running`, ["Server"]);
  console.log(`Listening to port ${port}`);
});
