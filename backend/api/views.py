import json
from django.db.models.fields import EmailField
import django.db.utils
from api.models import Usuario
from django.http.response import (
    HttpResponseBadRequest,
    HttpResponseNotFound,
    HttpResponseNotModified,
    JsonResponse,
)

# Create your views here.
def proyecto(request, id=None):
    if request.method == "GET":
        if id == None:
            return JsonResponse({"hola": "mundo"})
        else:
            return JsonResponse({"hola": id})


def usuario(request):
    if request.method == "POST":
        request_json = json.loads(request.body)
        print(request_json)
        if request_json.get("nombre") == None or request_json.get("email") == None:
            return HttpResponseBadRequest()

        try:
            u = Usuario(nombre=request_json["nombre"], email=request_json["email"])
            u.save()
        except django.db.utils.IntegrityError:  # probablemente agarre otros errores
            return HttpResponseNotModified()  # ya existe el user
        print(u.email)
        JsonResponse({"usuario": u.email})

    elif request.method == "GET":
        print((request.body))
        print(json.loads(request.body))
        request_json = json.loads(request.body)
        try:
            print(Usuario.objects.get(email=request_json["email"]))
            return JsonResponse(
                {"usuario": Usuario.objects.get(email=request_json["email"])}
            )
        except Usuario.DoesNotExist:
            return HttpResponseNotFound()
