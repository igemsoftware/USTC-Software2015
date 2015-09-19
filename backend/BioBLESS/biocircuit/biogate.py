__author__ = 'E-Neo <e-neo@qq.com>'


import simplejson,os


GATE_FILE = None
real_path = os.path.split(os.path.realpath(__file__))[0]+"/"
try:
    GATE_FILE = open(real_path+"../../../doc/devices/gates_lizhi.json", "r")
except IOError:
    GATE_FILE = open(real_path+"../doc/devices/gates_lizhi.json", "r")

gate_data_source = GATE_FILE.read()

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


d_gate = {'and': {'AND0': (0, 2, 0, 0),
                  'AND1': (0, 2, 0, 0),
                  'AND2': (2, 0, 0, 0),
                  'AND3': (0, 2, 0, 0),
                  'AND4': (1, 2, 0, 0),
                  'AND5': (0, 1, 0, 1)},
          'not': {'NOT0': (0, 3, 1, 0),
                  'NOT1': (1, 2, 0, 1),
                  'NOT2': (1, 2, 0, 0),
                  'NOT3': (1, 1, 0, 1),
                  'NOT4': (3, 0, 0, 0),
                  'NOT5': (2, 0, 1, 0),
                  'NOT6': (2, 0, 0, 0),
                  'NOT7': (1, 1, 1, 0)},
          'or': {'OR0': (3, 0, 0, 0),
                 'OR1': (4, 1, 0, 0)}}
