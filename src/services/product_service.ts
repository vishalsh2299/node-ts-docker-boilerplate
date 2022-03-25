import db from "../db";
import { logger } from "../config/logger";
import { CommonService } from "./common_service";
import Product from "../models/product";
import { Helper } from "../helpers/helper";

export class ProductService extends CommonService {
  constructor(_user: any) {
    super(_user);
  }

  /// get all products
  public async getAllProducts(id_last = 0, limit = 10): Promise<any> {
    try {
      if ((id_last && id_last < 0) || (limit && limit < 0)) {
        return {
          success: false,
          data: {
            message: "Bad request",
          },
        };
      }

      const params = [id_last, limit];
      const countParams = [id_last];

      const sql = `SELECT id, name, sku_id, sequence_no, category,
                  is_enabled, created_by, created_date, modified_by, modified_date
                  FROM view_product_data
            ORDER BY id
            LIMIT $${params.length} OFFSET $${params.length - 1}
            `;
      const sqlCount = `SELECT count(*) FROM products as pd WHERE pd.id > $${countParams.length}`;
      const totalCount = `SELECT count(*) FROM products`;

      const query_results = await db.query(this.user_current, sql, params);
      const count_results = await db.query(
        this.user_current,
        sqlCount,
        countParams
      );
      const total_count_results = await db.query(this.user_current, totalCount);

      let page_metadata = {};

      if (query_results.rowCount > 0) {
        page_metadata = {
          limit,
          total_count: parseInt(total_count_results.rows[0]["count"] as string),
          id_last: query_results.rows[query_results.rows.length - 1].id,
          current_page_record_count: query_results.rowCount,
          remaining_pages_count:
            Math.ceil(count_results.rows[0].count / limit) - 1,
        };
      }

      return {
        success: true,
        data: query_results.rows,
        page_metadata,
      };
    } catch (error: any) {
      logger.error(`ProductService.getAllProducts() Error: ${error}`);
      return {
        success: false,
        data: { message: error.detail || error },
      };
    }
  }

  public async getProductById(id = 0): Promise<any> {
    try {
      const params = [id];

      const sql = `SELECT id, name, sku_id, sequence_no, category,
      is_enabled, created_by, created_date, modified_by, modified_date
      FROM view_product_data WHERE id = $1`;

      const query_results = await db.query(this.user_current, sql, params);

      if (query_results.rowCount > 0) {
        return {
          success: true,
          data: query_results.rows[0],
        };
      } else {
        return {
          success: true,
          data: "No product found!!!",
        };
      }
    } catch (error: any) {
      logger.error(`ProductService.getProductByI() Error: ${error}`);
      return {
        success: false,
        data: { message: error.detail || error },
      };
    }
  }

  public async addProduct(product: Product): Promise<any> {
    /// Begin Transaction
    const client = await db.beginTransaction(this.user_current);

    try {
      const insertSqlData = Helper.getSQLSatementInsert(product);
      // insert rows in product
      const insertSql = `INSERT INTO products(${insertSqlData.columns})
              VALUES (${insertSqlData.param_ids})
              RETURNING *
              `;

      // insert result
      const result = await db.tquery(
        client,
        insertSql,
        insertSqlData.param_values
      );

      const sql = `SELECT id, name, sku_id, sequence_no, category,
      is_enabled, created_by, created_date, modified_by, modified_date FROM view_product_data WHERE id = $1`;
      const params = [result.rows[0].id];

      const query_results = await db.tquery(client, sql, params);

      /// Commit Transaction
      await db.commitTransaction(client);

      return {
        success: true,
        data: query_results.rows[0],
      };
    } catch (error: any) {
      /// Rollback Transaction
      await db.rollbackTransaction(client);

      logger.error(`ProductService.addProduct() Error: ${error}`);
      return {
        success: false,
        data: { message: error.detail || error },
      };
    }
  }

  public async deleteProduct(id: number): Promise<any> {
    try {
      const sql = `DELETE FROM products WHERE id = $1`;

      const params = [id];
      await db.query(this.user_current, sql, params);

      return {
        success: true,
        data: "Deleted successfully",
      };
    } catch (error: any) {
      logger.error(`ProductService.deleteProduct() Error: ${error}`);
      return {
        success: false,
        data: { message: error.detail || error },
      };
    }
  }

  public async updateProduct(id: number, payload: Product): Promise<any> {
    const client = await db.beginTransaction(this.user_current);

    try {
      // helper to generate statement for setting values
      const { param_values, columns } = Helper.getSQLSatementUpdate(payload);

      param_values.push(id);

      // update sql
      const sql = `UPDATE products
                    SET ${columns}
                    WHERE id = $${param_values.length}
                    RETURNING *`;

      const result = await db.tquery(client, sql, param_values);

      const get_sql = `SELECT id, name, sku_id, sequence_no, category,
       is_enabled, created_by, created_date, modified_by, modified_date FROM view_product_data WHERE id = $1`;
      const params = [result.rows[0].id];

      const query_results = await db.tquery(client, get_sql, params);

      if (query_results.rowCount <= 0) {
        return {
          success: false,
          data: "Invalid access or product not found",
        };
      }

      await db.commitTransaction(client);

      return {
        success: true,
        data: query_results.rows[0],
      };
    } catch (error: any) {
      await db.rollbackTransaction(client);
      logger.error(`ProductService.updateProduct() Error: ${error}`);
      return {
        success: false,
        data: { message: error.detail || error },
      };
    }
  }
}
