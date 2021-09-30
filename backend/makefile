build: build-db wait build-api 

build-api:
	docker-compose up -d --build web
	docker exec -it backend-api python manage.py migrate --run-syncdb

build-db:
	docker-compose up -d --build db

stop:
	docker stop backend-api
	docker stop backend-db

start:
	docker start backend-api
	docker start backend-db

rm:
	docker kill backend-api
	docker kill backend-db
	docker rm backend-api
	docker rm backend-db
	docker rmi backend_web

rm-api:
	docker kill backend-api
	docker rm backend-api

rm-db:
	docker kill backend-db
	docker rm backend-db

wait: 
	sleep 5