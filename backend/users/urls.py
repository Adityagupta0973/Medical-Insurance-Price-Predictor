from django.urls import path, include

from users.views import APILoginView, APILogoutView, APIPasswordUpdateView
# create_temp_user  
urlpatterns = [
    path('login/', APILoginView.as_view(), name='api_login'),
    path('logout/', APILogoutView.as_view(), name='api_logout'),
    path('update_password/', APIPasswordUpdateView.as_view(), name='api_update_password'),
    # path('create-user/', create_temp_user)
]