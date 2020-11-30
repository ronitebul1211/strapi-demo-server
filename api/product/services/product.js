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

  // findOne(params, userId, populate) {
  //   return strapi.query("restaurant").findOne(params, populate);
  // },
};
