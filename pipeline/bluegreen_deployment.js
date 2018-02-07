//Step-1: Deploy to Staging environment

//#!/bin/bash
# Push app
export STAGING_APP_NAME="staging-$CF_APP"
cf push "${STAGING_APP_NAME}" -n ${STAGING_APP_NAME}
export APP_URL=http://$(cf app $CF_APP_NAME | grep -e urls: -e routes: | awk '{print $2}')
# View logs
#cf logs "${CF_APP_NAME}" --recent

//Step-2: Finish Smoke Test in Staging environment
//Staging url is passed via ${APP_URL}

//Step-3: Start Blue-Green deployment
#!/bin/bash
export STAGING_APP_NAME="staging-$CF_APP"
export PROD_APP_NAME="prod-$CF_APP"
export BACKUP_APP_NAME="backup-$CF_APP"

# Step-3.1: Map production route to Staging environment
cf map-route "${STAGING_APP_NAME}" "mybluemix.net" -n "${PROD_APP_NAME}"

# Step-3.2: Unmap staging route to Staging environment
cf unmap-route "${STAGING_APP_NAME}" "mybluemix.net" -n "${STAGING_APP_NAME}"

# Step-3.3: Unmap production route to Production environment
cf app "${PROD_APP_NAME}" && cf unmap-route "${PROD_APP_NAME}" "mybluemix.net" -n "${PROD_APP_NAME}"

# Step-3.4: Map backup route to (old) Production environment
cf app "${PROD_APP_NAME}" && cf map-route "${PROD_APP_NAME}" "mybluemix.net" -n "${BACKUP_APP_NAME}"

# Step-3.5: Delete (old) Backup environment and rename (old) Production environment to "Backup"
cf app "${BACKUP_APP_NAME}" && cf delete -f "${BACKUP_APP_NAME}"
cf app "${PROD_APP_NAME}" && cf rename "${PROD_APP_NAME}" "${BACKUP_APP_NAME}"

# Step-3.6: Rename Staging environment to (new) "Prodution"
cf rename "${STAGING_APP_NAME}" "${PROD_APP_NAME}"
