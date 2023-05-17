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
    password = request.data.get('password')
    