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

import numpy

SIZE = 10000
MAXCOL = 10
COMB = numpy.zeros((SIZE, MAXCOL))
for i in range(SIZE):
    COMB[i, 0] = 1
    for j in range(1, MAXCOL):
        COMB[i, j] = COMB[i - 1, j - 1] + COMB[i - 1, j]


def itemfreq(temp):
    """
    calculate the frequence in a list
    """
    if len(temp) == 0:
        return numpy.array([])
    else:
        items, inv = numpy.unique(temp, return_inverse=True)
        freq = numpy.bincount(inv)
        return numpy.array([items, freq]).T


def transpose(temp):
    """
    caclulate the transpose for a matrix
    """
    if len(temp) == 0:
        return numpy.array([[], [], []])
    else:
        return temp.transpose()


def choice(species):
    """
    choice the name of the species
    """
    if isinstance(species, list):
        return species[0]
    else:
        return species


def initialize(init_list, current, species_name_inverse):
    """
    initialize the system
    """
    for single_init in init_list:
        if isinstance(single_init, list):
            if single_init[1] != 0:
                current[species_name_inverse[single_init[0]]] = single_init[1]
    return current


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
        self.record = None
        self.time = 0

    def set_species_name(self, species):
        """
        Set all the species and their name in this system
        Parameters:
            list:the list of the names of species
        Returns
            none
        """
        self.species = species
        self.species_name = numpy.array(map(choice, species))
        self.species_name_inverse = {self.species_name[name_temp]: name_temp for name_temp in
                                     range(len(self.species_name))}

    def set_reactions(self, reaction):
        """
        Set all the reactions in this system
        Parameters:
            list:the list of the reactions
                the format of one reaction is a list : [[reactant,...],[product,...],constant]
        Returns:
            none
        """
        self.reactions = numpy.array(reaction)
        self.reactant, self.product, self.constant = transpose(self.reactions)
        self.reactant = numpy.array(self.reactant)
        self.product = numpy.array(self.product)
        self.constant = numpy.array(self.constant)
        self.reactant_data = map(itemfreq, (
        map(lambda temp1: map(lambda temp2: self.species_name_inverse[temp2], temp1), self.reactant)))
        self.product_data = map(itemfreq, (
        map(lambda temp1: map(lambda temp2: self.species_name_inverse[temp2], temp1), self.product)))

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

    def __add__(self, other):
        reaction = transpose(numpy.array([self.reactant, self.product, self.constant])).tolist() + transpose(
            numpy.array([other.reactant, other.product, other.constant])).tolist()
        species_name = list(set(self.species_name.tolist() + other.species_name.tolist()))
        current = numpy.zeros(len(species_name))
        species_name_inverse = {species_name[name_temp]: name_temp for name_temp in range(len(species_name))}
        current = initialize(self.species, current, species_name_inverse)
        current = initialize(other.species, current, species_name_inverse)
        current = current.tolist()
        return self.__class__(reaction, numpy.array([species_name, current]).transpose().tolist())

    def simulate(self, initial, stop_time):
        """
        Simulate after given species initial number and stoptime
        Parameters:
            list:the number of the species at t=0
            real:the time to stop the simualtion
        Returns:
            list:the record of the simulation
                the format of the list is : [[time,[species current number,...]],...]
        """
        current = numpy.zeros(len(self.species_name))  # numpy.array([0] * self.species_number)
        current = initialize(self.species, current, self.species_name_inverse)
        current = initialize(initial, current, self.species_name_inverse)
        time = 0
        self.record = [[time, current.tolist()]]
        reaction_number = len(self.reactions)
        while time < stop_time:
            intensities = numpy.array(map(lambda single_reactant: numpy.array(
                map(lambda species_temp: COMB[current[species_temp[0]], species_temp[1]], single_reactant)).prod(),
                                          self.reactant_data))
            possibility = numpy.array(intensities * self.constant, numpy.float64)
            possibility_sum = possibility.sum()
            if possibility_sum == 0:
                break
            delta_time = -numpy.log(numpy.random.random()) / possibility_sum
            next_reaction = numpy.random.choice(numpy.arange(reaction_number), p=possibility / possibility_sum)
            for species_temp in self.reactant_data[next_reaction]:
                current[species_temp[0]] -= species_temp[1]
            for species_temp in self.product_data[next_reaction]:
                current[species_temp[0]] += species_temp[1]
            time += delta_time
            self.record.append([time + 0, current.tolist()])
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

    @property
    def record_list(self):
        """
        Return the list of the record simulated
        Parameters:
            none
        Returns:
            none
        """
        return [self.species_name_inverse, self.record]

    def show_simulate(self, initial, stop_time, list_plot):
        """
        Simulate and show the graph
        Parameters:
            list:the number of the species at t=0
            real:the time to stop the simualtion
            list:the species to show
        Returns:
            none
        """
        self.simulate(initial, stop_time)
        self.show_record(list_plot)

    def simulation(self):
        """
        Just do simulation
        """
        try:
            self.simulate([], self.time)
        except IndexError:
            pass
