const { PORT } = require('./config/const');
const logger = require('./src/service/logger');

/* Connection with the database */
require('./src/service/database')();

const app = require('./src/app');

/* Listening to the the server */
app.listen(PORT, () => {
  logger.debug(`server started at: ${PORT}`);
});
