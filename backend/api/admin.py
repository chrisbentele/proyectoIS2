from django.contrib import admin
from .models import (
    RegistroHoras,
    Usuario,
    Proyecto,
    Retrospectiva,
    Sprint,
    US,
    USAsignada,
    Comentario,
    Rol,
    RolAsignado,
)

##
# @file admin.py
# @brief Se registran los componentes del panel de admin de Django.
# @code{.py}
# admin.site.register(Usuario)
# admin.site.register(Proyecto)
# admin.site.register(Retrospectiva)
# admin.site.register(Sprint)
# admin.site.register(US)
# admin.site.register(USAsignada)
# admin.site.register(Comentario)
# admin.site.register(Rol)
# admin.site.register(RolAsignado)
# @endcode

##
# @namespace api.admin
# @brief Se registran los componentes del panel de admin de Django.
# @code{.py}
# admin.site.register(Usuario)
# admin.site.register(Proyecto)
# admin.site.register(Retrospectiva)
# admin.site.register(Sprint)
# admin.site.register(US)
# admin.site.register(USAsignada)
# admin.site.register(Comentario)
# admin.site.register(Rol)
# admin.site.register(RolAsignado)
# @endcode

admin.site.register(Usuario)
admin.site.register(Proyecto)
admin.site.register(Retrospectiva)
admin.site.register(Sprint)
admin.site.register(US)
admin.site.register(USAsignada)
admin.site.register(Comentario)
admin.site.register(Rol)
admin.site.register(RolAsignado)
admin.site.register(RegistroHoras)
