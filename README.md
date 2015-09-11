[![Build Status](https://travis-ci.org/igemsoftware/USTC-Software2015.svg?branch=master)](https://travis-ci.org/igemsoftware/USTC-Software2015)
[![Coverage Status](https://coveralls.io/repos/igemsoftware/USTC-Software2015/badge.svg?branch=master&service=github)](https://coveralls.io/github/igemsoftware/USTC-Software2015?branch=master)
# BioBLESS - iGEM USTC Software 2015

## Structure of the project
+ `frontend` Frontend logic lies here
+ `backend`  Backend code locates here
+ `doc`      Documents for developers and users

### This project is backend/frontend separatable. This means that you can deploy backend and frontend in different places given frontend is capable of connecting to the backend(e.g. You can run backend in a webserver/your pc, and frontend in wherever a html5-friendly webbrowser is supported. Then you can configure the frontend to connect to the backend, this will be easy). 

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
You can find it in the URI `/docs`

---
# Frontend

### Our frontend is coded with canvas-based HTML5. Please view it with IE10+, Microsoft Edge or newest Firebox, Chrome, etc., if it fails to render well.

### Dependency (already included in the project)

[jQuery-2.1.4](https://jquery.com/download/) License: MIT

[Pixi.js-3.0.7](https://github.com/GoodBoyDigital/pixi.js) License: MIT

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

[mocha-2.2.5](https://www.npmjs.com/package/mocha) License: MIT

[chai-3.2.0](https://github.com/chaijs/chai) License: MIT

```
$ npm test
```
