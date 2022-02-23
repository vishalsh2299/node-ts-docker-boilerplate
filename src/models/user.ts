/**
 *        @file user.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary User Class
 * @description Defines the structure for user model
 */

import {
  NullableBoolean,
  NullableNumber,
  NullableString,
} from "../typings/types";
import Common from "./common";

/**
 * User class (instances throughout code as cUser)
 *
 * This class is instantiated for each endpoint call and contains information about the user and
 * session associated with the endpoint call.
 *
 * @class User
 */

export class User extends Common {
  public username: NullableString = undefined;

  public hashpass: NullableString = undefined;

  public id_role: NullableNumber = undefined;

  public role_name: NullableString = undefined;

  public is_admin: NullableBoolean = undefined;

  constructor() {
    super();
  }
}

export default User;
