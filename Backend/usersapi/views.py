from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

# Create your views here.
class Test(APIView):
    def get(self, request):
        return Response({"mess": "Hello"})
    



@api_view(['GET'])
def test(request):
    return Response({"mess": "Hello"})