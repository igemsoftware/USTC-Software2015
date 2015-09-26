#!/usr/bin/env python
"""
The package about the reactions system and simulations
Data structure:

System:[reactions,species]
species:[species_name,initial]|species_name
Reactions:[[[reactant,...],[product,...],constant,...]
Simulation structure:[[[species,initial],...],stop_time]
Show structure:[species_to_show]

Example
---------
Build two reaction system,and add them, and simulation, and show the result

>>> A = ReactionSystem([[["a"], ["b"], 1]], [["a", 100], "b"]) + ReactionSystem([[["b"], ["c"], 1]], [["b", 100], "c"])
>>> A.simulate(10)
>>> A.show_record(["a", "b", "c"])

"""

__author__ = "Trumpet"

DEBUG = False
import random, math

try:
    from BioBLESS.settings import DEBUG
except ImportError:
    pass
from stopwatch import sw_alloc, sw_start, sw_accmu, sw_print

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
        for i in range(len(self.species)):
            if isinstance(self.species[i], str) or isinstance(self.species[i], unicode):
                self.species[i] = [self.species[i], 0]
        self.species_name = [i[0] for i in self.species]
        self.species_number = len(self.species_name)
        self.species_name_inverse = {self.species_name[i]: i for i in range(self.species_number)}

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
        reaction = [[self.reactant[i], self.product[i], self.constant[i]] for i in range(self.reaction_number)] + [
            [other.reactant[i], other.product[i], other.constant[i]] for i in range(other.reaction_number)]
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
        species_to_reaction = [[] for i in range(self.species_number)]
        for i in range(self.reaction_number):
            for j in self.reactant_data[i]:
                species_to_reaction[j].append(i)
            for j in self.product_data[i]:
                species_to_reaction[j].append(i)

        reaction_to_change = [[] for i in range(self.reaction_number)]
        for i in range(self.reaction_number):
            for j in self.reactant_data[i]:
                reaction_to_change[i] += species_to_reaction[j]
            for j in self.product_data[i]:
                reaction_to_change[i] += species_to_reaction[j]
        reaction_to_change = [list(set(i)) for i in reaction_to_change]

        delta = stop_time/1000.
        current = [i[1] for i in self.species]
        time = 0
        temp = []
        flag = []
        for i in range(self.species_number):
            try:
                int(self.species_name[i][1::])
                temp.append([self.species_name[i],[current[i]]])
                flag.append(True)
            except ValueError:
                flag.append(False)
        if temp == []:
            temp = [[self.species_name[i],[current[i]]] for i in range(self.species_number)]
            flag = [True for i in range(self.species_number)]
        temp.append(["t",[0]])
        self.record = dict(temp)
        possibility = [i for i in self.constant]
        for i in range(self.reaction_number):
            for j in self.reactant_data[i]:
                possibility[i] *= current[j]
        possibility_sum = 0
        for i in possibility:
            possibility_sum += i

        else:
            '''if DEBUG:
                sw_alloc("Sum")
                sw_start("Sum")
                sw_alloc("1")
                sw_alloc("2")
                sw_alloc("3")
                sw_alloc("4")'''
            while time < stop_time:
                '''if DEBUG:
                    sw_start("1")'''
                #current = [x for x in current]######################
                if possibility_sum == 0:
                    break
                delta_time = -math.log(random.random()) / possibility_sum
                '''if DEBUG:
                    sw_accmu("1")
                    sw_start("2")'''
                randomer = random.random() * possibility_sum
                sumer = 0
                next_reaction = 0
                while True:
                    sumer += possibility[next_reaction]
                    if sumer >= randomer:
                        break
                    next_reaction += 1
                '''if DEBUG:
                    sw_accmu("2")
                    sw_start("3")'''
                for species_temp in self.reactant_data[next_reaction]:
                    current[species_temp] -= 1
                for species_temp in self.product_data[next_reaction]:
                    current[species_temp] += 1
                time += delta_time
                #self.record.append([time + 0, current])

                if time - self.record["t"][-1]>delta:
                    self.record["t"].append(time)
                    for i in range(self.species_number):
                        if flag[i]:
                            self.record[self.species_name[i]].append(current[i])

                '''if DEBUG:
                    sw_accmu("3")
                    sw_start("4")'''
                for i in reaction_to_change[next_reaction]:
                    possibility_sum -= possibility[i]
                    possibility[i] = self.constant[i]
                    for j in self.reactant_data[i]:
                        possibility[i] *= current[j]
                    possibility_sum += possibility[i]
                '''if DEBUG:
                    sw_accmu("4")
            if DEBUG:
                sw_accmu("Sum")
                sw_print("1")
                sw_print("2")
                sw_print("3")
                sw_print("4")
                sw_print("Sum")'''
            #print self.record
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
        plot_list = plot_list if plot_list else self.species_name
        for species in plot_list:
            try:
                plt.plot(self.record["t"], self.record[species])
            except KeyError:
                pass
        plt.show()
        #print self.record_list

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
        return self.record
        # return [self.species_name_inverse,self.record]

    def simulation(self):
        """
        Just do simulation
        Parameters:
            none
        Returns:
            none
        """
        self.simulate(self.time)
