from django.shortcuts import render

def index(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        client_ip = x_forwarded_for.split(',')[0]
    else:
        client_ip = request.META['REMOTE_ADDR']
    context = {'client_ip': client_ip}
    return render(request, 'home/index.html', context)

