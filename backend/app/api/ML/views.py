# from rest_framework.response import Response
# from .ml_model import predict_times
# from rest_framework.views import APIView

# class MLView(APIView) :
#     def get(self, request):
#         if request.method == 'POST':
#             arriving_time = request.data.get('arriving_time')
#             transportation_mode = request.data.get('transportation_mode')

#             wake_up_time, departure_time = predict_times(arriving_time, transportation_mode)

#             # print('wake_up_time: ' + wake_up_time)
#             # print('departure_time:' + departure_time)
#             return Response({
#                 'wake_up_time': wake_up_time,
#                 'departure_time': departure_time
#             })

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status  # Import status codes
from .ml_model import predict_times

class MLView(APIView):
    def get(self, request):
        # Handle GET requests here
        return Response({"message": "GET request received. Please use POST method."})

    def post(self, request):
        if request.method == 'POST':
            arriving_time = request.data.get('arriving_time')
            # transportation_mode = request.data.get('transportation_mode')

            # if arriving_time is None or transportation_mode is None:
            #     # Return a bad request response if necessary data is missing
            #     return Response({"error": "Missing required data."}, status=status.HTTP_400_BAD_REQUEST)

            # wake_up_time, departure_time = predict_times(arriving_time, transportation_mode)
            wake_up_time, departure_time = predict_times(arriving_time)

            # Return the predicted times
            return Response({
                'wake_up_time': wake_up_time,
                'departure_time': departure_time
            })

        # Return a method not allowed response if request method is not POST
        return Response({"error": "Method Not Allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# from django.http import JsonResponse
# from django.views.decorators.http import require_POST
# from rest_framework.views import APIView
# from .ml_model import train_and_predict

# class MLView(APIView):
#     @staticmethod
#     @require_POST
#     def predict_times(request):
#         if request.method == 'GET':
#             return JsonResponse({'error': 'Method Not Allowed'}, status=405)
        
#         arriving_time = request.data.get('arriving_time')
#         transportation_mode = request.data.get('transportation_mode')
        
#         if arriving_time and transportation_mode:
#             predicted_wake_up_time, predicted_departure_time = train_and_predict(arriving_time, transportation_mode)
#             return JsonResponse({
#                 'predicted_wake_up_time': predicted_wake_up_time,
#                 'predicted_departure_time': predicted_departure_time
#             })
#         else:
#             return JsonResponse({'error': 'Missing parameters'}, status=400)
