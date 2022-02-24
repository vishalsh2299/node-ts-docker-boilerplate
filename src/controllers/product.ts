import { Request, Response } from "express";
import { Helper } from "../helpers/helper";
import { ProductService } from "../services/product_service";
import { ResponseWrapper } from "../helpers/response_wrapper";
import Product from "../models/product";

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

  public static async getProductById(req: Request, res: Response) {
    const objSysAdmin = Helper.defaultUser(); //req.cUser ? req.cUser : Helper.defaultUser()

    const productService: ProductService = new ProductService(objSysAdmin);
    const response: ResponseWrapper = new ResponseWrapper(res);

    const { id } = req.params;

    return response.ok(
      await productService.getProductById(parseInt(id as string))
    );
  }

  public static async addProduct(req: Request, res: Response) {
    const objSysAdmin = Helper.defaultUser(); //req.cUser ? req.cUser : Helper.defaultUser()
    const product = new Product(req.body);

    const productService: ProductService = new ProductService(objSysAdmin);
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.created(await productService.addProduct(product));
  }

  public static async deleteProduct(req: Request, res: Response) {
    const objSysAdmin = Helper.defaultUser(); //req.cUser ? req.cUser : Helper.defaultUser()
    const { id } = req.params;

    const productService: ProductService = new ProductService(objSysAdmin);
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.ok(
      await productService.deleteProduct(parseInt(id as string))
    );
  }

  public static async updateProduct(req: Request, res: Response) {
    const objSysAdmin = Helper.defaultUser(); //req.cUser ? req.cUser : Helper.defaultUser()

    const productService = new ProductService(objSysAdmin);
    const response: ResponseWrapper = new ResponseWrapper(res);

    const { id } = req.params;
    const product = new Product(req.body);

    return response.ok(
      await productService.updateProduct(parseInt(id as string), product)
    );
  }
}
