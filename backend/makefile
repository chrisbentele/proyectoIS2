build: build-api build-db
	backend_web_1
	timeout 2
	backend_web_1

build-api:
	docker-compose up -d --build web
	docker exec -it backend_db bash
	python manage.py migrate --run-syncdb

build-db:
	docker-compose up -d --build db

rm:
	docker kill backend_web_1
	docker kill backend_db_1
	docker rm backend_web_1
	docker rm backend_db_1
	docker rmi backend_web

rm-api:
	docker kill backend_api
	docker rm backend_api

rm-db:
	docker kill backend_db
	docker rm backend_db