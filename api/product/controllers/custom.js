"use strict";

module.exports = {
  async sendCountSms(ctx) {
    const userId = ctx.state.user.id;
    const userPhone = ctx.state.user.phoneNumber;
    const productCount = await strapi.services.product.count({ user: userId });
    await strapi.services.product.sendProductsCountSms(productCount, userPhone);
    const smsLog = { user: userId, date: Date.now() };
    await strapi.services.smslog.create(smsLog);
    return "success";
  },
};
