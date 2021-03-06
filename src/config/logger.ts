import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "white",
};

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.splat(),
  winston.format.simple(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console({
    level: process.env.LOG_LEVEL || "debug",
    format: format,
  }),
  new winston.transports.File({
    dirname: "logs",
    filename: "project_log.log",
    maxFiles: 5,
    maxsize: 20971520, // 20 MB
    zippedArchive: true,
  }),
];

winston.addColors(colors);

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export { logger };
