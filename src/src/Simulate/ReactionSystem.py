#!/usr/bin/env python

'''
The package about the reaction system and simulations
Data Structure:
System:[Reactions,SpeciesName]
Reactions:[[[Reactant,...],[Product,...],JLYConstance,...]
Simulation Structure:[[Initial,...],StopTime]
'''

__author__="Trumpet"

import numpy,scipy,scipy.misc,scipy.stats,pylab

class ReactionSystem(object):
    '''
    Parameters:
    '''
    
    @property
    def SpeciesNumber(self):
        '''
        Show the number of the species in this reaction system
        Parameters:
            none
        Returns:
            int:the number of the species
        '''
        return len(self.SpeciesName)
    
    @property
    def ReactionNumber(self):
        '''
        Show the number of the reactions in this system
        Parameters:
            none
        Returns:
            int:the number of the reactions
        '''
        return len(self.Reactions)
    
    def SetSpeciesName(self,speciesname):
        '''
        Set all the species and their name in this system
        Parameters:
            list:the list of the names of species
        Returns
            none
        '''
        self.SpeciesName=numpy.array(speciesname)
        self.SpeciesNameInverse={self.SpeciesName[NameTemp]:NameTemp
            for NameTemp in range(len(self.SpeciesName))}

    def AddSpeciesName(self,namestring):
        '''
        Add one species into the system
        Parameters:
            the name of the species to be added
        Returns:
            none
        '''
        SpeciesTemp=self.SpeciesName.tolist()
        SpeciesTemp.append(namestring)
        self.SetSpeciesName(SpeciesTemp)
    
    def DelSpeciesName(self,namestring):
        '''
        Delele one species from the system
        Parameters:
            the name of the species to be deleted
        Returns:
            none
        '''
        SpeciesTemp=self.SpeciesName.tolist()
        SpeciesTemp.remove(namestring)
        self.SetSpeciesName(SpeciesTemp)
    
    def SetReactions(self,reactions):
        '''
        Set all the reactions in this system
        Parameters:
            list:the list of the reactions
                the format of one reaction is a list : [[Reactant,...],[Product,...],JLYConstance]
        Returns:
            none
        '''
        self.Reactions=numpy.array(reactions)
        self.Reactant,self.Product,self.JLYConstance=self.Reactions.transpose()
        self.Reactant=numpy.array(self.Reactant)
        self.Product=numpy.array(self.Product)
        self.JLYConstance=numpy.array(self.JLYConstance)
        self.ReactantData=map(lambda Temp1:scipy.stats.itemfreq(Temp1),
            (map(lambda Temp1:map(lambda Temp2
            :self.SpeciesNameInverse[Temp2],Temp1),self.Reactant)))
        self.ProductData=map(lambda Temp1:scipy.stats.itemfreq(Temp1),
            (map(lambda Temp1:map(lambda Temp2
            :self.SpeciesNameInverse[Temp2],Temp1),self.Product)))

    def AddReaction(self,reaction):
        '''
        Add one reaction into this system
        Parameters:
            list:the data of the reaction to be added
                looking for help(SetReactions) to find the format of this list 
        '''
        ReactionTemp=numpy.array([self.Reactant,self.Product,self.JLYConstance]).transpose().tolist()
        ReactionTemp.append(reaction)
        self.SetReactions(ReactionTemp)

    def DelReaction(self,reaction):
        '''
        Delete one reaction into this system
        Parameters:
            list:the data of the reaction to be deleted
                looking for help(SetReactions) to find the format of this list 
        '''
        ReactionTemp=numpy.array([self.Reactant,self.Product,self.JLYConstance]).transpose().tolist()
        ReactionTemp.remove(reaction)
        self.SetReactions(ReactionTemp)
    
    @property
    def ShowSpecies(self):
        '''
        Print the names of all the species in this system
        Parameters:
            none
        Returns:
            none
        '''
        PrintTemp=""
        for SingleSpecies in self.SpeciesName:
            PrintTemp+=SingleSpecies+" "
        print PrintTemp

    @property
    def ShowReaction(self):
        '''
        Print the data of all the reactions the  in this system
        Parameters:
            none
        Returns:
            none
        '''
        print "Reactant\t\tProduct\t\tJLYConstance"
        for SingleReaction in self.Reactions:
            PrintTemp=""
            for Reactant in SingleReaction[0]:
                PrintTemp+=Reactant+" "
            PrintTemp+="\t\t"
            for Product in SingleReaction[1]:
                PrintTemp+=Product+" "
            PrintTemp+="\t\t"+str(SingleReaction[2])
            print PrintTemp
    
    def __init__(self,reactions,speciesname):
        '''
        Init this system
        Parameters:
            list:the data of the reactions in this system
                looking for help(SetReactions) to find the format of this list
            list:the name of all the species in this system
        Returns
            none
        '''
        self.SetSpeciesName(speciesname)
        self.SetReactions(reactions)
    
    def Simulate(self,Initial,StopTime):
        '''
        Simulate after given species initial number and stoptime
        Parameters:
            list:the number of the species at t=0
            real:the time to stop the simualtion
        Returns:
            list:the record of the simulation
                the format of the list is : [[time,[species current number,...]],...]
        '''
        def Intensity(SingleReactant,Current):
            return numpy.array(map(lambda SpeciesTemp:
                scipy.misc.comb(Current[SpeciesTemp[0]],
                SpeciesTemp[1]),SingleReactant)).prod()
        def IntensityList(Reactant,Current):
            return map(lambda SingleReactant:
                Intensity(SingleReactant
                ,Current),Reactant)
        Current=numpy.array(Initial)
        Time=0
        self.Record=[[Time,Current.tolist()]]
        reactionnumber=self.ReactionNumber
        while Time<StopTime:
            Intensities=IntensityList(self.ReactantData,Current)
            Possibility=Intensities*self.JLYConstance
            PossibilitySum=Possibility.sum()
            if PossibilitySum==0:break
            DeltaTime=-numpy.log(numpy.random.random())/PossibilitySum
            NextReaction=numpy.random.choice(
                numpy.arange(reactionnumber),
                p=Possibility/PossibilitySum)
            for SpeciesTemp in self.ReactantData[NextReaction]:
                Current[SpeciesTemp[0]]-=SpeciesTemp[1]
            for SpeciesTemp in self.ProductData[NextReaction]:
                Current[SpeciesTemp[0]]+=SpeciesTemp[1]
            Time=Time+DeltaTime
            self.Record.append([Time+0,Current.tolist()])
        return self.Record
    
    def ShowRecord(self):
        '''
        Show the graph of the record simulated
        Parameters:
            none
        Returns:
            none
        '''
        for Species in range(self.SpeciesNumber):
            pylab.plot(map(lambda x:x[0],self.Record),map(lambda x:x[1][Species],self.Record))
        pylab.show()
    
    def ShowSimulate(self,Initial,StopTime):
        '''
        Simulate and show the graph
        Parameters:
            list:the number of the species at t=0
            real:the time to stop the simualtion
        Returns:
            none
        '''
        self.Simulate(Initial,StopTime)
        self.ShowRecord()
