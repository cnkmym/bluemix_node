(function() {
  'use strict';

  const ip = require('ip');

  const whoami = (req, res) => {
    const ipAddress = ip.address();
    res.status(200).send(`I am server instance on ${ipAddress}\r\n`);
  };

  let _processKiller;
  const _getProcessKill = ()=>{
    return _processKiller;
  };

  const setProcessKill = (newKiller)=>{
    _processKiller = newKiller;
  };

  const crashme = (req, res, next)=>{//, processKill) => {
    const ipAddress = ip.address();
    console.log(`Ready to crash server instance on ${ipAddress}`);
    /* istanbul ignore next */
    const callback = _getProcessKill() || function() {
      process.exit(0);
      //res.status(200).send("Crashme");
    };
    callback();
  };

  const general = (req, res) => {
    let ips = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let REMOTE_IP = "N/A";
    let BLUEMIX_LB_IP = "N/A";
    if (ips.indexOf(",")>0) {
      //in bluemix environment
      REMOTE_IP = ips.substring(0,ips.indexOf(","));
      BLUEMIX_LB_IP = ips.substring(ips.indexOf(",")+1);
    } else {
      //local mode
      REMOTE_IP = ips;
    }
    res.status(200).send(`Hello, You are from <Remote IP>${REMOTE_IP}  <Bluemix LB IP>${BLUEMIX_LB_IP}\r\n`);
  };

  module.exports = {
    'whoami': whoami,
    'crashme':  crashme,
    'setProcessKill': setProcessKill,
    'general': general
  };
}());
