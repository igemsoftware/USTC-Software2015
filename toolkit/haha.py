#!/usr/bin/env python

__author__ = 'E-Neo <e-neo@qq.com>, LingyuanJi <jly@mail.ustc.edu.cn>, lizitian <lizitian@mail.ustc.edu.cn>'

import numpy as np
import networkx as nx
from PIL import Image
from PIL import ImageFilter
from PIL import ImageOps
from PIL import ImageMath
from cStringIO import StringIO

DIF_PRECISION=1e-13
SOLVE_PRECISION=1e-13

def lut(threshold):
    """Generate the lookup table for binarize.

    Parameters
    ----------
    threshold : int
        threshold

    Returns
    -------
    points : list
        A list seems like: [0, 0, ..., 255, 255, ..., 255]
    """
    points = [0 if i <= threshold else 255 for i in range(256)]
    return points

def denoise(pix):
    """Kernel filter.

    Parameters
    ----------
    pix : list
        pix map

    Returns
    -------
    pix_new : list
        pix_new map
    """
    pix_new = pix.copy()
    height = len(pix)
    width = len(pix[0])
    for i in range(1, height-1):
        for j in range(1, width-1):
            if pix[i, j] == 0:
                ans = \
                int(pix[i-1, j-1])+\
                int(pix[i-1, j])+\
                int(pix[i-1, j+1])+\
                int(pix[i, j-1])+\
                int(pix[i, j+1])+\
                int(pix[i+1, j-1])+\
                int(pix[i+1, j])+\
                int(pix[i+1, j+1])
                if ans >= 4*255:
                    #print "Modefied!(%s,%s)ans=%s"%(i,j,ans)
                    pix_new[i, j] = np.uint8(255)
    return pix_new

def strip_processing(path, blur_radius=2, iter_steps=1, binarize_threshold=120):
    """Strip precessing function.

    Parameters
    ----------
    path : string
        path of the image
    blur_radius : int
        radius of gaussian blur
    iter_steps : int
        execution times of denoise
    binarize_threshold : 100
        used as function lut's input

    Returns
    -------
    answer : image
        the processed image.
    """
    gray = ImageOps.invert(ImageOps.grayscale(Image.open(path)))
    gray_blur = gray.filter(ImageFilter.GaussianBlur(blur_radius))
    high_freq = ImageMath.eval("25*(a-b)", a=gray, b=gray_blur).convert("L")

    binarized = ImageOps.invert(high_freq.point(lut(binarize_threshold))).convert("1")
    binarized_data = binarized.load()
    #binarized.show()

    height = binarized.size[1]
    width = binarized.size[0]

    pix = np.array([[np.uint8(binarized_data[j, i]) for j in range(width)] for i in range(height)])

    for i in range(iter_steps):
        pix = denoise(pix)

    answer = Image.fromarray(pix)
    #answer.show()
    #answer.save("test.bmp")
    return answer


def t_mid(begin, end):

    begin_x = begin[0]
    begin_y = begin[1]
    end_x = end[0]
    end_y = end[1]
    x_min = min(begin_x, end_x)
    y_min = min(begin_y, end_y)
    x_max = max(begin_x, end_x)
    y_max = max(begin_y, end_y)

    o = begin
    norm = np.sqrt((end-begin).dot(end-begin))
    if begin_x == end_x and begin_y == end_y:
        return []
    d = (end-begin)/norm

    if begin_x != end_x and begin_y != end_y:
        x_check_list = [i+0.5 for i in range(x_min, x_max)]
        y_check_list = [i+0.5 for i in range(y_min, y_max)]
        t_x = [(x-o[0])/d[0] for x in x_check_list]
        t_y = [(y-o[1])/d[1] for y in y_check_list]
        t_intersection = sorted(t_x+t_y)

    elif begin_x != end_x and begin_y == end_y:
        x_check_list = [i+0.5 for i in range(x_min, x_max)]
        t_x = [(x-o[0])/d[0] for x in x_check_list]
        t_intersection = sorted(t_x)

    elif begin_x == end_x and begin_y != end_y:
        y_check_list = [i+0.5 for i in range(y_min, y_max)]
        t_y = [(y-o[1])/d[1] for y in y_check_list]
        t_intersection = sorted(t_y)

    if len(t_intersection) >= 2:
        t_mid = [(t_intersection[i+1]+t_intersection[i])/2 \
                 for i in range(len(t_intersection)-1)]
    else:
        t_mid = []

    return t_mid

def fix_to_pix(t):
    offset = t-int(t)
    if offset >= 0.5:
        return int(t)+1
    else:
        return int(t)

def pix_sequence(begin, end):

    begin_x = begin[0]
    begin_y = begin[1]
    end_x = end[0]
    end_y = end[1]

    o = begin
    norm = np.sqrt((end-begin).dot(end-begin))
    if begin_x == end_x and begin_y == end_y:
        return []
    d = (end-begin)/norm
    t_list = t_mid(begin, end)

    ans = []
    for t in t_list:
        point = o + t*d
        ans.append(np.array([fix_to_pix(point[0]), fix_to_pix(point[1])]))

    return ans

def get_stripes(img_array, initial, final):
    initial = np.array(initial)
    final = np.array(final)
    pix = pix_sequence(initial, final)
    dir_vec = (final-initial)/np.linalg.norm(final-initial)
    points = []
    for i in pix:
        points.append(img_array[tuple(i)])
    return points


def count_stripes(points, s_hold, b_hold):
    if len(points) == 0:
        return 0
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


def point2line(G, t):
    """return a list as a line"""
    if G.has_node(t) == False:
        return []
    H = nx.dfs_tree(G, t)
    return H.nodes()


def point_line_distance(point, line):
    """return the distence between two lines"""
    if len(line) == 0:
        return 0
    d_min = np.linalg.norm(np.array(point) - np.array(line[0]))
    for i in line:
        d = np.linalg.norm(np.array(point) - np.array(i))
        if d < d_min:
            d_min = d
    return d_min


def jacobi(func, x):
    dim=len(x)
    x_test=[np.array([DIF_PRECISION if j==i else 0 for j in range(dim)])for i in range(dim)]
    ans=np.array([[(func(x+x_test[j])[i]-func(x)[i])/DIF_PRECISION for j in range(dim)] for i in range(dim)])
    return ans


def fsolve(func, init):
    cur_x=init
    delta_x=np.linalg.solve(jacobi(func, cur_x), -func(cur_x))
    while max(delta_x)>=SOLVE_PRECISION:
        cur_x=cur_x+delta_x
        delta_x=np.linalg.solve(jacobi(func, cur_x), -func(cur_x))
    return cur_x


def calculate_begin_rank(delta_n, delta_r, rank_func):
    def lhs(x):
        return np.array([
            rank_func(x[0])-x[2],
            rank_func(x[1])-x[3],
            x[1]-x[0]-delta_n,
            x[3]-x[2]-delta_r
        ])
    return int(fsolve(lhs,[50,100,200,400])[0])


def all_in_one(path, initial, final, s_hold, b_hold):
    img = strip_processing(path)
    points = get_stripes(np.array(img), initial, final)
    delt_n = count_stripes(points, s_hold, b_hold)
    G = array2graph(np.array(img), 0)
    delt_r = point_line_distance(initial, point2line(G, final))
    return delt_n, delt_r

def step1(data):
    path = StringIO(data)
    img = strip_processing(path)
    mat = np.array(img) / 255
    result = mat.tolist()
    return result

def step2(mat, info):
    img_array = np.array(mat) * 255
    initial = info['points'][0]
    final = info['points'][1]
    through = get_stripes(img_array, initial, final)
    delt_n = count_stripes(through, 2, 2)
    G = array2graph(img_array, 0)
    delt_r = point_line_distance(initial, point2line(G, final))
    ring_num = 0
    return ring_num
