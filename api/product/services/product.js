"use strict";

module.exports = {
  //Find authorized products based on user-id, params
  find(params, userId, populate) {
    const newParams = { ...params, user: userId };
    return strapi.query("product").find(newParams, populate);
  },

  //Search in authorized products based on user-id, params
  search(params, userId, populate) {
    const newParams = { ...params, user: userId };
    return strapi.query("product").search(newParams, populate);
  },

  sendNewProductSms(product, phone) {
    const message = `You have successfully added a new product: ${product.title}`;
    return strapi.config.functions.smsApi(message, phone);
  },
};
