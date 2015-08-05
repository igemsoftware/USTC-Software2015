#!/usr/bin/env python

from parts_system import parts_system
import numpy

class substance:
    
    def __init__(self,subdata):
        name=subdata[0]
        constance=subdata[1]
        self.name=name
        self.DNA=name+'::DNA'
        self.RNA=name+'::RNA'
        self.protein=name+'::Protein'
        self.DNA_to_RNA=constance[0]
        self.RNA_to_protein=constance[1]
        self.RNA_die=constance[2]
        self.protein_die=constance[3]
        
    @property
    def GetSpecies(self):
        return [self.DNA,self.RNA,self.Protein]
    
    @property
    def GetReaction(self):
        return [[[self.DNA],[self.DNA,self.RNA],self.DNAtoRNA],
                [[self.RNA],[self.RNA,self.Protein],self.RNAtoProtein],
                [[self.RNA],[],self.RNADie],
                [[self.Protein],[],]self.ProteinDie]

def Negative(Reaction,Relulon,RConst):
    Reactant=Reaction[0]
    Product=Reaction[1]
    Const=Reaction[2]
    Temp=join(Reactant)+'to'+join(Product)
    return [[Reactant,Temp,Const],
            [Temp,Reactant,RConst],
            [Temp,Product,Const]]

class Gate:
    
    def __init__(self,gate):
        self.Type=gate[0]
        self.Output=gate[1]
        self.Input=gate[2]

    @property
    def Mod(self):
        
        return [SpeciesToAdd,ReactionToDelete,ReactionToAdd]

class DeviceSystem:

    def SetSubstances(self,subs):
        self.Substances=numpy.vectorize(lambda SubData:Substance(SubData))(subs)
        SubTemp=Substances.transpose()[0]
        self.SubstanceNameInverse={self SubTemp[NameTemp]:Substances[NameTemp]
            for NameTemp in range(len(self.SubTemp))}
        Species=numpy.vectorize(lambda x:x.GetSpecies)(self.Substances).flatten()
        Reactions=numpy.vectorize(lambda x:x.GetReaction)(self.Substances).flatten()
        self.PartsSystem=ReactionSystem(Reactions,Species)

    def SetGate(self,gates):
        gates[1]=map(lambda sub:self.SubstanceNameInverse[sub],gates[1])
        gates[2]=map(lambda sub:self.SubstanceNameInverse[sub],gates[2])
        self.Gates=numpy.vetorize(lambda GatData:Gate(GatData))(gates)
        for Gate in self.Gates:
            self.GateModReaction(Gate)
        
    def __init__(self,subs,gates):
        self.SubSource=subs
        self.SetSubstances(self.SetSource)
        self.GatSource=gates
        self.SetGate(self.GatSource)
        
    def GateModReaction(self,Gate):
        Mod=Gate.Mod
        map(lambda SingleSpecies:self.PartsSystem.AddSpecies(SingleSpecies),Mod[0])
        map(lambda SingReaction:self.PartsSystem.DelReaction(SingleReaction),Mod[1])
        map(lambda SingReaction:self.PartsSystem.AddReaction(SingleReaction),Mod[2])
        
