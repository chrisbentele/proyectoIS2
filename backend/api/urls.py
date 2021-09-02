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
import json
import os 
import requests
from django.urls import path, include
from .views import proyecto

apiPaths = [path("proyecto/", proyecto), path("proyecto/<str:id>", proyecto)]

urlpatterns = [path("api/", include(apiPaths))]

def syncUsers():
    headers = {'authorization':"Bearer {}".format(os.environ['TOKEN'])}
    res = requests.get('https://dev-bg7tosd2.us.auth0.com/api/v2/users?include_totals=true&include_fields=false', headers=headers)
    print(json.loads(res.text))

syncUsers()