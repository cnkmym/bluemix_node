# bluemix_node

This project is a simple sample of bluemix (cloud foundry) PaaS demonstration.

NodeJS is used to craft this simple application, to demonstrate :
(1) basic process of application development and life-cycle management



(2) server resilience (recover after failure) performance
Note: When existing server is crashed, logs are as follows:
-- APP/PROC/WEB  Ready to crash server instance at [IP]
-- CELL   Destroying container
-- API    Process has crashed with type: "web"

Note: When new server is up and running, logs are as follows:
-- CELL   Creating container
-- APP/PROC/WEB  >node app/server.js
-- APP/PROC/WEB  Server is running at [IP] and listending on port 8080


(3) convenience of CI/CD process and its performance
Red/Black Deployment Pipeline:

Full Gateway Deployment Pipeline:
