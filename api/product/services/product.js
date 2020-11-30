"use strict";

module.exports = {
  sendNewProductSms(product, phone) {
    const message = `You have successfully added a new product: ${product.title}`;
    return strapi.config.functions.smsApi(message, phone);
  },
};
