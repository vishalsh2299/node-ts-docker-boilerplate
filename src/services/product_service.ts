import db from "../db";
import { logger } from "../config/logger";
import { CommonService } from "./common_service";

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
}
