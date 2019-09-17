from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from .models import User
from .serializers import UserSerializer, UserSerializerWithToken

# class UserList(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserCreate(generics.CreateAPIView):
#     serializer_class = UserSerializer
    # def post(self, request, *args, **kwargs):
    #     email = request.data.get('email', '')
    #     password = request.data.get('password', '')
    #     first_name = request.data.get('first_name', '')
    #     last_name = request.data.get('last_name', '')
    #     if (not email or not password or
    #         not first_name or not last_name):
    #         return Response({
    #             data: 'user not created',
    #         }, status=status.HTTP_400_BAD_REQUEST)
    #     new_user = User.objects.create_user(
    #         email=email,
    #         password=password,
    #         first_name=first_name,
    #         last_name=last_name
    #     )
    #     return Response(status=status.HTTP_201_CREATED)

    # def post(self, request, *args, **kwargs):
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         # new_user = User.objects.create_user(
    #         #     email=request.data.email,
    #         #     password=request.data.password,
    #         #     first_name=request.data.first_name,
    #         #     last_name=request.data.last_name
    #         # )
    #         serializer.save()
    #         return Response(
    #             serializer.data,
    #             status=status.HTTP_201_CREATED
    #         )
    #     return Response(
    #         serializer.errors,
    #         status=status.HTTP_400_BAD_REQUEST
    #     )

class UserCreate(APIView):
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )