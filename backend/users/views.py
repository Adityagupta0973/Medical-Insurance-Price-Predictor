from dj_rest_auth.views import LogoutView, LoginView, PasswordChangeView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Get the user's token and delete it
            Token.objects.filter(user=request.user).delete()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class APILoginView(LoginView):
    pass

class APIPasswordUpdateView(PasswordChangeView):
    authentication_classes = [TokenAuthentication]

# from django.contrib.auth.models import User
# from django.http import JsonResponse

# def create_temp_user(request):
#     if request.method == "GET":
#         if not User.objects.filter(username="User1").exists():
#             User.objects.create_user(username="User1", password="testing321")
#             return JsonResponse({"status": "✅ User 'User1' created with password 'testing321'"})
#         else:
#             return JsonResponse({"status": "ℹ️ User 'User1' already exists"})
#     else:
#         return JsonResponse({"error": "Only GET method allowed"}, status=405)
