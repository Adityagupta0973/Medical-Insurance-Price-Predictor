from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .apps import PredictionConfig
import pandas as pd

# Class based view to predict based on IRIS model
class Insurance_Model_Predict(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        data = request.data
        new_data = pd.DataFrame([data])  
        new_data['smoker'] = new_data['smoker'].map({'yes': 1, 'no': 0})
        new_data = new_data.drop(columns=['sex', 'region'], errors='ignore')
        loaded_classifier = PredictionConfig.classifier 
        prediction = loaded_classifier.predict(new_data)[0]
        return Response({"Predicted Insurance Cost ($)": round(float(prediction), 2)}, status=200)