class BioSystem(object):
    # lizhi = simplejson.loads()
    def __init__(self, logi=lizhi, system_data):
        self.time = system_data["system_parameter"]["time"]
        logi = {single_lizhi["id"]: single_lizhi for single_lizhi in lizhi}
        nodes = system_data["nodes"]
        devices = [DeviceSystem(
            logi[nodes[i]],
            system_data["simulation_parameters"][i]
        ).get_reaction(
            str(i),
            [str(j["from"]) for j in system_data["arcs"] if j["to"] == i],
            str(i)
        )
                   for i in range(len(nodes))]
        reaction = devices[0]
        for i in range(1, len(nodes)):
            reaction += devices[i]

    def simulate(self, record=[0, current]):
        reaction.simulate([], self.time)
        return reaction
