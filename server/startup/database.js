const config = require('config');
const mongoose = require('mongoose');
const { logger } = require('../startup/logging');

const setupDb = () => {
	const host = config.get('MONGODB_CONNECTION_HOST');
	const name = config.get('APP_NAME');
  const db = `${host}/${name}`;
  // Connect to the local mongoDB instance
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
    .then(() => logger.info(`Connected to ${db}...`));
};

module.exports = setupDb;
