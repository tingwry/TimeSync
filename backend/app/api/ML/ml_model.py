# import numpy as np
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.preprocessing import OneHotEncoder
# import os
# import pickle


# def train_models():
#     # *Waiting* Get data from database
#     df = pd.DataFrame({
#         'PreparationTime': [40, 30, 25, 30, 25, 15, 28],
#         'TravelTime': [10, 7, 5, 7, 9, 5, 9],
#         'ArrivingTime': ['11:55', '8:51', '9:19', '11:03', '12:50','8:56', '15:59'],
#         'TransportationMode': ['Car', 'Motorcycle', 'Bus', 'Metro', 'Walk', 'Bus', 'Car']
#     })

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
#     with open('prep_model.pkl', 'wb') as travel_file:
#         pickle.dump(model_travel, travel_file)
    
#     # Model training for travel time
#     model_travel = RandomForestRegressor(random_state=42)  # Adjust parameters
#     model_travel.fit(X_train_travel, y_train_travel)
#     with open('travel_model.pkl', 'wb') as travel_file:
#         pickle.dump(model_travel, travel_file)

# def predict_times(arriving_time, transportation_mode):
#     # Load the trained models
#     with open('preparation_model.pkl', 'rb') as prep_file:
#         model_prep = pickle.load(prep_file)

#     with open('travel_model.pkl', 'rb') as travel_file:
#         model_travel = pickle.load(travel_file)

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

# import numpy as np
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.preprocessing import OneHotEncoder

# def predict_times(arriving_time, transportation_mode):
#     # Define your dataset
#     df = pd.DataFrame({
#     'PreparationTime': [40, 30, 25, 30, 25, 15, 28],
#     'TravelTime': [10, 7, 5, 7, 9, 5, 9],
#     'ArrivingTime': ['11:55', '8:51', '9:19', '11:03', '12:50','8:56', '15:59'],
#     'TransportationMode': ['Car', 'Motorcycle', 'Bus', 'Metro', 'Walk', 'Bus', 'Car']
# })

#     # Convert ArrivingTime to minutes since midnight
#     df['ArrivingTime'] = pd.to_datetime(df['ArrivingTime']).dt.hour * 60 + pd.to_datetime(df['ArrivingTime']).dt.minute

#     # Encoding transportation mode
#     encoder = OneHotEncoder()
#     transport_mode_encoded = encoder.fit_transform(df[['TransportationMode']])
#     transport_mode_encoded_df = pd.DataFrame(transport_mode_encoded, columns=encoder.get_feature_names_out(['TransportationMode']))

#     # Concatenate encoded transportation mode with the original DataFrame
#     df_encoded = pd.concat([df, transport_mode_encoded_df], axis=1)

#     # Features and target variables
#     X = df_encoded[['ArrivingTime'] + list(transport_mode_encoded_df.columns)]  # Include encoded transportation mode as features
#     y_prep = df_encoded['PreparationTime']
#     y_travel = df_encoded['TravelTime']

#     # Model training
#     model_prep = RandomForestRegressor(random_state=42)  # Adjust parameters
#     model_prep.fit(X, y_prep)

#     model_travel = RandomForestRegressor(random_state=42)  # Adjust parameters
#     model_travel.fit(X, y_travel)

#     arriving_time = pd.to_datetime(arriving_time).hour * 60 + pd.to_datetime(arriving_time).minute

#     # Encode transportation mode input
#     transport_mode_encoded_input = encoder.transform([[transportation_mode]])
#     transport_mode_encoded_input_df = pd.DataFrame(transport_mode_encoded_input, columns=encoder.get_feature_names_out(['TransportationMode']), index=[0])

#     # Combine arriving time and encoded transportation mode input
#     input_data = np.hstack([arriving_time] + transport_mode_encoded_input_df.values.tolist())

#     # Prediction for preparation time and travel time
#     predicted_preparation_time = model_prep.predict([input_data])[0]
#     predicted_travel_time = model_travel.predict([input_data])[0]

#     # Calculate wake-up time
#     predicted_wake_up_time = arriving_time - predicted_preparation_time - predicted_travel_time
#     if predicted_wake_up_time >= arriving_time:
#         predicted_wake_up_time -= 1440  # Subtract 24 hours in minutes
#     # Calculate predicted departure time
#     predicted_departure_time = arriving_time - predicted_travel_time 

#     return predicted_wake_up_time, predicted_departure_time

# if __name__ == "__main__":
#     predict_times()


import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

def predict_times(arriving_time):
    # Define your dataset
    df = pd.DataFrame({
        'PreparationTime': [40, 30, 25, 30, 25, 15, 28],
        'TravelTime': [10, 7, 5, 7, 9, 5, 9],
        'ArrivingTime': ['11:55', '8:51', '9:19', '11:03', '12:50','8:56', '15:59']
    })

    # Convert ArrivingTime to minutes since midnight
    df['ArrivingTime'] = pd.to_datetime(df['ArrivingTime']).dt.hour * 60 + pd.to_datetime(df['ArrivingTime']).dt.minute

    # Features and target variables
    X = df[['ArrivingTime']]
    y_prep = df['PreparationTime']
    y_travel = df['TravelTime']

    # Model training
    model_prep = RandomForestRegressor(random_state=42)  # Adjust parameters
    model_prep.fit(X, y_prep)

    model_travel = RandomForestRegressor(random_state=42)  # Adjust parameters
    model_travel.fit(X, y_travel)

    arriving_time = pd.to_datetime(arriving_time).hour * 60 + pd.to_datetime(arriving_time).minute

    # Prediction for preparation time and travel time
    predicted_preparation_time = model_prep.predict([[arriving_time]])[0]
    predicted_travel_time = model_travel.predict([[arriving_time]])[0]

    # Calculate wake-up time
    predicted_wake_up_time = arriving_time - predicted_preparation_time - predicted_travel_time
    if predicted_wake_up_time >= arriving_time:
        predicted_wake_up_time -= 1440  # Subtract 24 hours in minutes
    
    predicted_wake_up_hours = int(predicted_wake_up_time // 60)
    predicted_wake_up_minutes = int(predicted_wake_up_time % 60)
    formatted_predicted_wake_up_time = '{:02d}:{:02d}'.format(predicted_wake_up_hours, predicted_wake_up_minutes)

    # Calculate predicted departure time
    predicted_departure_time = arriving_time - predicted_travel_time 
    predicted_departure_hours = int(predicted_departure_time // 60)
    predicted_departure_minutes = int(predicted_departure_time % 60)
    formatted_predicted_departure_time = '{:02d}:{:02d}'.format(predicted_departure_hours, predicted_departure_minutes)


    return formatted_predicted_wake_up_time, formatted_predicted_departure_time

if __name__ == "__main__":
    predict_times()
