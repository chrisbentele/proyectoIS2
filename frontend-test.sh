# Backend test script
cd backend/ && \
    source .venv/bin/activate && \
    python3 manage.py runserver & \
    cd ../frontend && yarn test
