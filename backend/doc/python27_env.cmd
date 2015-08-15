path %path%;E:\python27\scripts
sphinx-quickstart .. --sep --dot=_ --project=BioBLESS --author="USTC 2015" -v 0.3.6 --release=0.3.6 --language=en --ext-autodoc  --ext-doctest --ext-viewcode --ext-mathjax --ext-coverage --makefile --batchfile --use-make-mode
sphinx-apidoc -o ..\source ..

cmd
