from django.urls import path
from .views import Insurance_Model_Predict
urlpatterns = [
    path('predict/', Insurance_Model_Predict.as_view(), name='predict'),
]
