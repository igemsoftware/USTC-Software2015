__author__ = 'E-Neo <e-neo@qq.com>'


import simplejson


def get_d_gate(lizhi_json):
    """Get d_gate from gates_lizhi.json.

    Parameters
    ----------
    lizhi_json : str
        A string read from lizhi.json

    Returns
    -------
    d_gate_d : dict
        Record the 4 parameters.
    """
    lizhi = simplejson.loads(lizhi_json)
    g_and = {}
    g_not = {}
    g_or = {}
    for i in lizhi:
        para = [0, 0, 0, 0]
        for j in i['map']:
            if j['type'] == 'inh':
                para[0] += 1
            elif j['type'] == 'act':
                para[1] += 1
            elif j['type'] == 'lock':
                para[2] += 1
            elif j['type'] == 'key':
                para[3] += 1
        para = tuple(para)
        if i['id'][0] == 'A':
            g_and[i['id']] = para
        elif i['id'][0] == 'N':
            g_not[i['id']] = para
        elif i['id'][0] == 'O':
            g_or[i['id']] = para
    d_gate_d = {'not': g_not, 'and': g_and, 'or': g_or}
    return d_gate_d



fp = open('../../../doc/devices/gates_lizhi.json', 'r')
s_lizhi = fp.read()
fp.close()
d_gate = get_d_gate(s_lizhi)
fp = open('biogate.py', 'w')
fp.write('d_gate = ')
fp.write(str(d_gate))
fp.close()
