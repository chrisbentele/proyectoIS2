##
# @file apps.py
# @brief Define una aplicación reutlizable de Django, en este proyecto es utilizado
# para definir la API.
from django.apps import AppConfig
##
# @namespace api.apps
# Define una aplicación reutlizable de Django, en este proyecto es utilizado
# para definir la API.

##
# Clase de la API en Django.
# @param AppConfig Clase que representa un aplicación de Django y sus
# configuraciones.
class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
