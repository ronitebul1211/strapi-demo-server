"use strict";
const { default: createStrapi } = require("strapi");
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const product = require("../services/product");
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

  /** Find products by product id, response with data if the requested user is product owner */
  async findOne(ctx) {
    const { params, state } = ctx;
    const product = await strapi.services.product.findOne({
      id: params.id,
      user: state.user.id,
    });
    return sanitizeEntity(product, { model: strapi.models.product });
  },

  async create(ctx) {
    let product;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      product = await strapi.services.product.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      product = await strapi.services.product.create(ctx.request.body);
    }
    return sanitizeEntity(product, { model: strapi.models.product });
  },
};
