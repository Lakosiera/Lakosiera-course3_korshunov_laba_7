from django.shortcuts import render
from django.http import HttpResponse

# пример простейшей вьющки
def hello_world(request):
    # простейший вывод html страницы
    return HttpResponse("Hello, world!")