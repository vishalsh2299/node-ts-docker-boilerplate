import { Router } from "express";
import { wrapper } from "../../helpers/exception_wrapper";
import { ProductController } from "../../controllers/product";
import ProductValidator from "../../validators/product";
import SchemaMiddleware from "../../middlewares/schema";

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       properties:
 *         id:
 *          type: number
 *         name:
 *          type: number
 *     Product:
 *       properties:
 *         id:
 *          type: number
 *         name:
 *           type: string
 *         sku_id:
 *          type: number
 *         sequence_no:
 *          type: number
 *         id_category:
 *          type: number
 *         is_enabled:
 *          type: number
 *         created_by:
 *          type: object
 *          properties:
 *            id:
 *             type: number
 *            name:
 *             type: string
 *         created_date:
 *          type: string
 *         modified_by:
 *          type: object
 *          properties:
 *            id:
 *             type: number
 *            name:
 *             type: string
 *         modified_date:
 *          type: string
 */

const router = Router();

/**
 * @swagger
 * /v0/product:
 *  get:
 *    parameters:
 *    - in: query
 *      name: id_last
 *      schema:
 *        type: number
 *    - in: query
 *      name: limit
 *      schema:
 *        type: number
 *    tags:
 *    - Products
 *    summary: Get products
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  type: array
 *                  items:
 *                     $ref: '#components/schemas/Product'
 *                page_metadata:
 *                      type: object
 *                      properties:
 *                        id_last:
 *                          type: number
 *                        total_count:
 *                          type: number
 *                        limit:
 *                          type: number
 *                        remaining_pages_count:
 *                          type: number
 *                        current_page_record_count:
 *                          type: number
 */
router.get("/", wrapper(ProductController.getAll));

/**
 * @swagger
 * /v0/product/{id}:
 *  get:
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: number
 *    tags:
 *    - Products
 *    summary: Get product by Id
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  $ref: '#/components/schemas/Product'
 */
router.get("/:id", wrapper(ProductController.getProductById));

/**
 * @openapi
 * /v0/product:
 *  post:
 *    tags:
 *    - Products
 *    security:
 *    - BasicAuth: []
 *    summary: Add Product
 *    requestBody:
 *      description: User Object
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              sku_id:
 *                type: number
 *              id_category:
 *                type: number
 *              is_enabled:
 *                type: boolean
 *                default: true
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  $ref: '#/components/schemas/Product'
 */
router.post(
  "/",
  (req, res, next) => {
    SchemaMiddleware.handle(
      req,
      res,
      next,
      ProductValidator.addUpdateProducts()
    );
  },
  wrapper(ProductController.addProduct)
);

/**
 * @swagger
 * /v0/product/{id}:
 *  delete:
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: number
 *    tags:
 *    - Products
 *    security:
 *    - BasicAuth: []
 *    summary: Delete product
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  $ref: '#components/schemas/Product'
 * */
router.delete("/:id", wrapper(ProductController.deleteProduct));

/**
 * @swagger
 * /v0/product/{id}:
 *  put:
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: number
 *    tags:
 *    - Products
 *    security:
 *    - BasicAuth: []
 *    summary: Update Product
 *    requestBody:
 *      description: Product Object
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              sku_id:
 *                type: number
 *              id_category:
 *                type: number
 *              is_enabled:
 *                type: boolean
 *                default: true
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  $ref: '#components/schemas/Product'
 */
router.put(
  "/:id",
  (req, res, next) => {
    SchemaMiddleware.handle(
      req,
      res,
      next,
      ProductValidator.addUpdateProducts()
    );
  },
  wrapper(ProductController.updateProduct)
);

export default router;
