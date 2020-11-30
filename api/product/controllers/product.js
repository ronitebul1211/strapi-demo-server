"use strict";
const { default: createStrapi } = require("strapi");
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * parseMultipartData: This function parses strapi's formData format.
 * sanitizeEntity: This function removes all private fields from the model and its relations.
 */

module.exports = {
  /** Find products by its user id */
  async find(ctx) {
    const { query, state } = ctx;
    let products;
    if (query._q) {
      products = await strapi.services.product.search(query);
    } else {
      products = await strapi.services.product.find(query, state.user.id);
    }
    return products.map((product) => {
      const resultProduct = sanitizeEntity(product, {
        model: strapi.models.product,
      });
      delete resultProduct.user;
      delete resultProduct.category;
      return resultProduct;
    });
  },
};
