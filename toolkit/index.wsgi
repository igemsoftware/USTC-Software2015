#!/usr/bin/env python2

__author__ = 'lizitian <lizitian@mail.ustc.edu.cn>'

import sae
import json
from hashlib import sha256
from MySQLdb import connect
from haha import step1, step2

def query_db_matrix(cur, hash_sum):
    cur.execute('select matrix from stripe where hash = %s', hash_sum)
    row = cur.fetchone()
    if row is not None:
        result = json.loads(row[0])
    else:
        result = None
    return result

def app(environ, start_response):
    response_headers = [('Content-Type', 'application/json'), ('Access-Control-Allow-Origin', 'http://localhost'), ('Access-Control-Allow-Headers', 'Content-Type')]
    status = '200 OK'
    data = environ['wsgi.input'].read()
    response_body = ''
    conn = connect(host=sae.const.MYSQL_HOST, port=int(sae.const.MYSQL_PORT), user=sae.const.MYSQL_USER, passwd=sae.const.MYSQL_PASS, db=sae.const.MYSQL_DB, charset='utf8')
    cur = conn.cursor()
    if not 'CONTENT_TYPE' in environ:
        status = '200 OK'
    elif environ['CONTENT_TYPE'] == 'image/jpeg':
        hash_sum = sha256(data).hexdigest()
        result = query_db_matrix(cur, hash_sum)
        if result is None:
            result = step1(data)
            cur.execute('insert into stripe(hash, matrix) values(%s, %s)', (hash_sum, json.dumps(result)))
            conn.commit()
        obj = {'hash': hash_sum, 'lrunze': result}
        response_body = json.dumps(obj)
    elif environ['CONTENT_TYPE'] == 'application/json':
        recv_obj = json.loads(data)
        hash_sum = recv_obj['hash']
        result = query_db_matrix(cur, hash_sum)
        if result == '':
            status = '404 Not Found'
        else:
            matrix_obj = json.loads(result)
            response_body = json.dumps(step2(matrix_obj, recv_obj))
    else:
        status = '415 Unsupported Media Type'
    cur.close()
    conn.close()
    start_response(status, response_headers)
    return [response_body]

application = sae.create_wsgi_app(app)
