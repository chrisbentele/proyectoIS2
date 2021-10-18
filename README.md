![Docs status](https://github.com/grupoCannonIS2/proyectoIS2/actions/workflows/main-docs.yml/badge.svg)

![Tests status](https://github.com/grupoCannonIS2/proyectoIS2/actions/workflows/main.yml/badge.svg)

# Bienvenido a System.A.

Para poder utilizar el sistema, siga los siguientes pasos 👇

## Requerimientos
El software ha sido probado en Ubuntu 20.04
## Instalación
Primeramente se deben instalar las dependencias del proyecto, para ello primeramente clone con el comando:

`$ git clone https://github.com/chrisbentele/proyectoIS2.git`

Una vez clonado el repositorio, ejecute el siguiente comando para instalar las dependencias:

`$ cd proyecto`

`$ ./install.sh`

## Uso
Una vez instaladas las dependencias proceda a ejecutar en dos terminales separadas los siguiente scripts

`$ ./backend.sh`

Y luego

`$ ./frontend.sh`

En este momento la página debería desplegarse, o puede acceder a ella en http://localhost:3000

## Troubleshooting

Si tiene algún problema con la base de datos, puede ejecutar el script `$ ./backend/cread_db.sh`, este script creará una base de datos nueva.
