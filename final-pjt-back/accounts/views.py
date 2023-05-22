import jwt
from rest_framework.views import APIView
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate

from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import authentication_classes, permission_classes

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # jwt token 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "register successs",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            #쿠키에 넣어주기
            
            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthAPIView(APIView):
    # 로그인
    def post(self, request):
        user = authenticate(
            login_id=request.data.get("login_id"), password=request.data.get("password")
        )
        if user is not None:
            serializer = UserSerializer(user)
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            res.set_cookie('access', access_token, httponly=True)
            res.set_cookie('refresh', refresh_token, httponly=True)
            return res
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # 로그아웃
    def delete(self, request):
        # 쿠키에 저장된 토큰 삭제 => 로그아웃 처리
        res = Response({
            "message": "logout success"
            }, status=status.HTTP_202_ACCEPTED)
        res.delete_cookie("access")
        res.delete_cookie("refresh")
        return res
    


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def profile(request, user_pk):
    user = get_user_model().objects.get(pk=user_pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def follow(request, user_pk):
    person = get_user_model().objects.get(pk=user_pk)
    if request.user != pesrson :
        if request.user in person.followers.all():
            person.followers.remove(request.user)
            return Response({'detail': '팔로우 취소'})
        else:
            person.followers.add(request.user)
            return Response({'detail': '팔로우 완료'})
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def userinfo(request):
    users = get_user_model().objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def getuser(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)