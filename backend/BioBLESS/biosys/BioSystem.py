class BioSystem(object):
    # lizhi = simplejson.loads()
    def __init__(self, spec, lizhi):
        d_lizhi = self.__lizhi_to_dict(lizhi)
        devices = []
        l_nodes = [i for i in spec['nodes']]
        for i in range(len(l_nodes)):
            l_input = [j for j in spec['arcs'] if j['to'] == i]
                devices.append(DeviceSystem(lizhi[l_nodes[i]], spec).as_reaction_system(str(i), l_input, str(i)))

    def __lizhi_to_dict(self, lizhi):
        d_lizhi = {}
        for i in lizhi:
            d_lizhi[i['id']] = i
        return d_lizhi

    def simulate(self, record=[0, current]):
