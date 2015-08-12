__author__ = 'zsy95_000'

from reaction_system import reaction_system
from parts_system import parts_system
from django.http import HttpResponse


def test_reaction_system_sample(request):
    """
    Test Reaction System
    :param request:
    :return:
    """
    A = reaction_system([[["a"], ["b"], 1], [["b"], ["c"], 1]], [["a", 1000], "b", "c"])
    A.show_simulate([], 10, ["a", "b", "c"])
    A.show_species
    A.del_species_name("c")
    A.show_species
    A.del_reaction([["b"], ["c"], 1])
    A.show_reaction
    A.show_simulate([["a", 1000]], 10, ["a", "b"])
    A.add_species_name("d")
    A.add_reaction([["a"], ["d"], 1])
    A.show_simulate([["a", 1000]], 10, ["a", "b", "d"])
    A.reaction_number
    A.species_number
    A.show_record(["a"])
    return HttpResponse("Done")


def test_reaction_system(request):
    """
    Test Reaction System
    :param request:
    :return:
    """
    # A = reaction_system(reaction_system_info)
    # A.show_simulate(initial, stop_time, show_list)
    return HttpResponse("Done")


def test_parts_system_sample(request):
    """
    Test Parts System
    :param request:
    :return:
    """
    A = parts_system(["a", "b", ["c", 10]], [[["a"], ["b"], 1, [[["c", 1]], []]]])
    A.show_simulate([["a", 100]], 100, ["a", "b"])
    B = parts_system([["a", 100], ["b", 100], ["c", 100], "ap", "bp", "cp"],
                     [[["b"], ["bp", "b"], 1, [[["cp", 10]], []]], [["a"], ["ap", "a"], 1, [[["bp", 10]], []]],
                      [["c"], ["cp", "c"], 1, [[["ap", 10]], []]], [["ap"], [], 1, [[], []]], [["bp"], [], 1, [[], []]],
                      [["cp"], [], 1, [[], []]]])
    print "waiting"
    B.show_simulate([], 100, ["ap", "bp", "cp"])
    return HttpResponse("Done")
