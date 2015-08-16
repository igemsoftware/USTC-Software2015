[![Build Status](https://magnum.travis-ci.com/ustc2015/igem.svg?token=mKX17GB5mm6v1kppSB7o&branch=master)](https://magnum.travis-ci.com/ustc2015/igem)

# BioBLESS - iGEM USTC Software 2015

## Structure of the project
+ `frontend` Frontend code lies here
+ `backend`  Backend code locates here
+ `doc`      Documents for developers and users

---
# Backend

+ `backend` Root of django
+ `backend/BioBLESS` Functional codes
+  Test cases are in the `backend/BioBLESS` directory

### Dependency
+ **django** for website
+ **numpy & scipy** for calculation
+ **matplotlib** for plotting
+ **networkx** for graph
+ you could just use `pip install -r requirements.txt` to install all the dependency.

### Install
    ./manage.py migrate
    ./manage.py loaddata parts
    ./manage.py runserver

### Unit Test
you could run
```
    ./manage.py test BioBLESS
```
for unit test

### Backend code doc
Please install sphinx package for python.
For example:
```
pip install sphinx
```
you could run
```
    ./doc_build/gendoc.sh (under *nix/macos)
    doc_build\gendoc.cmd (under windows)
```
   Then you can open doc_build/doc/html/index.html to view the doc

### Rest API doc
in the URI `/docs`

---
# Frontend

+ jQuery-2.1.4:

URL: https://jquery.com/download/ License: MIT

+ Pixi.js-3.0.7:

URL: https://github.com/GoodBoyDigital/pixi.js License: MIT

### Build

+ npm install

+ npm run build

### Documentations

npm run build-doc

### Unit Test

mocha-2.2.5:

URL: https://www.npmjs.com/package/mocha License: MIT

chai-3.2.0:

URL: https://github.com/chaijs/chai License: MIT

npm test




