import { Response, Request, NextFunction } from "express";

class SchemaMiddleware {
  public static async handle(
    req: Request,
    res: Response,
    next: NextFunction,
    Validator: any
  ) {
    try {
      if (Validator) {
        await Validator.validateAsync(req.body);
      }
      return next();
    } catch (error: any) {
      return res.send({
        success: false,
        data: { message: error.details[0].message },
      });
    }
  }
}

export default SchemaMiddleware;
