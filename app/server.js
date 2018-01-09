const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const ip = require('ip');
const version = require('../version.json');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':false}));
app.use(errorhandler());

app.get('/api/whoami',(req,res)=>{
  const ipAddress = ip.address();
  res.status(200).send(`I am server instance on ${ipAddress}`);
});

app.get('/api/crashme',(req,res)=>{
  const ipAddress = ip.address();
  console.log(`Ready to crash server instance on ${ipAddress}`);
  process.exit(0);
});

app.get('/',(req,res)=>{
  let hello = 'Hello, You are from IP_ADDRESS';
  let newHello = hello.replace(/IP_ADDRESS/g,req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  res.status(200).send(newHello);
});

if (process.env.VCAP_SERVICES){
  console.log(JSON.parse(process.env.VCAP_SERVICES));
}

const port = process.env.PORT || 3000;
let server = app.listen(port,(error)=>{
  if (error){
    console.error(error.message);
    process.exit(1);
  }else{
    console.log(`Server is running and listening on port ${port}`);
    console.log(`Current Code version is ${version.branch}`);
  }
});

module.exports = {
  closeServer : ()=>{
    if (server){
      server.close(()=>{
        console.log("Server is shutdown");
      });
      return true;
    }else{
      return false;
    }
  }
}
