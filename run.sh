#!/usr/bin/env bash
source BioBLESS/bin/activate
cd backend
python manage.py runserver 0.0.0.0:8000
