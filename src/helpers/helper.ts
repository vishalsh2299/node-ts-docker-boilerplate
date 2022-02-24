import { SQLStatementInsert, SQLStatementUpdate } from "../typings/interface";
import User from "../models/user";

export class Helper {
  public static defaultUser() {
    const _user: User = new User();
    _user.username = "user_default";
    _user.id = 1;
    return _user;
  }

  public static shallowCopy(source: any, target: any) {
    Object.keys(target).forEach((key) => {
      if (source[key] !== undefined) {
        target[key] = source[key];
      }
    });

    return target;
  }

  public static getSQLSatementInsert(source: any): SQLStatementInsert {
    const sql_columns: Array<string> = [];
    const sql_columns_params: Array<string> = [];
    const sql_values: Array<any> = [];
    let i = 1;

    Object.keys(source).forEach((key) => {
      if (source[key] !== undefined && key !== "id" && key !== "_table_name") {
        sql_columns.push(key);
        sql_columns_params.push(`$${i++}`);
        sql_values.push(source[key]);
      }
    });

    return {
      columns: sql_columns.join(","),
      param_ids: sql_columns_params.join(","),
      param_values: sql_values,
    };
  }

  public static getSQLSatementUpdate(source: any): SQLStatementUpdate {
    const sql_columns: Array<string> = [];
    const sql_values: Array<any> = [];
    let i = 1;

    Object.keys(source).forEach((key) => {
      if (source[key] !== undefined && key !== "id" && key !== "_table_name") {
        sql_columns.push(`${key} = $${i++}`);
        sql_values.push(source[key]);
      }
    });

    return { columns: sql_columns.join(","), param_values: sql_values };
  }
}
