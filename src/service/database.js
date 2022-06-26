const mongoose = require('mongoose');
const logger = require('./logger');
const { MONGO_URL } = require('../../config/const');

module.exports = async () => {
  try {
    await mongoose.connect(
      MONGO_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    );
    logger.debug('Mongo connection established');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
