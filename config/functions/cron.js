"use strict";

module.exports = {
  "*/1 * * * * ": async () => {
    const now = new Date();
    now.setMilliseconds(0);
    now.setSeconds(0);

    const appointments = await strapi.services.appointment.find({
      reminderDate: now,
    });

    if (appointments.length) {
      for (let i = 0; i < appointments.length; i++) {
        await strapi.services.appointment.sendAppointmentReminderSms(
          appointments[i]
        );
      }
    }
  },
};
