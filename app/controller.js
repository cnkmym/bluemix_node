(function() {
  'use strict';

  const ip = require('ip');

  const whoami = (req, res) => {
    const ipAddress = ip.address();
    res.status(200).send(`I am server instance on ${ipAddress}`);
  };


  const crashme = (req, res, next, processKill) => {
    const ipAddress = ip.address();
    /* istanbul ignore next */
    const callback = processKill || function() {
      process.exit(0);
    };
    console.log(`Ready to crash server instance on ${ipAddress}`);
    callback();
  };


  const general = (req, res) => {
    let ips = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let REMOTE_IP = "N/A";
    let BLUEMIX_LB_IP = "N/A";
    if ((ips instanceof Array)) {
      //in bluemix environment
      REMOTE_IP = ips[0];
      BLUEMIX_LB_IP = ips[1];
    } else {
      //local mode
      REMOTE_IP = ips;
    }
    res.status(200).send(`Hello, You are from <Remote IP>${REMOTE_IP}  <Bluemix LB IP>${BLUEMIX_LB_IP}`);
  };

  module.exports = {
    'whoami': whoami,
    'crashme': crashme,
    'general': general
  };
}());
