from django.apps import AppConfig
import pandas as pd
from joblib import load
import os

class PredictionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'prediction'
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    CLASSIFIER_FOLDER = os.path.join(BASE_DIR, 'prediction/mlmodel/')
    CLASSIFIER_FILE = os.path.join(CLASSIFIER_FOLDER, "insuranceModel.joblib")
    classifier = load(CLASSIFIER_FILE)