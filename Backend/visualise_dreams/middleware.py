# from django.shortcuts import redirect

# class RedirectToRootMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response
#         self.exclude_prefixes = ['/admin/', '/reset_password/', '/reset_password_sent/', "/reset/<uidb64>/<token>/", "/reset_password_complete/", "/theBoss/", "/api/"]  # Add your exclude prefixes here

#     def __call__(self, request):
#         # Check if the request path is not the root path and does not start with any exclude_prefix
#         if request.path != '/' and not any(request.path.startswith(prefix) for prefix in self.exclude_prefixes):
#             # Redirect the request to the root path
#             return redirect('/')
        
#         return self.get_response(request)
