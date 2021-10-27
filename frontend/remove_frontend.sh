#!/bin/bash
if [[ "$(docker ps -a | grep frontend)" ]]; then #checking if container exists
  if [[ "$(docker ps | grep frontend)" ]]; then #checking if container is running
    echo "El contenedor está corriendo, intentando detenerlo"
    docker kill frontend
  fi
  echo "Intentando borrar el contenedor"
  docker rm -f frontend
else
  echo "No se encontró el contenedor en la lista de contenedores"
fi