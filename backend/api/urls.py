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
    roles,
    usuarios_proyectos_roles,
    usuarios,
    proyectos_miembros,
    usuarios_proyectos,
)

apiPaths = [
    path("proyectos", proyectos),
    path("proyectos/<str:proyect_id>", proyectos),
    path("proyectos/<str:proyect_id>/miembros", proyectos_miembros),
    path("proyectos/<str:proyect_id>/miembros/<str:user_id>", proyectos_miembros),
    path("usuarios", usuarios),
    path("usuarios/<str:user_id>", usuarios),
    path("usuarios/<str:user_id>/proyectos", usuarios_proyectos),
    path("proyectos/<str:proyect_id>/roles", roles),
    path("proyectos/<str:proyect_id>/roles/<str:rol_id>", roles),
    path(
        "proyectos/<str:proyect_id>/miembros/<str:user_id>/roles",
        usuarios_proyectos_roles,
    ),
    path(
        "proyectos/<str:proyect_id>/miembros/<str:user_id>/roles/<str:rol_id>",
        usuarios_proyectos_roles,
    ),
]

urlpatterns = [path("api/", include(apiPaths))]
