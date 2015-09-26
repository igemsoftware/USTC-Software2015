import os, json, random

def simulate(dict_data):
    os.system("mkdir temp 1>/dev/null 2>/dev/null")
    temp1 = "./temp/"+str(random.random())
    temp2 = "./temp/"+str(random.random())
    to_write = json.dumps(dict_data)
    in_file = open(temp1, 'w')
    in_file.write(to_write)
    in_file.close()
    os.system('pypy bio_system_old.py<'+temp1+' >'+temp2) or os.system('pypy BioBLESS/biosys/bio_system_old.py<'+temp1+' >'+temp2) or os.system('pypy backend/BioBLESS/biosys/bio_system_old.py<'+temp1+' >'+temp2)
    out_file = open(temp2, "r")
    res = out_file.read()
    out_file.close()
    os.system('rm -f '+temp1+' '+temp2)
    return json.loads(res)
