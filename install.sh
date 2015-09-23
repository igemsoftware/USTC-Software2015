#!/usr/bin/env bash
virtualenv BioBLESS
source BioBLESS/bin/activate
cd backend
pip install -r requirements.txt
cd BioBLESS/biocircuit
make
python biogate_gen.py
cd ../..
python manage.py migrate
python manage.py loaddata parts
