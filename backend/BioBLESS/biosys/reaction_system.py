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

C = False

if C:
    try:
        import ctypes

        try:
            SIMULATE = ctypes.CDLL('./simulate.so')
        except:
            pass
        try:
            SIMULATE = ctypes.CDLL('./BioBLESS/biosys/simulate.so')
        except:
            pass
        STDLIB = ctypes.CDLL('libc.so.6')
    except ImportError:
        C = False

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

        """
struct current_data
{
  float time;
  long long *numbers;
};
struct reaction_data
{
  int sub_num;
  int *subs;
};
struct reaction_change_data
{
  int reaction_num;
  int *reacs;
};
struct record_data
{
  struct current_data *ans;
  int num;
};
struct record_data simulate(
  float stop_time,
  int species_number,
  int reaction_number,
  long long *current,//initial             long long * species_number
  float *constant,//                             float * reaction_number
  struct reaction_data *reactant_data,//     reaction_data * reaction_number
  struct reaction_data *product_data,
  struct reaction_change_data *reaction_link
  );
        """

        if C:
            """
            class c_current_data(ctypes.Structure):
                _fields_ = [
                    ("time", ctypes.c_float),
                    ("numbers", ctypes.POINTER(ctypes.c_longlong))
                ]

            class c_reaction_data(ctypes.Structure):
                _fields_ = [
                    ("sub_num", ctypes.c_int),
                    ("subs", ctypes.POINTER(ctypes.c_int))
                ]

            class c_reaction_change_data(ctypes.Structure):
                _fields_ = [
                    ("reaction_num", ctypes.c_int),
                    ("reacs", ctypes.POINTER(ctypes.c_int))
                ]

            class c_record_data(ctypes.Structure):
                _fields_ = [
                    ("ans",ctypes.POINTER(c_current_data)),
                    ("num",ctypes.c_int)
                ]

            c_stop_time = ctypes.c_float(stop_time)
            c_species_number = ctypes.c_int(self.species_number)
            c_reaction_number = ctypes.c_int(self.reaction_number)

            STDLIB.malloc.restype = ctypes.POINTER(ctypes.c_longlong)
            c_current = STDLIB.malloc(ctypes.sizeof(ctypes.c_longlong)*self.species_number)
            #c_current = (ctypes.c_longlong*self.species_number)()
            for i in range(self.species_number):
                c_current[i] = current[i]

            STDLIB.malloc.restype = ctypes.POINTER(ctypes.c_float)
            c_constant = STDLIB.malloc(ctypes.sizeof(ctypes.c_float)*self.reaction_number)
            for i in range(self.reaction_number):
                c_constant[i] = self.constant[i]

            STDLIB.malloc.restype = ctypes.POINTER(c_reaction_data)
            c_reactant_data = STDLIB.malloc(ctypes.sizeof(c_reaction_data)*self.reaction_number)
            c_product_data = STDLIB.malloc(ctypes.sizeof(c_reaction_data)*self.reaction_number)

            STDLIB.malloc.restype = ctypes.POINTER(ctypes.c_int)
            for i in range(self.reaction_number):
                c_reactant_data[i].sub_num = len(self.reactant_data[i])
                c_reactant_data[i].subs = STDLIB.malloc(ctypes.sizeof(ctypes.c_int)*c_reactant_data[i].sub_num)
                for j in range(c_reactant_data[i].sub_num):
                    c_reactant_data[i].subs[j] = self.reactant_data[i][j]
                c_product_data[i].sub_num = len(self.product_data[i])
                c_product_data[i].subs = STDLIB.malloc(ctypes.sizeof(ctypes.c_int)*c_product_data[i].sub_num)
                for j in range(c_product_data[i].sub_num):
                    c_product_data[i].subs[j] = self.product_data[i][j]

            STDLIB.malloc.restype = ctypes.POINTER(c_reaction_change_data)
            c_reaction_link = STDLIB.malloc(ctypes.sizeof(c_reaction_change_data)*self.reaction_number)

            STDLIB.malloc.restype = ctypes.POINTER(ctypes.c_int)
            for i in range(self.reaction_number):
                c_reaction_link[i].reaction_num = len(reaction_to_change[i])
                c_reaction_link[i].reacs = STDLIB.malloc(ctypes.sizeof(ctypes.c_int)*c_reaction_link[i].reaction_num)
                for j in range(c_reaction_link[i].reaction_num):
                    c_reaction_link[i].reacs[j] = reaction_to_change[i][j]

            SIMULATE.simulate.restype = c_record_data
            print "s start in py"
            
            ans = SIMULATE.simulate(
                c_stop_time,
                c_species_number,
                c_reaction_number,
                c_current,
                c_constant,
                c_reactant_data,
                c_product_data,
                c_reaction_link)

            print "s done in py"
            #print "s really done in py"
            num = ans.num;
            #print num
            self.record = []
            for i in range(num):
                self.record.append([ans.ans[i].time,[ans.ans[i].numbers[j] for j in range(self.species_number)]])
                print self.record[-1]
                #print ans.ans[i].time
            #print "set done!"
            #free
            #STDLIB.free(c_current)
            #STDLIB.free(c_constant)

            #for i in range(self.reaction_number):
            #    STDLIB.free(c_reactant_data[i].subs)
            #    STDLIB.free(c_product_data[i].subs)

            #STDLIB.free(c_reactant_data)
            #STDLIB.free(c_product_data)

            #for i in range(self.reaction_number):
            #    STDLIB.free(c_reaction_link[i].reacs)
            #STDLIB.free(c_reaction_link)

            #free ans TODO

            return self.record"""
            pass

        else:
            if DEBUG:
                sw_alloc("Sum")
                sw_start("Sum")
                sw_alloc("1")
                sw_alloc("2")
                sw_alloc("3")
                sw_alloc("4")
            while time < stop_time:
                if DEBUG:
                    sw_start("1")
                current = [x for x in current]
                if possibility_sum == 0:
                    break
                delta_time = -math.log(random.random()) / possibility_sum
                if DEBUG:
                    sw_accmu("1")
                    sw_start("2")
                randomer = random.random() * possibility_sum
                sumer = 0
                next_reaction = 0
                while True:
                    sumer += possibility[next_reaction]
                    if sumer >= randomer:
                        break
                    next_reaction += 1
                if DEBUG:
                    sw_accmu("2")
                    sw_start("3")
                for species_temp in self.reactant_data[next_reaction]:
                    current[species_temp] -= 1
                for species_temp in self.product_data[next_reaction]:
                    current[species_temp] += 1
                time += delta_time
                #self.record.append([time + 0, current])

                self.record["t"].append(time)
                for i in range(self.species_number):
                    if flag[i]:
                        self.record[self.species_name[i]].append(current[i])

                if DEBUG:
                    sw_accmu("3")
                    sw_start("4")
                for i in reaction_to_change[next_reaction]:
                    possibility_sum -= possibility[i]
                    possibility[i] = self.constant[i]
                    for j in self.reactant_data[i]:
                        possibility[i] *= current[j]
                    possibility_sum += possibility[i]
                if DEBUG:
                    sw_accmu("4")
            if DEBUG:
                sw_accmu("Sum")
                sw_print("1")
                sw_print("2")
                sw_print("3")
                sw_print("4")
                sw_print("Sum")
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
