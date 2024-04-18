from rest_framework.response import Response
from .ml_model import predict_times
from rest_framework.views import APIView, status

# class MLView(APIView):
#     def post(self, request):
#         arriving_time = request.data['arriving_time']
#         transportation_mode = request.data['transportation_mode']

#         wake_up_time, departure_time = predict_times(arriving_time, transportation_mode)

#         return Response({
#             'wake_up_time': wake_up_time,
#             'departure_time': departure_time
#         })
def predict_times_view(request):
    if request.method == 'POST':
        arriving_time = request.POST.get('arriving_time')
        transportation_mode = request.POST.get('transportation_mode')

        wake_up_time, departure_time = predict_times(arriving_time, transportation_mode)

        return Response({
            'wake_up_time': wake_up_time,
            'departure_time': departure_time
        })