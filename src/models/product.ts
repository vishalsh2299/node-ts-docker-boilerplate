import { Common } from "./common";
import {
  NullableBoolean,
  NullableNumber,
  NullableString,
} from "../typings/types";
import { Helper } from "../helpers/helper";

export class Product extends Common {
  public name: NullableString = undefined;

  public sku_id: NullableNumber = undefined;

  public id_category: NullableNumber = undefined;

  public is_enabled: NullableBoolean = undefined;

  constructor(model?: any) {
    super();
    if (model) {
      Helper.shallowCopy(model, this);
    }
  }
}

export default Product;
