#!/usr/bin/env bash
source BioBLESS/bin/activate
cd backend
sudo python manage.py runserver 0.0.0.0:80
