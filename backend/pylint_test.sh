#!/bin/bash
pylint --load-plugins pylint_django BioBLESS
exit $[ 3 & $? ]
