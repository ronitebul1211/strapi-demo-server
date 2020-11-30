"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  //Find all Products for specific user by its id
  test(params, userId, populate) {
    params.user = userId;
    return strapi.query("product").find(params, populate);
  },
};
