"use strict";
const { default: createStrapi } = require("strapi");
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * parseMultipartData: This function parses strapi's formData format.
 * sanitizeEntity: This function removes all private fields from the model and its relations.
 */

module.exports = {
  /** Find / Search authorized products based on user-id, params */
  async find(ctx) {
    const { query, state } = ctx;
    let products;
    if (query._q) {
      products = await strapi.services.product.search(query, state.user.id);
    } else {
      products = await strapi.services.product.find(query, state.user.id);
    }

    return products.map((product) => {
      const resultProduct = sanitizeEntity(product, {
        model: strapi.models.product,
      });
      return resultProduct;
    });
  },
};
