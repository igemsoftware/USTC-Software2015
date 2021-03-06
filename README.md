[![Build Status](https://travis-ci.org/igemsoftware/USTC-Software2015.svg?branch=master)](https://travis-ci.org/igemsoftware/USTC-Software2015)
[![Coverage Status](https://coveralls.io/repos/igemsoftware/USTC-Software2015/badge.svg?branch=master&service=github)](https://coveralls.io/github/igemsoftware/USTC-Software2015?branch=master)
# BioBLESS - iGEM USTC Software 2015

## Quick Guide
+ run `./install.sh` to install the application
+ run `./run.sh` to run the application
+ open **http://localhost:8000/BioBLESS/index.html** to enjoy it.

---

## Structure of the project
+ `frontend` Frontend logic lies here
+ `backend`  Backend code locates here
+ `doc`      Documents for developers and users

This project is backend/frontend separatable. This means that you can deploy backend and frontend in different places given frontend is capable of connecting to the backend(e.g. You can run backend in a webserver/your pc, and frontend in wherever a html5-friendly webbrowser is supported. Then you can configure the frontend to connect to the backend, this will be easy).

---

## Backend

### Requirements
+ python 2.7
+ build-essential
+ pip
+ virtualenv


### code structure
+ `backend` Root of django
+ `backend/BioBLESS` Functional codes
+  Test cases are in the `backend/BioBLESS` directory

### Dependency
+ **django** for website
+ **matplotlib** for plotting
+ **networkx** for graph
+ you could just use `pip install -r requirements.txt` to install all the dependency.

### Install
    cd BioBLESS/biocircuit
    make
    python biogate_gen.py
    cd ../..
    python manage.py migrate
    python manage.py loaddata parts
    python manage.py runserver 0.0.0.0:8000
    
if you would like serve the static file by a nginx/apache server, you could change setting `STATIC_ROOT` in `backend\BioBLESS\settings.py` to your nginx document root directory, and run `python manage.py collectstatic` to copy the static file to your web server directory.
### Unit Test
you could run
```
    python manage.py test BioBLESS
```
for unit test

### Backend code doc
Please install sphinx package for python.
For example:
```
pip install -U Sphinx
```
you could run
```
    ./doc_build/gendoc.sh (under *nix/macos)
    doc_build\gendoc.cmd (under windows)
```
   Then you can open doc_build/doc/html/index.html to view the doc

   A built doc exists in doc_build/backend_doc.zip, just use it for convenience.

### Rest API doc
You can find it in the URI `/docs`

---
## Frontend

Browser Requirements: IE 9+, Safari 5.1+, Edge, current Chrome or Firefox.

If you just want to use our software, you do not need to build the source. If you want to make some improvement, or build the frontend documentations, you can see the instructions below.

### Dependency

First of all, you need to install nodejs and npm.

For example, ubuntu 14.04 please run below:
```
# apt-get install nodejs-legacy npm
```
#### Libraries (already included in the project)

[jQuery-2.1.4](https://jquery.com/download/) License: MIT

[Pixi.js-3.0.7](https://github.com/GoodBoyDigital/pixi.js) License: MIT

##### Unit Test

[mocha-2.2.5](https://www.npmjs.com/package/mocha) License: MIT

[chai-3.2.0](https://github.com/chaijs/chai) License: MIT

### Build
You should just execute the following command:
```
$ npm install
$ npm run build
```
### Documentations
Run it to view the documents:
```
$ npm run build-doc
```
### Unit Test

```
$ npm test
```
