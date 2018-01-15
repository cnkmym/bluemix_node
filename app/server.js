(function() {
  'use strict';

  const express = require('express');
  const logger = require('morgan');
  const bodyParser = require('body-parser');
  const errorhandler = require('errorhandler');
  const controller = require('./controller.js');
  const version = require('../version.json');

  const app = express();
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    'extended': false
  }));
  app.use(errorhandler());

  app.get('/api/whoami', controller.whoami);
  app.get('/api/crashme',  controller.crashme);
  app.get('/', controller.general);

  if (process.env.VCAP_SERVICES) {
    console.log(JSON.parse(process.env.VCAP_SERVICES));
  }

  const port = process.env.PORT || 3000;
  const server = app.listen(port, (error) => {
    /* istanbul ignore if */
    if (error) {
      console.error(error.message);
      process.exit(1);
    } else {
      console.log(`Server is running and listening on port ${port}`);
      console.log(`Current Code version is ${version.branch}`);
    }
  });

  const closeServer = () => {
    server.close(() => {
      console.log("Server is shutdown");
    });
  };

  module.exports = {
    'closeServer': closeServer
  };
}());
