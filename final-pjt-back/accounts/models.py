from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from api.models import Genre
# Create your models here.
class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, login_id, username, password, **kwargs):
        if not username:
            raise ValueError('Users must have an username.')

        user = self.model(
            login_id=login_id,
            username=username,
        )
               
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, login_id=None, username=None, password=None, **extra_fields):
        superuser = self.create_user(
            login_id=login_id,
            username=username,
            password=password,
        )
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True
        superuser.save(using=self._db)
        return superuser


class User(AbstractBaseUser, PermissionsMixin):
    login_id = models.CharField(max_length=30, unique=True, null=False, blank=False)
    username = models.CharField(max_length=30, unique=True, null=False, blank=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    followings = models.ManyToManyField('self',symmetrical=False,related_name='followers', blank=True)
    like_genres = models.ManyToManyField(Genre, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'login_id'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'user'