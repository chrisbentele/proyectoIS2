FROM python:3.8.3-alpine

WORKDIR /app
ADD ./backend/requirements.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
#RUN pip install -r backend/requirements.txt
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev libffi-dev && \
 python3 -m pip install -r backend/requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

ADD ./backend /app/backend
ADD ./docker /app/docker
