"use strict";

module.exports = {
  //Find all Products for specific user by its id
  find(params, userId, populate) {
    params.user = userId;
    return strapi.query("product").find(params, populate);
  },
};
