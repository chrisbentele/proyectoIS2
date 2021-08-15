from django.http.response import JsonResponse

# Create your views here.
def proyecto(request, id=None):
    if request.method == "GET":
        if id == None:
            return JsonResponse({"hola": "mundo"})
        else:
            return JsonResponse({"hola": id})
