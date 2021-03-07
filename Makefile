build_local:
	docker build --tag gcloudrigapi .

env:
	export JWT_SECRET=testing1234
	export API_USERNAME=test
	export API_PASSWORD=password123
	export PORT=5000

build: 
	gcloud builds submit --tag "gcr.io/${GOOGLE_CLOUD_PROJECT}/gcloudrig"

deploy:
	gcloud run deploy --image "gcr.io/${GOOGLE_CLOUD_PROJECT}/gcloudrig" --platform managed --update-env-vars JWT_SECRET=testing1234,API_USERNAME=test,API_PASSWORD=password123,PROJECT_ID=${GOOGLE_CLOUD_PROJECT}

run_bash:
	docker run -p 5000:5000 --env PROJECT_ID="${GOOGLE_CLOUD_PROJECT}" --env SERVICE_ACCOUNT_KEY_BASE64="$(shell base64 --wrap=0 < ./service_account.json)" --env PORT=5000 --env JWT_SECRET=testing1234 --env API_USERNAME=test --env API_PASSWORD=password123 -it gcloudrigapi bash

# macOS does --wrap=0 by default and does not have the command
run_bash_mac:
	docker run -p 5000:5000 --env PROJECT_ID="${GOOGLE_CLOUD_PROJECT}" --env SERVICE_ACCOUNT_KEY_BASE64="$(shell base64 < ./service_account.json)" --env PORT=5000 --env JWT_SECRET=testing1234 --env API_USERNAME=test --env API_PASSWORD=password123 -it gcloudrigapi bash

npm_install:
	npm install --prefix app/api
	npm install --prefix app/dashboard --force

npm_clean:
	rm -rfv app/api/node_modules
	rm -rfv app/dashboard/node_modules

run:
	docker run -p 5000:5000 --env PROJECT_ID="${GOOGLE_CLOUD_PROJECT}" --env SERVICE_ACCOUNT_KEY_BASE64="$(shell base64 --wrap=0 < ./service_account.json)" --env PORT=5000 --env JWT_SECRET=testing1234 --env API_USERNAME=test --env API_PASSWORD=password123 -it gcloudrigapi

# macOS does --wrap=0 by default and does not have the command
run_mac:
	docker run -p 5000:5000 --env PROJECT_ID="${GOOGLE_CLOUD_PROJECT}" --env SERVICE_ACCOUNT_KEY_BASE64="$(shell base64 < ./service_account.json)" --env PORT=5000 --env JWT_SECRET=testing1234 --env API_USERNAME=test --env API_PASSWORD=password123 -it gcloudrigapi

stop:
	docker stop $(shell docker ps -q --filter ancestor=gcloudrigapi)