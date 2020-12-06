"use strict";
const dateFns = require("date-fns");

module.exports = {
  lifecycles: {
    beforeCreate: (data) => {
      data.reminderDate = getReminderDate(data);
    },
    beforeUpdate: (params, data) => {
      data.reminderDate = getReminderDate(data);
    },
  },
};

const getReminderDate = (data) => {
  let reminderDate;
  const appointmentDate = new Date(data.date);

  switch (data.reminder) {
    case "HALF_HOUR":
      reminderDate = dateFns.subMinutes(appointmentDate, 30);
      break;
    case "ONE_HOUR":
      reminderDate = dateFns.subHours(appointmentDate, 1);
      break;
    case "TWO_HOURS":
      reminderDate = dateFns.subHours(appointmentDate, 2);
      break;
    default:
      throw new Error("Appointment with invalid reminder" + data.reminder);
  }

  return reminderDate;
};
