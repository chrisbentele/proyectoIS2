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
from .views import proyecto, roles, roles_asign, usuario

apiPaths = [
    path("proyecto", proyecto),
    path("proyecto/<str:id>", proyecto),
    path("usuario", usuario),
    path("roles/<str:proyect_id>", roles),
    path("roles_asign", roles_asign),
]

urlpatterns = [path("api/", include(apiPaths))]
