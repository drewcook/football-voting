const config = require('config');

const setupConfig = () => {
  if (!config.get('APP_SECRET')) {
    throw new Error('FATAL ERROR: APP_SECRET is not defined.')
  };
};

module.exports = setupConfig;
