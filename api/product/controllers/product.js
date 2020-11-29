"use strict";
const { default: createStrapi } = require("strapi");
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * parseMultipartData: This function parses strapi's formData format.
 * sanitizeEntity: This function removes all private fields from the model and its relations.
 */

/** Response with the products the user own */
module.exports = {
  async find(ctx) {
    let products;
    if (ctx.query._q) {
      products = await strapi.services.product.search(ctx.query);
    } else {
      products = await strapi.services.product.find(ctx.query);
    }
    const userId = ctx.state.user.id;
    const ownedProducts = products.filter(
      (product) => product.user.id === userId
    );
    return ownedProducts.map((entity) => {
      const product = sanitizeEntity(entity, {
        model: strapi.models.product,
      });
      if (product.user) {
        delete product.user;
        delete product.category;
      }
      return product;
    });
  },
};
