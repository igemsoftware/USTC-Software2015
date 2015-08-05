#!/usr/bin/env python

'''
The package about the parts system and simulations
Data structure:
System:[effect,species_name]
effect:[[reactant,..],[product,..],constant,[catalytic]]
catalytic:[[+],[-]]
+/-:[[species,cconstant],...]
'''

__author__="Trumpet"

from reaction_system import reaction_system

class parts_system(reaction_system):
    
    def __init__(self):
        pass
    
    def __init__(self,species,effect):
        self.set_species_and_effect(species,effect)

    def set_species_and_effect(self,species,effect):
        species+=map(lambda single_effect:[str(single_effect),0],effect)
        self.set_species_name(species)
        reactions=[];
        for single_effect in effect:
            effect_temp=str(single_effect)
            reactions.append([single_effect[0],[effect_temp],single_effect[2]])
            reactions.append([[effect_temp],single_effect[1],single_effect[2]])
            for single_catalytic_negative in single_effect[3][0]:
                reactions.append([[single_catalytic_negative[0],effect_temp],single_effect[0]+[single_catalytic_negative[0]],single_catalytic_negative[1]])
            for single_catalytic_positive in single_effect[3][1]:
                reactions.append([single_effect[0]+[single_catalytic_positive[0]],single_effect[1]+[single_catalytic_positive[0]],single_catalytic_positive[1]])                
                #reactions.append([[single_catalytic_positive[0],effect_temp],single_effect[1]+[single_catalytic_positive[0]],single_catalytic_positive[1]])
        self.set_reactions(reactions)
