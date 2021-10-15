# Backend test script
cd backend/ && \
    sudo service postgresql start && \
    source .venv/bin/activate && \
    python3 manage.py test
