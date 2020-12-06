"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  sendAppointmentReminderSms(appointment) {
    const appTime = new Date(appointment.date).toLocaleTimeString();
    const message = `Hi ${appointment.instructor} you have an appointment with ${appointment.client} at ${appTime}`;
    return strapi.config.functions.smsApi(
      message,
      appointment.instructor.phoneNumber
    );
  },
};
