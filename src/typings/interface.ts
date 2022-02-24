export interface SQLStatementInsert {
  columns: string;
  param_ids: string;
  param_values: Array<any>;
}

export interface SQLStatementUpdate {
  columns: string;
  param_values: Array<any>;
}
