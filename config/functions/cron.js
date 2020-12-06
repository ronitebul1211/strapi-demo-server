"use strict";
const dateFns = require("date-fns");
/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

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
