import {
  NullableNumber,
  NullableDate,
  NullableBoolean,
  NullableString,
} from "../typings/types";

export class Common {
  public id: NullableNumber = undefined;

  public created_date: NullableDate = undefined;

  public created_by: NullableNumber = undefined;

  public modified_by: NullableNumber = undefined;

  public modified_date: NullableDate = undefined;
}

export default Common;
