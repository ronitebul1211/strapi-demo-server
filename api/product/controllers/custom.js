"use strict";

module.exports = {
  async sendCountSms(ctx) {
    const userId = ctx.state.user.id;
    const userPhone = ctx.state.user.phoneNumber;
    const productCount = await strapi.services.product.count({ user: userId });
    await strapi.services.product.sendProductsCountSms(productCount, userPhone);
    //TODO - No need to covert to local time, time kept om db in ISO format
    // const israelDataTimeString = new Date().toLocaleString("en-US", {
    //   timeZone: "Asia/Jerusalem",
    // });
    // const israelDataTime = new Date(israelDataTimeString)
    const smsLog = { user: userId, date: new Date() };
    await strapi.services.smslog.create(smsLog);
    return "success";
  },
};
