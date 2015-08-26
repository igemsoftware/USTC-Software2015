#!/usr/bin/env python

__author__ = 'E-Neo <e-neo@qq.com>, LingyuanJi <jly@mail.ustc.edu.cn>'

import numpy as np
import networkx as nx
from PIL import Image
from PIL import ImageFilter
from PIL import ImageOps
from PIL import ImageMath

def lut(threshold):
    """Generate the lookup table for binarize.

    Inputs:
    int: threshold

    Outputs:
    list: [0, 0, ..., 255, 255, ..., 255]"""

    return [255 if i<=threshold else 0 for i in range(256)]

def denoise(pix):

    """Kernel filter.

    Inputs:
    list: pix map

    Outputs:
    list: pix_new map"""

    pix_new=pix.copy()
    height=len(pix)
    width=len(pix[0])
    for i in range(1,height-1):
        for j in range(1,width-1):
            if pix[i,j]==0:
                ans=\
                int(pix[i-1,j-1])+\
                int(pix[i-1,j])+\
                int(pix[i-1,j+1])+\
                int(pix[i,j-1])+\
                int(pix[i,j+1])+\
                int(pix[i+1,j-1])+\
                int(pix[i+1,j])+\
                int(pix[i+1,j+1])
                if ans>=3*255:
                    #print "Modefied!(%s,%s)ans=%s"%(i,j,ans)
                    pix_new[i,j]=np.uint8(255)
    return pix_new

def strip_processing(path, blur_radius=7, iter_steps=1, binarize_threshold=100):

    """Strip precessing function.

    Inputs:
    string: path of the image
    blur_radius: radius of gaussian blur
    iter_steps: execution times of denoise
    binarize_threshold: used as function lut's input

    Outputs:
    Image: the processed image."""

    gray=ImageOps.invert(ImageOps.grayscale(Image.open("stripes.jpg")))
    gray_blur=gray.filter(ImageFilter.GaussianBlur(blur_radius))
    high_freq=ImageMath.eval("25*(a-b)",a=gray,b=gray_blur).convert("L")

    binarized=ImageOps.invert(high_freq.point(lut(binarize_threshold))).convert("1")
    binarized_data=binarized.load()
    #binarized.show()

    height=binarized.height
    width=binarized.width

    pix=np.array([[np.uint8(binarized_data[j,i]) for j in range(width)] for i in range(height)])

    for i in range(iter_steps):
        pix=denoise(pix)

    answer=Image.fromarray(pix)
    #answer.show()
    #answer.save("test.bmp")
    return answer


def t_mid(begin, end):

    begin_x=begin[0]
    begin_y=begin[1]
    end_x=end[0]
    end_y=end[1]
    x_min=min(begin_x,end_x)
    y_min=min(begin_y,end_y)
    x_max=max(begin_x,end_x)
    y_max=max(begin_y,end_y)

    o=begin
    norm=np.sqrt((end-begin).dot(end-begin))
    if begin_x==end_x and begin_y==end_y:
        return []
    d=(end-begin)/norm

    if begin_x!=end_x and begin_y!=end_y:
        x_check_list=[i+0.5 for i in range(x_min,x_max)]
        y_check_list=[i+0.5 for i in range(y_min,y_max)]
        t_x=[(x-o[0])/d[0] for x in x_check_list]
        t_y=[(y-o[1])/d[1] for y in y_check_list]
        t_intersection=sorted(t_x+t_y)

    elif begin_x!=end_x and begin_y==end_y:
        x_check_list=[i+0.5 for i in range(x_min,x_max)]
        t_x=[(x-o[0])/d[0] for x in x_check_list]
        t_intersection=sorted(t_x)

    elif begin_x==end_x and begin_y!=end_y:
        y_check_list=[i+0.5 for i in range(y_min,y_max)]
        t_y=[(y-o[1])/d[1] for y in y_check_list]
        t_intersection=sorted(t_y)

    if len(t_intersection)>=2:
        t_mid=[(t_intersection[i+1]+t_intersection[i])/2 \
               for i in range(len(t_intersection)-1)]
    else:
        t_mid=[]

    return t_mid

def fix_to_pix(t):
    offset=t-int(t)
    if offset>=0.5:
        return int(t)+1
    else:
        return int(t)

def pix_sequence(begin, end):

    begin_x=begin[0]
    begin_y=begin[1]
    end_x=end[0]
    end_y=end[1]

    o=begin
    norm=np.sqrt((end-begin).dot(end-begin))
    if begin_x==end_x and begin_y==end_y:
        return []
    d=(end-begin)/norm
    t_list=t_mid(begin, end)

    ans=[]
    for t in t_list:
        point=o+t*d
        ans.append(np.array([fix_to_pix(point[0]),fix_to_pix(point[1])]))

    return ans

def get_stripes(img, initial, final):
    img_array = np.array(img)
    initial = np.array(initial)
    final = np.array(final)
    pix = pix_sequence(initial, final)
    dir_vec = (final-initial)/np.linalg.norm(final-initial)
    points = []
    for i in pix:
        points.append(img_array[tuple(i)])
    return points


def count_stripes(points, s_hold, b_hold):
    s_value = 0
    b_value = 255
    stripes = 0
    count = 0
    flag = points[0]
    for i in points:
        if i == flag:
            count += 1
        elif flag == s_value:
            flag = b_value
            if count > s_hold:
                stripes += 1
        elif flag == b_value:
            flag = s_value
            if count > b_hold:
                stripes += 1
    return int((stripes + 0.5) // 2)


def array2graph(img_array, color):
    """Convert an array to a graph.

    not a adjacency matrix"""
    G = nx.Graph()
    for i in range(len(img_array) - 1):
        for j in range(len(img_array[0]) - 1):
            if img_array[i][j] == color:
                G.add_node((i, j))
                if img_array[i+1][j] == color:
                    G.add_edge((i, j), (i + 1, j))
                if img_array[i, j+1] == color:
                    G.add_edge((i, j), (i, j + 1))
    for i in range(len(img_array) - 1):
        if img_array[i][-1] == color:
            G.add_node((i, len(img_array[0]) - 1))
            if img_array[i+1][-1] == color:
                G.add_edge((i, len(img_array[0]) - 1), (i + 1, len(img_array[0]) - 1))
    for j in range(len(img_array[0]) - 1):
        if img_array[-1][j] == color:
            G.add_node((len(img_array) - 1, j))
            if img_array[-1][j+1] == color:
                G.add_edge((len(img_array) - 1, j), ((len(img_array) - 1), j + 1))
    if img_array[-1][-1] == color:
        G.add_node((len(img_array) - 1, (len(img_array[0]) - 1)))
    return G


def get_useless_nodes(graph, degree):
    tmp = graph.nodes()
    useless = []
    while len(tmp) != 0:
        nodes = nx.dfs_tree(graph, tmp[0])
        if len(nodes) < degree:
            useless.append(nodes)
        for i in nodes:
            tmp.remove(i)
    return useless


def remove_noise(img, degree):
    img_array = np.array(img)
    g_white = array2graph(img_array, 255)
    g_black = array2graph(img_array, 0)
    black = get_useless_nodes(g_white, degree)
    white = get_useless_nodes(g_black, degree)
    for i in black:
        img_array[i] = 0
    for i in white:
        img_array[i] = 255
    return Image.fromarray(img_array)


def point2line(G, t):
    """return a list as a line"""
    H = nx.dfs_tree(G, t)
    return H.nodes()


def line_distance(l1, l2):
    """return the distence between two lines"""
    d_min = np.linalg.norm(np.array(l1[0]) - np.array(l2[0]))
    for i in l1:
        for j in l2:
            d = np.linalg.norm(np.array(i) - np.array(j))
            if d < d_min:
                d_min = d
    return d_min
