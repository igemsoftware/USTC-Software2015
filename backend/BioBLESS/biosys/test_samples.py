__author__ = 'zsy95_000'

from reactionsystem import ReactionSystem
from parts_system import parts_system
from django.http import HttpResponse


def test_reaction_system_sample(request):
    """
    Test Reaction System
    :param request:
    :return:
    """
    A = ReactionSystem([[["a"], ["b"], 1], [["b"], ["c"], 1]], [["a", 1000], "b", "c"])
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
    #!/usr/bin/env python
    #A=parts_system(["a","b",["c",10]],[[["a"],["b"],1,[[["c",1]],[]]]])
    #A.show_simulate([["a",100]],100,["a","b"])
    import datetime
    t = datetime.datetime.now()
    B=parts_system([["a",100],["b",100],["c",100],"ap","bp","cp"],[[["b"],["bp","b"],0.01,[[["cp",10]],[]]],[["a"],["ap","a"],0.01,[[["bp",10]],[]]],[["c"],["cp","c"],0.01,[[["ap",10]],[]]],[["ap"],[],0.01,[[],[]]],[["bp"],[],0.01,[[],[]]],[["cp"],[],0.01,[[],[]]]])
    B.simulate([], 10000)
    print str(datetime.datetime.now() - t)

    B.show_record(["ap","bp","cp"])
    return HttpResponse("Done")
