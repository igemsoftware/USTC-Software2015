#!/usr/bin/env python2

__author__ = 'lizitian <lizitian@mail.ustc.edu.cn>'

import sae
import json
import numpy as np
from hashlib import sha256
from MySQLdb import connect
from cStringIO import StringIO
from haha import strip_processing

def step1(data):
    path = StringIO(data)
    img = strip_processing(path)
    mat = np.array(img) / 255
    result = mat.tolist()
    return result

def app(environ, start_response):
    response_headers = [('Content-Type', 'application/json')]
    status = '200 OK'
    data = environ['wsgi.input'].read()
    response_body = ''
    if environ['CONTENT_TYPE'] == 'image/jpeg':
        hash_sum = sha256(data).hexdigest()
        conn = connect(host=sae.const.MYSQL_HOST, port=int(sae.const.MYSQL_PORT), user=sae.const.MYSQL_USER, passwd=sae.const.MYSQL_PASS, db=sae.const.MYSQL_DB, charset='utf8')
        cur = conn.cursor()
        cur.execute('select matrix from stripe where hash = %s', hash_sum)
        row = cur.fetchone()
        result = ''
        if row is not None:
            result = row[0]
        if result == '':
            result = step1(data)
            cur.execute('insert into stripe(hash, matrix) values(%s, %s)', (hash_sum, json.dumps(result)))
            conn.commit()
        obj = {'hash': hash_sum, 'lrunze': result}
        response_body = json.dumps(obj)
        cur.close()
        conn.close()
    elif environ['CONTENT_TYPE'] == 'application/json':
        recv_obj = json.loads(data)
        obj = recv_obj
        response_body = json.dumps(obj)
    else:
        status = '415 Unsupported Media Type'
    start_response(status, response_headers)
    return [response_body]

application = sae.create_wsgi_app(app)
