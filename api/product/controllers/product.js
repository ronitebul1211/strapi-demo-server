"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * parseMultipartData: This function parses strapi's formData format.
 * sanitizeEntity: This function removes all private fields from the model and its relations.
 */

module.exports = {
  /** Find from the products the user owned */
  async find(ctx) {
    const query = ctx.query;
    const userId = ctx.state.user.id;
    let products;
    if (query._q) {
      products = await strapi.services.product.search({
        ...query,
        user: userId,
      });
    } else {
      products = await strapi.services.product.find({ ...query, user: userId });
    }
    return products.map((product) =>
      sanitizeEntity(product, { model: strapi.models.product })
    );
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

  /** Create new product, define requested use as product owner, send user sms when product creates successfully */
  async create(ctx) {
    let product;
    const user = ctx.state.user;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = user.id;
      product = await strapi.services.product.create(data, { files });
    } else {
      ctx.request.body.user = user.id;
      product = await strapi.services.product.create(ctx.request.body);
    }

    if (product) {
      await strapi.services.product.sendNewProductSms(
        product,
        user.phoneNumber
      );
    }

    return sanitizeEntity(product, { model: strapi.models.product });
  },

  /** Count the products the user owned */
  count(ctx) {
    const query = ctx.query;
    const userId = ctx.state.user.id;

    if (query._q) {
      return strapi.services.product.countSearch({ ...query, user: userId });
    }
    return strapi.services.product.count({ ...query, user: userId });
  },
};
