build:
	docker-compose -f docker-compose.prod.yml build
	docker run  -p 3000:3000 --name frontend -d app-prod

start:
	docker run  -p 3000:3000 --name frontend -d app-prod

stop:
	docker stop frontend

rm:
	@./remove_frontend.sh