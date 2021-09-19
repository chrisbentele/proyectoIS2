cd backend/ && \
    source .venv/bin/activate && \
    python -m pip install -r requirements.txt && \
    ./crear_db.sh && \
    python manage.py migrate --run-syncdb && \
    python manage.py runserver &
# cd frontend/ && yarn install && yarn start