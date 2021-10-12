build:
	docker-compose -f docker-compose.prod.yml build
	docker run  -p 3000:3000 --name frontend -d app-prod

run:
	docker run  -p 3000:3000 --name frontend -d app-prod