gcc -c simulate.c -std=c99 -fPIC -o simulate.o
gcc simulate.o -shared -o simulate.so
./test_system.py
