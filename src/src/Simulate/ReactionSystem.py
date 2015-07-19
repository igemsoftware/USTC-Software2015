#!/usr/bin/python

'''
Data Structure
System=[Reactions,SpeciesName,Initial]
Reactions=[[[Reactant..],[Product..],JLYConstance]..]
eg:ReactionSystem.ReactionSystem([[["a"],["b"],1]],["a","b"]).Simulate([1000,0],1)
'''

__author__="Trumpet"

import numpy,scipy,scipy.misc,scipy.stats

class ReactionSystem(object):
    
    @property
    def SpeciesNumber(self):
        return len(self.Species)
    
    @property
    def ReactionNumber(self):
        return len(self.Reactions)
    
    def SetSpeciesName(self,speciesname):
        self.SpeciesName=numpy.array(speciesname)
        self.SpeciesNameInverse={self.SpeciesName[NameTemp]:NameTemp
            for NameTemp in range(len(self.SpeciesName))}
    
    def SetReactions(self,reactions):
        self.Reactions=numpy.array(reactions)
        self.Reactant,self.Product,self.JLYConstace=self.Reactions.transpose()
        self.Reactant=numpy.array(self.Reactant)
        self.Product=numpy.array(self.Product)
        self.JLYConstace=numpy.array(self.JLYConstace)
        self.ReactantData=map(lambda Temp1:scipy.stats.itemfreq(Temp1),
            (map(lambda Temp1:map(lambda Temp2
            :self.SpeciesNameInverse[Temp2],Temp1),self.Reactant)))
        self.ProductData=map(lambda Temp1:scipy.stats.itemfreq(Temp1),
            (map(lambda Temp1:map(lambda Temp2
            :self.SpeciesNameInverse[Temp2],Temp1),self.Product)))
    
    def __init__(self,reactions,speciesname):
        self.SetSpeciesName(speciesname)
        self.SetReactions(reactions)
    
    def Simulate(self,Initial,StopTime):
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
        Record=[[Time,Current.tolist()]]
        reactionnumber=self.ReactionNumber
        while Time<StopTime:
            Intensities=IntensityList(self.ReactantData,Current)
            Possibility=Intensities*self.JLYConstace
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
            Record.append([Time+0,Current.tolist()])
        return Record
