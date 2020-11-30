const axios = require("axios");

module.exports = (message, phone) => {
  return axios.post(
    "https://hook.integromat.com/ce98y7fcb67ptjdoatwbcsoxvctqf76r",
    { params: { message, phone } }
  );
};
