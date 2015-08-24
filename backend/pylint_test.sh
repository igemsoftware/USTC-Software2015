#!/bin/bash
pylint --load-plugins pylint_django BioBLESS
exit $[ 2 & $? ]
