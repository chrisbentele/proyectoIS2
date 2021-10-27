from django.contrib import admin
from .models import Usuario, Proyecto, Retrospectiva, Sprint, US, USAsignada, Comentario, Rol, RolAsignado

# Register your models here.
class AuthorAdmin(admin.ModelAdmin):
    pass
admin.site.register(Usuario, AuthorAdmin)
admin.site.register(Proyecto, AuthorAdmin)
admin.site.register(Retrospectiva, AuthorAdmin)
admin.site.register(Sprint, AuthorAdmin)
admin.site.register(US, AuthorAdmin)
admin.site.register(USAsignada, AuthorAdmin)
admin.site.register(Comentario, AuthorAdmin)
admin.site.register(Rol, AuthorAdmin)
admin.site.register(RolAsignado, AuthorAdmin)