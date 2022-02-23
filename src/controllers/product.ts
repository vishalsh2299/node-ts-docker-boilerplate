import db from "../db";
import { Request, Response } from "express";
import { Helper } from "../helpers/helper";
import { ProductService } from "../services/product_service";
import { ResponseWrapper } from "../helpers/response_wrapper";

export class ProductController {
  public static async getAll(req: Request, res: Response) {
    const user = Helper.defaultUser(); //req.cUser ? req.cUser : Helper.defaultUser()

    const productService: ProductService = new ProductService(user);
    const response: ResponseWrapper = new ResponseWrapper(res);

    const { id_last, limit } = req.query;

    const idLast = id_last ? parseInt(id_last as string) : undefined;
    const intLimit = limit ? parseInt(limit as string) : undefined;

    return response.ok(await productService.getAllProducts(idLast, intLimit));
  }
}
