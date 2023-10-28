from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('lobby/', views.lobby),
    path("detail/<str:room_name>/", views.room, name="room"),
]
