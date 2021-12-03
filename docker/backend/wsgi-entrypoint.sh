#!/bin/sh

until cd /app/backend
do
    echo "Waiting for server volume..."
done

until ./manage.py migrate --run-sync
do
    echo "Waiting for db to be ready..."
    sleep 2
done

./manage.py collectstatic --noinput

export DJANGO_SETTINGS_MODULE=controller.settings && python3 -m django_createsuperuser "admin" "admin"

gunicorn controller.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4
#./manage.py runserver 0.0.0.0:8003