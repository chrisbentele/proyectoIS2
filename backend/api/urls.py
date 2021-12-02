"""controller URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from .views import (
    proyectos,
    registro_horas,
    reporte_US_Prioridad,
    reporte_product_backlog,
    reporte_sprint_backlog,
    roles,
    sprints,
    sprints_activar,
    sprints_desactivar,
    sprints_miembros,
    sprints_user_stories,
    user_stories,
    proyectos_miembros_roles,
    user_stories_asignar,
    user_stories_estimar,
    usuarios,
    proyectos_miembros,
    usuarios_admin,
    usuarios_proyectos,
)

apiPaths = [
    path("proyectos", proyectos),
    path("proyectos/<str:proyect_id>", proyectos),
    path("proyectos/<str:proyect_id>/miembros", proyectos_miembros),
    path("proyectos/<str:proyect_id>/miembros/<str:user_id>", proyectos_miembros),
    # User Stories
    path("proyectos/<str:proyect_id>/user_stories", user_stories),
    path("proyectos/<str:proyect_id>/user_stories/<str:us_id>", user_stories),
    path(
        "proyectos/<str:proyect_id>/user_stories/<str:us_id>/asignar/<str:user_id>",
        user_stories_asignar,
    ),
    path(
        "proyectos/<str:proyect_id>/user_stories/<str:us_id>/asignar",
        user_stories_asignar,
    ),
    path(
        "proyectos/<str:proyect_id>/user_stories/<str:us_id>/estimar",
        user_stories_estimar,
    ),
    # Registro horas
    path(
        "proyectos/<str:proyect_id>/sprints/<str:sprint_id>/user_stories/<str:us_id>/registro_horas",
        registro_horas,
    ),
    path(
        "proyectos/<str:proyect_id>/sprints/<str:sprint_id>/registro_horas",
        registro_horas,
    ),
    # Reportes
    path(
        "proyectos/<str:proyect_id>/reporte_product_backlog",
        reporte_product_backlog,
    ),
    path(
        "proyectos/<str:proyect_id>/sprints/<str:sprint_id>/reporte_sprint_backlog",
        reporte_sprint_backlog,
    ),
    path(
        "proyectos/<str:proyect_id>/sprints/<str:sprint_id>/reporte_US_Prioridad",
        reporte_US_Prioridad,
    ),
    # Sprints
    path("proyectos/<str:proyect_id>/sprints", sprints),
    path(
        "proyectos/<str:proyect_id>/sprints/<str:sprint_id>/miembros",
        sprints_miembros,
    ),
    path("proyectos/<str:proyect_id>/sprints/<str:sprint_id>", sprints),
    path(
        "proyectos/<str:proyect_id>/sprints/<str:sprint_id>/user_stories",
        sprints_user_stories,
    ),
    path(
        "proyectos/<str:proyect_id>/sprints/<str:sprint_id>/user_stories/<str:us_id>",
        sprints_user_stories,
    ),
    path("proyectos/<str:proyect_id>/sprints/<str:sprint_id>/activar", sprints_activar),
    path(
        "proyectos/<str:proyect_id>/sprints/<str:sprint_id>/desactivar",
        sprints_desactivar,
    ),
    # Usuarios
    path("usuarios", usuarios),
    path("usuarios/<str:user_id>", usuarios),
    path("usuarios/<str:user_id>/setAdmin", usuarios_admin),
    path("usuarios/<str:user_id>/proyectos", usuarios_proyectos),
    # Roles
    path("proyectos/<str:proyect_id>/roles", roles),
    path("proyectos/<str:proyect_id>/roles/<str:rol_id>", roles),
    path(
        "proyectos/<str:proyect_id>/miembros/<str:user_id>/roles",
        proyectos_miembros_roles,
    ),
    path(
        "proyectos/<str:proyect_id>/miembros/<str:user_id>/roles/<str:rol_id>",
        proyectos_miembros_roles,
    ),
]

urlpatterns = [path("api/", include(apiPaths))]
