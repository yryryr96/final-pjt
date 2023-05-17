from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, UserFollowSerializer
from django.contrib.auth import get_user_model
from .models import User
# Create your views here.

@api_view(['POST'])
def signup(request):
    password1 = request.data.get('password1')
    password2 = request.data.get('password2')
    username = request.data.get('username')
    if password1 != password2 :
        return Response({'error' : '비밀번호가 일치하지 않습니다. 다시 입력해주세요.'}, status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True) :
        user = serializer.save()
        user.set_password(request.data.get('password1'))
        user.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)