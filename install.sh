cd backend/ && \
    sudo apt update && \
    sudo apt install python3-pip python3-venv postgresql libpq-dev -y && \
    mkdir .venv && \
    python3 -m venv .venv && \
    source .venv/bin/activate && \
    python3 -m pip install -r requirements.txt && \
    ./crear_db.sh && \
    python3 manage.py migrate --run-syncdb && \
cd ../frontend/ && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
    sudo apt-get install -y nodejs && \
    sudo npm install --global yarn && \
    yarn install