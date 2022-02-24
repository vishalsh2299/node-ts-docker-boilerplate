import { Helper } from "../helpers/helper";
import {
  NullableBoolean,
  NullableNumber,
  NullableString,
} from "../typings/types";
import Common from "./common";

export class User extends Common {
  public username: NullableString = undefined;

  public hashpass: NullableString = undefined;

  public id_role: NullableNumber = undefined;

  public role_name: NullableString = undefined;

  public is_admin: NullableBoolean = undefined;

  constructor(model?: any) {
    super();
    if (model) {
      Helper.shallowCopy(model, this);
    }
  }
}

export default User;
