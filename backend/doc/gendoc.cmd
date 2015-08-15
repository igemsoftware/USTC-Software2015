rd /s /q ..\source
rd /s /q ..\build
del /q ..\make.bat
del /q ..\Makefile
path %path%;E:\python27\scripts
sphinx-quickstart .. --sep --dot=_ --project=BioBLESS --author="USTC 2015" -v 0.3.6 --release=0.3.6 --language=en --ext-autodoc  --ext-doctest --ext-viewcode --ext-mathjax --ext-coverage --makefile --batchfile --use-make-mode
sphinx-apidoc -o ..\source ..
cd ..\source
echo sys.path.insert(0, os.path.abspath('..')) >> conf.py
echo sys.path.insert(0, os.path.abspath('..\\backend')) >> conf.py
echo sys.path.insert(0, os.path.abspath('..\\backend\\BioBLESS')) >> conf.py
cd ..
make html
pause
