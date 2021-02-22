build:
	docker build --build-arg project_id="${GOOGLE_CLOUD_PROJECT}" --tag gcloudrigapi .

run_bash:
	docker run -p 5000:5000 --env SERVICE_ACCOUNT_KEY_BASE64="$(shell base64 --wrap=0 < ./service_account.json)" --env PORT=5000 --env JWT_SECRET=testing1234 --env API_USERNAME=test --env API_PASSWORD=password123 -it gcloudrigapi bash

npm_install:
	npm install --prefix app/api
	npm install --prefix app/dashboard --force

npm_clean:
	rm -rfv app/api/node_modules
	rm -rfv app/dashboard/node_modules

run:
	docker run -p 5000:5000 --env SERVICE_ACCOUNT_KEY_BASE64="$(shell base64 --wrap=0 < ./service_account.json)" --env PORT=5000 --env JWT_SECRET=testing1234 --env API_USERNAME=test --env API_PASSWORD=password123 -it gcloudrigapi

stop:
	docker stop $(shell docker ps -q --filter ancestor=gcloudrigapi)