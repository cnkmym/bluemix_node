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
Note: during Prod deployment, Prod traffic will NOT Fail. This process needs to be kicked manually.
(The "launch point" is "Build" Phase itself, also possible to set it to "PRODUCTION switch" phase.)
Pipeline URL: https://console.bluemix.net/devops/pipelines/39fe4101-9e4b-4d5d-b0df-8d913239a0c5?env_id=ibm:yp:us-south
Staging URL: http://staging-sample-1132.mybluemix.net/
Prod URL: https://prod-sample-1132.mybluemix.net/#

Full Gateway Deployment Pipeline:
Note: during Prod deployment, Prod traffic will all fail
Pipeline URL : https://console.bluemix.net/devops/pipelines/a62dac83-ec58-45aa-87cb-0ff23535f498?env_id=ibm:yp:us-south
This process will hook GitHub change (master branch) automatically.
Prod URL :https://sample-1140.mybluemix.net/#
Gate Review URL : https://console.bluemix.net/devops/insights/?env_id=ibm:yp:us-south#!/deploymentrisk?orgName=ye%40metlife.co.jp&toolchainId=d3fc2c6e-d347-473f-9a66-32ad79e1512b
