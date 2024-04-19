# import numpy as np
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.preprocessing import OneHotEncoder
# import joblib

# def train_models():
#     # *Waiting* Get data from database
#     # df = pd.read_csv('data.csv')
#     data = {
#     'PreparationTime': [40, 30, 25, 30, 25, 15, 28],
#     'TravelTime': [10, 7, 5, 7, 9, 5, 9],
#     'DesiredArrivingTime': ['11:55', '8:51', '9:19', '11:03', '12:50','8:56', '15:59']
# }

#     df = pd.DataFrame(data)

#     # Convert ArrivingTime to minutes since midnight
#     df['ArrivingTime'] = pd.to_datetime(df['ArrivingTime']).dt.hour * 60 + pd.to_datetime(df['ArrivingTime']).dt.minute

#     # Encoding transportation mode
#     encoder = OneHotEncoder(sparse=False)
#     transportation_modes = ['Car', 'Motorcycle', 'Bus', 'Metro', 'Walk']
#     transport_mode_encoded = encoder.fit_transform(df[['TransportationMode']])
#     transport_mode_encoded_df = pd.DataFrame(transport_mode_encoded, columns=encoder.get_feature_names_out(['TransportationMode']))

#     # Concatenate encoded transportation mode with the original DataFrame
#     df_encoded = pd.concat([df, transport_mode_encoded_df], axis=1)

#     # Features and target variable
#     X = df_encoded[['ArrivingTime'] + list(transport_mode_encoded_df.columns)]  # Include encoded transportation mode as features
#     y_prep = df_encoded['PreparationTime']
#     y_travel = df_encoded['TravelTime']

#     # Splitting data into training and testing sets
#     X_train_prep, X_test_prep, y_train_prep, y_test_prep = train_test_split(X, y_prep, test_size = 0.2, random_state=42,)
#     X_train_travel, X_test_travel, y_train_travel, y_test_travel = train_test_split(X, y_travel, test_size=0.2, random_state=42)

#     # Model training for preparation time
#     model_prep = RandomForestRegressor(random_state=42)  # Adjust parameters
#     model_prep.fit(X_train_prep, y_train_prep)
#     joblib.dump(model_prep, 'preparation_model.pkl')

#     # Model training for travel time
#     model_travel = RandomForestRegressor(random_state=42)  # Adjust parameters
#     model_travel.fit(X_train_travel, y_train_travel)
#     joblib.dump(model_travel, 'travel_model.pkl')

# def predict_times(arriving_time, transportation_mode):
#     # Load the trained models
#     model_prep = joblib.load('preparation_model.pkl')
#     model_travel = joblib.load('travel_model.pkl')

#     arriving_time = pd.to_datetime(arriving_time).hour * 60 + pd.to_datetime(arriving_time).minute

#     # Encode transportation mode input
#     encoder = OneHotEncoder(sparse=False)
#     transport_mode_encoded_input = encoder.fit_transform([[transportation_mode]])
#     transport_mode_encoded_input_df = pd.DataFrame(transport_mode_encoded_input, columns=encoder.get_feature_names_out(['TransportationMode']), index=[0])

#     # Combine arriving time and encoded transportation mode input
#     input_data = np.hstack([arriving_time] + transport_mode_encoded_input_df.values.tolist())

#     # Prediction for preparation time and travel time
#     predicted_preparation_time = model_prep.predict([input_data])[0]
#     predicted_travel_time = model_travel.predict([input_data])[0]

#     # Calculate wake-up time
#     predicted_wake_up_time = arriving_time - predicted_preparation_time - predicted_travel_time
#     if predicted_wake_up_time >= arriving_time:
#         predicted_wake_up_time -= 1440  # Subtract1 24 hours in minutes
#     # Calculate predicted departure time
#     predicted_departure_time = arriving_time - predicted_travel_time 

#     return predicted_wake_up_time, predicted_departure_time

# if __name__ == "__main__":
#     train_models()  # Train the models when running ml_model.py directly

import os
import pickle
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from sklearn.ensemble import RandomForestRegressor
import pandas as pd

class MLModel(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def train_models(self):
        # Define your model training code here
        data = {
            'PreparationTime': [40, 30, 25, 30, 25, 15, 28],
            'TravelTime': [10, 7, 5, 7, 9, 5, 9],
            'DesiredArrivingTime': ['11:55', '8:51', '9:19', '11:03', '12:50', '8:56', '15:59']
        }

        df = pd.DataFrame(data)

        # Convert DesiredArrivingTime to minutes since midnight
        df['DesiredArrivingTime'] = pd.to_datetime(df['DesiredArrivingTime']).dt.hour * 60 + pd.to_datetime(df['DesiredArrivingTime']).dt.minute

        # Features and target variable
        X = df[['DesiredArrivingTime']]
        y_prep = df['PreparationTime']
        y_travel = df['TravelTime']

        # Model training for preparation time
        self.model_prep = RandomForestRegressor(random_state=42)
        self.model_prep.fit(X, y_prep)

        # Model training for travel time
        self.model_travel = RandomForestRegressor(random_state=42)
        self.model_travel.fit(X, y_travel)

        # Save the trained models using pickle
        pickle.dump(self.model_prep, open(os.path.normpath('preparation_model.pkl'), 'wb'))
        pickle.dump(self.model_travel, open(os.path.normpath('travel_model.pkl'), 'wb'))

    def predict_times(self, arriving_time):
        # Load the trained models
        base_dir = os.path.dirname(os.path.abspath(__file__))  # Get the directory of ml_model.py
        prep_model_path = os.path.join(base_dir, 'preparation_model.pkl')
        print("Model file path:", prep_model_path)  # Print the absolute path

        if not os.path.exists(prep_model_path):
            return {'error': 'Model file not found'}

        self.model_prep = pickle.load(open(prep_model_path, 'rb'))

        # Convert arriving_time to minutes since midnight
        arriving_time = pd.to_datetime(arriving_time).hour * 60 + pd.to_datetime(arriving_time).minute

        # Prediction for preparation time
        predicted_preparation_time = self.model_prep.predict([[arriving_time]])[0]

        # Calculate wake-up time
        predicted_wake_up_time = arriving_time - predicted_preparation_time
        if predicted_wake_up_time >= arriving_time:
            predicted_wake_up_time -= 1440  # Subtract 24 hours in minutes

        return {'predicted_wake_up_time': predicted_wake_up_time}



    def post(self, request):
        # Train the models when the API is called
        self.train_models()

        # Return success message
        return JsonResponse({'response': 'Models trained successfully'}, status=200)

    def get(self, request):
        # Extract arriving_time from request data
        arriving_time = request.GET.get('arriving_time')

        # Make prediction
        prediction_data = self.predict_times(arriving_time)

        # Return prediction result
        return JsonResponse(prediction_data, status=200)