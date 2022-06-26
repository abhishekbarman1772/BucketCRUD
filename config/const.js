require('dotenv').config({ path: `./config/${process.env.NODE_ENV}/.env` });

module.exports = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,

  MEGA_EMAIL: process.env.MEGA_EMAIL,
  MEGA_PASSWORD: process.env.MEGA_PASSWORD,

};
