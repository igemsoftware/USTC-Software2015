#!/usr/bin/env python

from parts_system import parts_system


# from database import check,find

#####################
def check(*arg, **kw):
    return True


def find(*arg, **kw):
    return [[], []]


#####################

class and_1(parts_system):

    def __init__(self, promoter, RBS, coding, terminal, **reaction_constant):
        self.promoter = promoter
        self.RBS = RBS
        self.coding = coding
        self.terminal = terminal

    def get_species_and_effect(self):
        self.species = [self.promoter, self, RBS, self.coding, self.terminal]
        self.effect = [
            [[self.promoter_1], [self.promoter_1, self.RBS], self.reaction_constant[promoter_1_to_RBS],
             find(find(self.promoter_1))]
            [[self.RBS], [self.coding, self.RBS], self.reaction_constant[RBS_to_protein], find(find(self.RBS))]
        ]
        return (self.species, self.effect)


class not_1(parts_system):
    def __init__(self, promoter_1, RBS, lacI, terminal_1, promoter_2, coding, terminal_2, **reaction_data):
        if check("Positive", lac_I, promoter_2) == False:
            raise Exception()
        self.promoter_1 = promoter_1
        self.RBS = RBS
        self.lacI = lacI
        self.terminal_1 = terminal
        self.promoter_2 = promoter_2
        self.coding = coding
        self.terminal = terminal
        self.reaction_data = reaction_data

    @property
    def get_species_and_effect(self):
        self.species = [self.promoter_1, self.RBS, self.lacI, self.promoter_2, self.coding]
        self.effect = [
            [[self.promoter_1], [self.promoter_1, self.RBS], self.reaction_constant[promoter_1_to_RBS],
             find(self.promoter_1)],
            [[self.RBS], [self.lacI, self.RBS], self.reaction_constant[RBS_to_lacI], find(self.RBS)],
            [[self.promoter_2], [self.promoter_2, self.coding], self.reaction_constant[promoter_2_to_coding],
             find(self.promoter_2)],
        ]
        return (self.species, self.effect)
