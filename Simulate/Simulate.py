#!/usr/bin/python

'''
Data Structure
System=[Reactions,Species]
Species=[[Specy,Initial]..]
Reactions=[[[Reactant..],[Product..],JLYConstance]..]
'''

__author__="Trumpet"

import numpy,scipy,scipy.misc,scipy.stats

def Intensity(SingleReactant,Current):
    '''
    print SingleReactant
    print Current
    print "trance"
    '''
    return numpy.array(map(lambda SpeciesTemp:
        scipy.misc.comb(Current[SpeciesTemp[0]],
        SpeciesTemp[1]),SingleReactant)).prod()

def IntensityList(Reactant,Current):
    '''
    print Reactant
    print Current
    print Reactant[0]
    print "trace"
    '''
    return map(lambda SingleReactant:
        Intensity(SingleReactant
        ,Current),Reactant)

def Simulate(System,StopTime):
    Reactions,Species=System
    Reactions=numpy.array(Reactions)
    Species=numpy.array(Species)
    SpeciesName,Initial=Species.transpose()
    SpeciesName=numpy.array(SpeciesName)
    Initial=numpy.array(Initial)
    Initial=numpy.vectorize(lambda x:int(x))(Initial)
    SpeciesNumber=len(Species)
    ReactionNumber=len(Reactions)
    Reactant,Product,JLYConstace=Reactions.transpose()
    Reactant=numpy.array(Reactant)
    Product=numpy.array(Product)
    JLYConstace=numpy.array(JLYConstace)
    SpeciesNameInverse={SpeciesName[i]:i
        for i in range(len(SpeciesName))}
    ReactantData=map(lambda x:scipy.stats.itemfreq(x),
        (map(lambda x:map(lambda y
        :SpeciesNameInverse[y],x),Reactant)))
    ProductData=map(lambda x:scipy.stats.itemfreq(x),
        (map(lambda x:map(lambda y
        :SpeciesNameInverse[y],x),Product)))
    Current=Initial
    Time=0
    Record=[[Time,Current]]
    while Time<StopTime:
        '''
        print System
        print Reactions
        print Species
        print SpeciesName
        print Initial
        print SpeciesNumber
        print ReactionNumber
        print Reactant
        print Product
        print JLYConstace
        print SpeciesNameInverse
        print Current
        print Time
        print Record
        print "trace"
        '''
        Intensities=IntensityList(ReactantData,Current)
        Possibility=Intensities*JLYConstace
        PossibilitySum=Possibility.sum()
        if Possibility==0:break
        DeltaTime=-numpy.log(numpy.random.random())/Possibility
        NextReaction=numpy.random.choice(
            numpy.arange(ReactionNumber),
            p=Possibility/PossibilitySum)
        for SpeciesTemp in ReactantData[NextReaction]:
            Current[SpeciesTemp[0]]-=SpeciesTemp[1]
        for SpeciesTemp in ProductData[NextReaction]:
            Current[SpeciesTemp[0]]+=SpeciesTemp[1]
        Time=Time+DeltaTime[0]
        Record.append([Time+0,Current.copy()])
    return Record
