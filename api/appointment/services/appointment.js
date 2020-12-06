"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  sendAppointmentReminderSms(appointment) {
    const appTime = new Date(appointment.date).toLocaleTimeString();
    const message = `Hi ${appointment.instructor.username} you have an appointment with ${appointment.client.username} at ${appTime}`;
    const phoneNumber = appointment.instructor.phoneNumber;
    console.log(message, phoneNumber);
    console.log(appointment.instructor);
    console.log(appointment.client);
    return strapi.config.functions.smsApi(message, phoneNumber);
  },
};
