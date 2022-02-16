import morgan, { StreamOptions } from "morgan";
import { logger } from "./logger";

const chalk = require("chalk");

/// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  /// Use the http severity
  write: (message) => logger.http(message),
};

/// Skip logs in production except for warning and error ones
/// All logs will be visible on docker and development env
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "production";
};

const color = (status: any): any => {
  return status === undefined
    ? chalk.white
    : status >= 500
    ? chalk.red
    : status >= 400
    ? chalk.yellow
    : status >= 300
    ? chalk.cyan
    : status >= 200
    ? chalk.green
    : chalk.white;
};

const morganLogger = morgan(
  function (tokens, req, res) {
    return [
      "\n\n",
      chalk.white(tokens.date(req, res)),
      color(res.statusCode).bold(tokens.method(req, res)),
      color(res.statusCode).bold(tokens.status(req, res)),
      color(res.statusCode).bold(tokens.url(req, res)),
      chalk.blue(tokens["response-time"](req, res) + " ms"),

      "\n\n",
    ].join(" ");
  },
  { stream, skip }
);

export default morganLogger;
