#!/usr/bin/env python
"""
The package about the reactions system and simulations
Data structure:

System:[reactions,species]
species:[species_name,initial]|species_name
Reactions:[[[reactant,...],[product,...],constant,...]
Simulation structure:[[[species,initial],...],stop_time]
Show structure:[species_to_show]
"""

__author__ = "Trumpet"

DEBUG = True
import numpy
try:
    from BioBLESS.settings import DEBUG
except ImportError:
    pass
from stopwatch import *


def choice(species):
    """
    choice the name of the species
    """
    if isinstance(species, list):
        return species[0]
    else:
        return species

################################################################
try:
    import matplotlib.pyplot as plt
except ImportError:
    pass

################################################################

class ReactionSystem(object):
    """
    the class to describe reactions system
    """

    def __init__(self, reactions, species):
        """
        Init this system
        Parameters:
            list:the data of the reactions in this system
                looking for help(set_reactions) to find the format of this list
            list:the name of all the species in this system
        Returns
            none
        """
        self.set_species_name(species)
        self.set_reactions(reactions)

    def set_species_name(self, species):
        """
        Set all the species and their name in this system
        Parameters:
            list:the list of the names of species
        Returns
            none
        """
        self.species = species
        for i in range(len(self.species)):
            if isinstance(self.species[i], str) or isinstance(self.species[i], unicode):
                self.species[i] = [self.species[i], 0]
        self.species_name = [i[0] for i in self.species]
        self.species_name_inverse = {self.species_name[i]: i for i in range(len(self.species_name))}

    def set_reactions(self, reactions):
        """
        Set all the reactions in this system
        Parameters:
            list:the list of the reactions
                the format of one reaction is a list : [[reactant,...],[product,...],constant]
        Returns:
            none
        """
        self.reactions = reactions
        self.product = []
        self.reactant = []
        self.constant = []
        for i in reactions:
            self.reactant.append(i[0])
            self.product.append(i[1])
            self.constant.append(i[2])
        self.reactant_data = [[self.species_name_inverse[j] for j in i] for i in self.reactant]
        self.product_data = [[self.species_name_inverse[j] for j in i] for i in self.product]
        self.reaction_number = len(self.constant)

    def __add__(self, other):
        reaction = [[self.reactant[i], self.product[i], self.constant[i]] for i in range(self.reaction_number)] + [[other.reactant[i], other.product[i], other.constant[i]] for i in range(other.reaction_number)]

        species = list(set(self.species_name + other.species_name))

        species_name_inverse = {species[i]: i for i in range(len(species))}

        current = [0 for i in range(len(species))]
        
        for i in self.species:
            if i[1] != 0:
                current[species_name_inverse[i[0]]] = i[1]

        for i in other.species:
            if i[1] != 0:
                current[species_name_inverse[i[0]]] = i[1]

        return self.__class__(reaction, [[species[i], current[i]] for i in range(len(species))])

    ######################################################################

    def show_species(self):
        """
        Print the names of all the species in this system
        Parameters:
            none
        Returns:
            none
        """
        print_temp = ""
        for single_species in self.species_name:
            print_temp += single_species + " "
        print print_temp

    def show_reaction(self):
        """
        Print the data of all the reactions the  in this system
        Parameters:
            none
        Returns:
            none
        """
        print "reactant\t\tproduct\t\tconstant"
        for single_reaction in self.reactions:
            print_temp = ""
            for reactant in single_reaction[0]:
                print_temp += reactant + " "
            print_temp += "\t\t"
            for product in single_reaction[1]:
                print_temp += product + " "
            print_temp += "\t\t" + str(single_reaction[2])
            print print_temp

    ####################################################################

    def simulate(self, stop_time):
        """
        Simulate after given species initial number and stoptime
        Parameters:
            list:the number of the species at t=0
            real:the time to stop the simualtion
        Returns:
            list:the record of the simulation
                the format of the list is : [[time,[species current number,...]],...]
        """

        current = [i[1] for i in self.species] 

        time = 0
        self.record = [[time, current]]
        if DEBUG:
            sw_alloc("Possibility")
            sw_alloc("Update substances")

        while time < stop_time:

            if DEBUG:
                sw_start("Possibility")

            current = [x for x in current]
            possibility = [numpy.array([current[j] 
                for j in self.reactant_data[i]]).prod()*self.constant[i] 
                for i in range(self.reaction_number)]

            possibility = numpy.array(possibility,dtype=numpy.float64)
            possibility_sum = possibility.sum()
            if possibility_sum == 0:
                break
            delta_time = -numpy.log(numpy.random.random()) / possibility_sum
            next_reaction = numpy.random.choice(numpy.arange(self.reaction_number), p=possibility / possibility_sum)

            if DEBUG:
                sw_accmu("Possibility")
                sw_start("Update substances")

            for species_temp in self.reactant_data[next_reaction]:
                current[species_temp] -= 1
            for species_temp in self.product_data[next_reaction]:
                current[species_temp] += 1
            time += delta_time
            self.record.append([time+0, current])

            if DEBUG:
                sw_accmu("Update substances")
        if DEBUG:
            sw_print("Possibility")
            sw_print("Update substances")

        return self.record

    ################################################################

    def show_record(self, plot_list=None):
        """
        Show the graph of the record simulated
        Parameters:
            none
        Returns:
            none
        """
        plot_list = [self.species_name_inverse[single_species] for single_species in
                     plot_list] if plot_list else self.species_name_inverse.values()
        for species in plot_list:
            plt.plot([x[0] for x in self.record], [x[1][species] for x in self.record])
        # # !!! TODO: Something error HERE, pylab can only show once !!!
        # # pylab.ion()
        plt.show()

    def show_simulate(self, stop_time, list_plot):
        """
        Simulate and show the graph
        Parameters:
            list:the number of the species at t=0
            real:the time to stop the simualtion
            list:the species to show
        Returns:
            none
        """
        self.simulate(stop_time)
        self.show_record(list_plot)

    #######################################################################3

    @property
    def record_list(self):
        """
        Return the list of the record simulated
        Parameters:
            none
        Returns:
            none
        """
        num = len(self.record)
        specieser = [[i, [self.record[j][1][self.species_name_inverse[i]] for j in range(num)]] for i in self.species_name]
        timer = [["t", [self.record[i][0] for i in range(num)]]]
        return dict(specieser+timer)

    def simulation(self):
        """
        Just do simulation
        """
        try:
            self.simulate(self.time)
        except IndexError:
            pass
