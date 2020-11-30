"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * parseMultipartData: This function parses strapi's formData format.
 * sanitizeEntity: This function removes all private fields from the model and its relations.
 */

/**
 * we can use ->
 * ctx.unauthorized(`Access denied`);
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
    const productId = ctx.params.id;
    const userId = ctx.state.user.id;

    const product = await strapi.services.product.findOne({
      id: productId,
      user: userId,
    });
    return sanitizeEntity(product, { model: strapi.models.product });
  },

  /** Count the products the user owned */
  async count(ctx) {
    const query = ctx.query;
    const userId = ctx.state.user.id;

    if (query._q) {
      return strapi.services.product.countSearch({ ...query, user: userId });
    }
    return strapi.services.product.count({ ...query, user: userId });
  },

  /** Create new product, define requested user as product owner, send user sms when product creates successfully */
  async create(ctx) {
    let product;
    const userId = ctx.state.user.id;
    const userPhone = ctx.state.user.phoneNumber;

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = userId;
      product = await strapi.services.product.create(data, { files });
    } else {
      ctx.request.body.user = userId;
      product = await strapi.services.product.create(ctx.request.body);
    }

    if (product) {
      await strapi.services.product.sendNewProductSms(product, userPhone);
    }

    return sanitizeEntity(product, { model: strapi.models.product });
  },

  /** Update product - allow access only to the products requested user owned */
  async update(ctx) {
    const productId = ctx.params.id;
    const userId = ctx.state.user.id;

    let updatedProduct;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      updatedProduct = await strapi.services.product.update(
        { id: productId, user: userId },
        data,
        {
          files,
        }
      );
    } else {
      updatedProduct = await strapi.services.product.update(
        { id: productId, user: userId },
        ctx.request.body
      );
    }

    return sanitizeEntity(updatedProduct, { model: strapi.models.product });
  },

  /** Delete product - allow access only to the products requested user owned */
  async delete(ctx) {
    const productId = ctx.params.id;
    const userId = ctx.state.user.id;

    const deletedProduct = await strapi.services.product.delete({
      id: productId,
      user: userId,
    });
    return sanitizeEntity(deletedProduct, { model: strapi.models.product });
  },
};
