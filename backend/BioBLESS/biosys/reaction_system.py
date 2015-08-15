#!/usr/bin/env python

"""
The package about the reactions system and simulations
Data structure:
System:[reactions,species_name]
Reactions:[[[reactant,...],[product,...],constant,...]
Simulation structure:[[initial,...],stop_time]
Show structure:[species_to_show]
"""

__author__ = "Trumpet"

import numpy, scipy, scipy.misc, scipy.stats, pylab


class reaction_system(object):
    species_name = []
    reactions = []
    reactant = []
    product = []
    constant = []
    species_name_inverse = {}
    reactant_data = []
    product_data = []
    record = []

    @property
    def species_number(self):
        """
        Show the number of the species in this parts system
        Parameters:
            none
        Returns:
            int:the number of the species
        """
        return len(self.species_name)

    @property
    def reaction_number(self):
        """
        Show the number of the reactions in this system
        Parameters:
            none
        Returns:
            int:the number of the reactions
        """
        return len(self.reactions)

    def set_species_name(self, speciesname):
        """
        Set all the species and their name in this system
        Parameters:
            list:the list of the names of species
        Returns
            none
        """

        def choice(species):
            if isinstance(species, list):
                return species[0]
            else:
                return species

        self.species = speciesname
        self.species_name = numpy.array(map(choice, speciesname))
        self.species_name_inverse = {self.species_name[name_temp]: name_temp for name_temp in
                                     range(len(self.species_name))}

    def add_species_name(self, namestring):
        """
        Add one species into the system
        Parameters:
            the name of the species to be added
        Returns:
            none
        """
        species_temp = self.species_name.tolist()
        species_temp.append(namestring)
        self.set_species_name(species_temp)

    def del_species_name(self, namestring):
        """
        Delele one species from the system
        Parameters:
            the name of the species to be deleted
        Returns:
            none
        """
        species_temp = self.species_name.tolist()
        species_temp.remove(namestring)
        self.set_species_name(species_temp)

    def set_reactions(self, reaction):
        """
        Set all the reactions in this system
        Parameters:
            list:the list of the reactions
                the format of one reaction is a list : [[reactant,...],[product,...],constant]
        Returns:
            none
        """

        def itemfreq(temp):
            return numpy.array([]) if len(temp) == 0 else scipy.stats.itemfreq(temp)

        self.reactions = numpy.array(reaction)
        self.reactant, self.product, self.constant = self.reactions.transpose()
        self.reactant = numpy.array(self.reactant)
        self.product = numpy.array(self.product)
        self.constant = numpy.array(self.constant)
        self.reactant_data = map(itemfreq, (
            map(lambda temp1: map(lambda temp2: self.species_name_inverse[temp2], temp1), self.reactant)))
        self.product_data = map(itemfreq, (
            map(lambda temp1: map(lambda temp2: self.species_name_inverse[temp2], temp1), self.product)))

    def add_reaction(self, reaction):
        """
        Add one reaction into this system
        Parameters:
            list:the data of the reaction to be added
                looking for help(set_reactions) to find the format of this list 
        """
        reaction_temp = numpy.array([self.reactant, self.product, self.constant]).transpose().tolist()
        reaction_temp.append(reaction)
        self.set_reactions(reaction_temp)

    def del_reaction(self, reaction):
        """
        Delete one reaction into this system
        Parameters:
            list:the data of the reaction to be deleted
                looking for help(set_reactions) to find the format of this list 
        """
        reaction_temp = numpy.array([self.reactant, self.product, self.constant]).transpose().tolist()
        reaction_temp.remove(reaction)
        self.set_reactions(reaction_temp)

    @property
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

    @property
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

    def __init__(self, reactions, speciesname):
        """
        Init this system
        Parameters:
            list:the data of the reactions in this system
                looking for help(set_reactions) to find the format of this list
            list:the name of all the species in this system
        Returns
            none
        """
        self.set_species_name(speciesname)
        self.set_reactions(reactions)

<<<<<<< HEAD
    def __add__(self,other):
        return reaction_system(numpy.array([self.reactant,self.product,self.constant]).transpose().tolist()+numpy.array([other.reactant,other.product,other.constant]).transpose().tolist(),list(set(self.species_name.tolist()+other.species_name.tolist())))
    
    def simulate(self,initial,stop_time):
        '''
=======
    def __add__(self, other):
        return self.__class__(
            numpy.array([self.reactant, self.product, self.constant]).transpose().tolist() + numpy.array(
                [other.reactant, other.product, other.constant]).transpose().tolist(),
            list(set(self.species_name.tolist() + other.species_name.tolist())))

    def simulate(self, initial, stop_time):
        """
>>>>>>> 6986389594632bfa0e64712648950ce1b3c8dad4
        Simulate after given species initial number and stoptime
        Parameters:
            list:the number of the species at t=0
            real:the time to stop the simualtion
        Returns:
            list:the record of the simulation
                the format of the list is : [[time,[species current number,...]],...]
        """

        def intensity(single_reactant, current):
            return numpy.array(map(lambda species_temp: scipy.misc.comb(current[species_temp[0]], species_temp[1]),
                                   single_reactant)).prod()

        def intensity_list(reactant, current):
            return numpy.array(map(lambda single_reactant: intensity(single_reactant, current), reactant))

        def initialize(init_list):
            for single_init in init_list:
                if isinstance(single_init, list):
                    current[self.species_name_inverse[single_init[0]]] = single_init[1]

        current = numpy.array([0] * self.species_number)
        initialize(self.species)
        initialize(initial)
        time = 0
        self.record = [[time, current.tolist()]]
        reaction_number = self.reaction_number
        while time < stop_time:
            intensities = intensity_list(self.reactant_data, current)
            possibility = intensities * self.constant
            possibility_sum = possibility.sum()
            if possibility_sum == 0:
                break
            delta_time = -numpy.log(numpy.random.random()) / possibility_sum
            next_reaction = numpy.random.choice(numpy.arange(reaction_number),
                                                p=[i / possibility_sum for i in possibility])
            for species_temp in self.reactant_data[next_reaction]:
                current[species_temp[0]] -= species_temp[1]
            for species_temp in self.product_data[next_reaction]:
                current[species_temp[0]] += species_temp[1]
            time += delta_time
            self.record.append([time + 0, current.tolist()])
        return self.record

    def show_record(self, plot_list=None):
        """
        Show the graph of the record simulated
        Parameters:
            none
        Returns:
            none
        """
        plot_list = [self.species_name_inverse[single_species] for single_species in plot_list] \
            if plot_list else self.species_name_inverse.values()

        for species in plot_list:
            pylab.plot([x[0] for x in self.record], [x[1][species] for x in self.record])
        # !!! TODO: Something error HERE, pylab can only show once !!!
        # pylab.ion()
        pylab.show()

    @property
    def record_list(self, plot_list=None):
        """
        Return the list of the record simulated
        Parameters:
            none
        Returns:
            none
        """
        return self.species_name_inverse, [(x[0], x[1]) for x in self.record]

    def show_simulate(self, initial, stop_time, list_plot):
        """
        Simulate and show the graph
        Parameters:
            list:the number of the species at t=0
            real:the time to stop the simualtion
        Returns:
            none
        """
        self.simulate(initial, stop_time)
        self.show_record(list_plot)
