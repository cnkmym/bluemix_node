(function() {
  'use strict';

  const express = require('express');
  const logger = require('morgan');
  const bodyParser = require('body-parser');
  const errorhandler = require('errorhandler');
  const ip = require('ip');
  const version = require('../version.json');

  const app = express();
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    'extended': false
  }));
  app.use(errorhandler());

  app.get('/api/whoami', (req, res) => {
    const ipAddress = ip.address();
    res.status(200).send(`I am server instance on ${ipAddress}`);
  });

  app.get('/api/crashme', (req, res) => {
    const ipAddress = ip.address();
    console.log(`Ready to crash server instance on ${ipAddress}`);
    process.exit(0);
  });

  app.get('/', (req, res) => {
    let ips = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let REMOTE_IP = "N/A";
    let BLUEMIX_LB_IP = "N/A";
    if ((ips instanceof Array)){
      //in bluemix environment
      REMOTE_IP = ips[0];
      BLUEMIX_LB_IP = ips[1];
    }else{
      //local mode
      REMOTE_IP = ips;
    }
    res.status(200).send(`Hello, You are from <Remote IP>${REMOTE_IP}  <Bluemix LB IP>${BLUEMIX_LB_IP}`);
  });

  if (process.env.VCAP_SERVICES) {
    console.log(JSON.parse(process.env.VCAP_SERVICES));
  }

  const port = process.env.PORT || 3000;
  let server = app.listen(port, (error) => {
    if (error) {
      console.error(error.message);
      process.exit(1);
    } else {
      console.log(`Server is running and listening on port ${port}`);
      console.log(`Current Code version is ${version.branch}`);
    }
  });

  module.exports = {
    closeServer: () => {
      if (server) {
        server.close(() => {
          console.log("Server is shutdown");
        });
        return true;
      } else {
        return false;
      }
    }
  };
}());
