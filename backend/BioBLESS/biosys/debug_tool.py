__author__ = 'suquark'
import sys
import os


def debug_info(addinfo=None):
    """
    Debug helper
    :param addinfo Tags:
    """
    prev_stack = sys._getframe(1)
    prev_file = prev_stack.f_globals['__file__']
    prev_filename = os.path.split(prev_file)[-1]
    prev_line = prev_stack.f_lineno
    if addinfo:
        return "%s [line %d] <%s>: " % (prev_filename, prev_line, addinfo)
    else:
        return "%s [line %d]: " % (prev_filename, prev_line)