# Backend test script
cd backend/ && \
    sudo apt update && \
    sudo apt install python3-pip python3-venv postgresql libpq-dev -y && \
    mkdir .venv && \
    python3 -m venv .venv && \
    source .venv/bin/activate && \
    python3 -m pip install -r requirements.txt && \
    ./crear_db.sh && \
    python3 manage.py migrate --run-syncdb && \
    python3 manage.py test
