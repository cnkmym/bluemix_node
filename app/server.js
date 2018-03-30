(function() {
  'use strict';

  const express = require('express');
  const logger = require('morgan');
  const bodyParser = require('body-parser');
  const errorhandler = require('errorhandler');
  const ip = require('ip');
  const controller = require('./controller.js');

  const app = express();
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    'extended': false
  }));
  app.use(errorhandler());
  app.use('/public', express.static('public'));
  app.use('/asset', express.static('public'));
  app.get('/api/whoami', controller.whoami);
  app.get('/api/crashme',  controller.crashme);
  app.get('/api/sleep/:seconds',  controller.sleep);
  app.get('/api/calcpi/:digits',  controller.calcPI);
  app.get('/', controller.general);

  if (process.env.VCAP_SERVICES) {
    console.log(JSON.parse(process.env.VCAP_SERVICES));
  }

  const ipAddress = ip.address();
  const port = process.env.PORT || 3000;

  const server = app.listen(port, (error) => {
    /* istanbul ignore if */
    if (error) {
      console.error(error.message);
      process.exit(1);
    } else {
      console.log(`Server is running at ${ipAddress} and listening on port ${port}`);
    }
  });

  const closeServer = () => {
    if (server){
      server.close(() => {
        console.log("Server is shutdown");
      });
    }
  };

  module.exports = {
    'closeServer': closeServer
  };
}());
