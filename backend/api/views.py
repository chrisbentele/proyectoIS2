from django.http.response import JsonResponse

# Create your views here.
def proyecto(request):
    if request.method == "GET":
        return JsonResponse({"hola": "mundo"})
