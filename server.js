/*jshint esversion: 6 */

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const ip = require('ip');

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
  let hello = '<h1>Hello, You are from IP_ADDRESS</h1>';
  let newHello = hello.replace(/IP_ADDRESS/g,req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  res.send(newHello);
});

app.listen(3000,(error)=>{
  if (error){
    console.error(error.message);
    process.exit(1);
  }else{
    console.log("Server is running and listening on port 3000");
  }
});
