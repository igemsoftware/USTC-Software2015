#!/usr/bin/env bash
rm *.pyc
rm *.o
rm *.so
gcc -c simulate.c -std=c99 -fPIC -O0 -o simulate.o
gcc simulate.o -shared -o simulate.so
./test_system.py
