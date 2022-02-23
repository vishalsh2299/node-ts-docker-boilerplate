import { logger } from "../config/logger";

import path from "path";
import { Pool, QueryResult } from "pg";
import { migrate } from "postgres-migrations";
import User from "../models/user";

const poolConfig = {
  port: parseInt(process.env.PORT as string),
  ssl:
    process.env.NODE_ENV !== "production"
      ? false
      : {
          rejectUnauthorized: false,
        },
  max: 20,
  connectionString: process.env.DATABASE_URL as string,
  ensureDatabaseExists: true,
  idleTimeoutMillis: 10000,
};

class PgPool {
  pool: Pool;

  constructor() {
    this.pool = new Pool(poolConfig);
  }

  runMigrations = async (): Promise<void> => {
    const client = await this.pool.connect();

    try {
      await migrate({ client }, path.resolve(__dirname, "../migrations"), {
        logger: console.log,
      });
    } catch (err) {
      logger.error(`Migration failed ${err}`);
    } finally {
      client.release();
    }
  };

  async query(
    cUser: User,
    query: any,
    params: any[] = []
  ): Promise<QueryResult<any>> {
    const start = Date.now();
    try {
      /// Set the session so the current_user function will pick user from this
      await this.pool.query(
        `SET SESSION postgres.username = '${cUser.username}'`,
        []
      );

      const res = await this.pool.query(query, params);

      // time elapsed since invocation to execution
      const duration = Date.now() - start;
      console.log({ query, duration, rows: res.rowCount });

      logger.info({ query, duration, rows: res.rowCount });
      return res;
    } catch (error) {
      logger.error({ error, query });
      throw error;
    }
  }
}

const db = new PgPool();

export default db;
