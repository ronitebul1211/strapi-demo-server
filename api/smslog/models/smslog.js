"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

/**
 * beforeCreate invoke -> after create service invoked & new record add from admin panel
 * beforeUpdate invoke -> after update service invoked & new record updated from admin panel
 *
 * Goal: define username field base on user field
 * Problem: before create we have an access only to user id (not object)
 * solution 1 (bad): pass to create(service) user object from ctx, solve only client side creation, Not admin panel creation (in this case no need admin panel creation)
 * solution 2 (bad): use update(smslog-service) in afterCreate to update username base on user (full access to user object), why its bad?
 *                   because in some base value is actually updated (e.g slug). means implement in afterUpdate update service -> cause endless loop.
 * solution 3 (not reuseable) query users before update -> await strapi.query("user", "users-permissions").find({ id: 1 });
 * solution 4 (best): use user service -> more info on github src
 */
module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      const user = await strapi.plugins[
        "users-permissions"
      ].services.user.fetch({ id: data.user });
      data.username = user.username;
    },
    // //not implemented in this case ->  user value not spoused to change
    // beforeUpdate: async (params, data) => {
    //   const user = await strapi.plugins[
    //     "users-permissions"
    //   ].services.user.fetch({ id: data.user });
    //   data.username = user.username;
    // },
  },
};
