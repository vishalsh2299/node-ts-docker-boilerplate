import * as Joi from "joi";

class ProductValidator {
  public addUpdateProducts() {
    return Joi.object({
      name: Joi.string().required(),
      sku_id: Joi.number().required(),
      id_category: Joi.number().required(),
      is_enabled: Joi.boolean(),
    });
  }
}

export default new ProductValidator();
