# -*- coding:utf-8 -*-
"""
Created on Wed Aug 12 21:18:25 2015

@author: run
""" 
import sys
from  xml.dom import  minidom
import os
from os import path
rootdir=r'C:\Users\run\Desktop\iGEM\partsxml'

def get_attrvalue(node, attrname):
     return node.getAttribute(attrname) if node else ''

def get_nodevalue(node, index = 0):
    if node.childNodes:
        return node.childNodes[index].nodeValue
    else:
        return 'None'

def get_xmlnode(node,name):
    return node.getElementsByTagName(name) if node else []

def xml_to_string(filename):
    doc = minidom.parse(filename)
    return doc.toxml('UTF-8')

def get_xml_data(filename):
    doc = minidom.parse(rootdir + '\\' + filename) 
    root = doc.documentElement

    part_nodes = get_xmlnode(root,'part')
    for node in part_nodes: 
        '''part_id = get_attrvalue(node,'id') '''
        node_id = get_xmlnode(node,'part_id')
        node_name = get_xmlnode(node,'part_name')
        node_desc = get_xmlnode(node,'part_short_desc')
        node_type = get_xmlnode(node,'part_type')
        node_rs = get_xmlnode(node,'release_status')
        node_ss = get_xmlnode(node,'sample_status')
        node_nname = get_xmlnode(node,'part_nickname')
        node_rating = get_xmlnode(node,'part_rating')
        node_entry = get_xmlnode(node,'part_entered')
        node_author = get_xmlnode(node,'part_author')
        node_seq = get_xmlnode(get_xmlnode(node,'sequences')[0],'seq_data')

        part_id = int(get_nodevalue(node_id[0]))
        part_name = get_nodevalue(node_name[0]).encode('utf-8','ignore')
        part_desc = get_nodevalue(node_desc[0]).encode('utf-8','ignore')
        part_type = get_nodevalue(node_type[0]).encode('utf-8','ignore')
        part_rs = get_nodevalue(node_rs[0]).encode('utf-8','ignore')
        part_ss = get_nodevalue(node_ss[0]).encode('utf-8','ignore')
        part_nname = get_nodevalue(node_nname[0]).encode('utf-8','ignore')
        part_rating = get_nodevalue(node_rating[0]).encode('utf-8','ignore')
        part_entry = get_nodevalue(node_entry[0]).encode('utf-8','ignore')
        part_author = get_nodevalue(node_author[0]).encode('utf-8','ignore')
        part_seq = get_nodevalue(node_seq[0]).encode('utf-8','ignore')
        part = {}
        part['id'] , part['name'] , part['short description'] , part['type'] , part['release status'] , part['sample status'] , part['nickname'] , part['rating'] , part['entered time'] , part['author'] , part['sequence'] = (
            int(part_id), part_name , part_desc , part_type , part_rs , part_ss , part_nname , part_rating , part_entry , part_author , part_seq
        )
    return part

def test_xmltostring():
    print xml_to_string()

def test_laod_xml(filename):
    return get_xml_data(filename)

if __name__ == "__main__":
    part_list=[]
    n=0
    for parent,dirnames,filenames in os.walk(rootdir):
        for filename in filenames:
            try:
               print 'analyzing: ',filename
               p = test_laod_xml(filename)
               s = repr(p)
               part_list.append(p)
               file_object = open(filename + '.txt', 'w')
               file_object.writelines(s)
               file_object.close()
            except :
                print 'ERROR!ERROR!ERROR!ERROR!',filename,'ERROR!ERROR!ERROR!ERROR!'
   
    ss = repr(part_list)
    file_object = open('part_list.txt', 'w')
    file_object.writelines(ss)
    file_object.close()
