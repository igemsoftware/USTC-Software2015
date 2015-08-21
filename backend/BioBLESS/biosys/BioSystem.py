#!/usr/bin/env python

from DeviceSystem import DeviceSystem
from lizhi import lizhi


class BioSystem(object):
    # lizhi = simplejson.loads()
    def __init__(self, system_data, logi=lizhi):
        self.time=system_data["system_parameter"]["time"]
        logi = {single_lizhi["id"]:single_lizhi for single_lizhi in lizhi}
        nodes = system_data["nodes"]
        devices = [DeviceSystem(
            logi[nodes[i]],
            system_data["simulation_parameters"][i]
        ).get_reaction(
            str(i),
            [str(j["from"]) for j in system_data["arcs"] if j["to"]==i],
            str(i)
        )
            for i in range(len(nodes))]
        #for temp in devices:
        #    print temp.species
        reaction=devices[0]
        for i in range(1,len(nodes)):
            reaction+=devices[i]
        self.reaction=reaction

    def simulate(self):
        try:
            self.reaction.simulate([],self.time)
        except:
            pass
        print self.reaction.species
        #self.reaction.show_species()
        self.reaction.show_reaction()
        self.reaction.show_record()
        return self.reaction
