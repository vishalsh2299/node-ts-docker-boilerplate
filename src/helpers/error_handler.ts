import { logger } from "../config/logger";
import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorData = error.stack
    ?.split("\n")
    ?.slice(1)
    ?.map((item: string) => {
      return item.slice(7).split(" ");
    })[0];

  if (errorData) {
    const module = errorData[0];

    logger.error(`${chalk.red("Error")} - ${error.message}
    \r ${chalk.yellow("Line")}: ${module}`);
  }

  res
    .send({
      success: false,
      message: `Something went wrong ${error}`,
    })
    .status(404);
};
