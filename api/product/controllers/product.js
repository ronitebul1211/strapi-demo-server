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
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.product.search(ctx.query);
    } else {
      entities = await strapi.services.product.find(ctx.query);
    }
    const userId = ctx.state.user.id;
    const authorizedEntities = entities.filter(
      (entity) => entity.user.id === userId
    );
    return authorizedEntities.map((entity) => {
      const product = sanitizeEntity(entity, {
        model: strapi.models.product,
      });
      if (entity.user) {
        delete product.user;
        delete product.category;
      }
      return product;
    });
  },
};
