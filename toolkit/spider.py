#!/usr/bin/env python

import os
import re
import time

def get_All_Parts():
    ""
    logfp = open('log', 'a')
    url = r'http://parts.igem.org/fasta/parts/All_Parts'
    logfp.write(time.strftime("%Y-%m-%d %H:%M:%S\n"))

    try:
        os.system("wget -q -O All_Parts %s" % url)
        logfp.write("Get All_Parts\n\n")
    except:
        logfp.write("!Error All_Parts\n\n")

    logfp.close()

    return "All_Parts"

    
def get_parts_name(All_Parts):
    ""
    pattern = re.compile(r'>(\w+)')
    parts = pattern.findall(All_Parts)
    partfp = open('parts_name', 'w')
    
    for part in parts:
        partfp.write(part + '\n')
        
    partfp.write('\n%d\n' % len(parts))
    partfp.close()
    
    logfp = open('log', 'a')
    logfp.write(time.strftime("%Y-%m-%d %H:%M:%S\n"))
    logfp.write("Get parts_name\n\n")
    logfp.close()

    return parts


def get_Part_html(parts):
    ""
    os.mkdir('Parts')
    count = 0
    logfp = open('log', 'a')
    
    for part in parts:
        logfp.write(time.strftime("%Y-%m-%d %H:%M:%S\n"))
        try:
            url = "http://parts.igem.org/Part:%s" % part
            os.system("wget -q -O Parts/%s.html %s" % (part, url))
            count = count + 1
            logfp.write("Get %s [%d]\n\n" % (part, count))
        except:
            logfp.write("!Error at %s\n\n" % part)

    logfp.close()

    return count

filename = get_All_Parts()
All_Parts = open(filename, 'r').read()
parts = get_parts_name(All_Parts)
count = get_Part_html(parts)
logfp = open('log', 'a')
logfp.write("Done (%d/%d)\n" % (count, len(parts)))
logfp.close()
