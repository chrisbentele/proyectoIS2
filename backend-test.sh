# Backend test script
set -a; source docker/dev.env set +a && \
cd backend/ && \
    sudo service postgresql start && \
    source .venv/bin/activate && \
    python3 manage.py test
