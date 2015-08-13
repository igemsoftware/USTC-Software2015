#!/usr/bin/env python

from parts_system import parts_system
#from database import check,find

class and_1(parts_system):
    def __init__(self,promoter,RBS,coding,R1,R2):
        self.promoter=promoter
        self.RBS=RBS
        self.coding=coding
        self.R1=R1
        self.R2=R2
        temp=self.get_species_and_effect
        self.set_species_and_effect(temp[0],temp[1])
    @property
    def get_species_and_effect(self):
        self.species=[self.promoter,self.RBS,self.coding,self.R1,self.R2]
        self.effect=[
            [[self.promoter],[self.promoter,self.RBS],0,[[],[[self.R1,0.01]]]],
            [[self.RBS],[self.coding,self.RBS],0,[[],[[self.R2,0.1]]]],
            [[self.RBS],[],0.1,[[],[]]],
            [[self.coding],[],0.05,[[],[]]],
        ]
        return(self.species,self.effect)

class not_1(parts_system):
    def __init__(self,promoter_1,RBS,lacI,promoter_2,coding,S):
        self.promoter_1=promoter_1
        self.RBS=RBS
        self.lacI=lacI
        self.promoter_2=promoter_2
        self.coding=coding
        self.S=S
        temp=self.get_species_and_effect
        self.set_species_and_effect(temp[0],temp[1])
    @property
    def get_species_and_effect(self):
        self.species=[self.promoter_1,self.RBS,self.lacI,self.promoter_2,self.coding,self.S]
        self.effect=[
            [[self.promoter_1],[self.promoter_1,self.RBS],0.01,[[],[]]],
            [[self.RBS],[],0.1,[[],[]]],
            [[self.RBS],[self.lacI,self.RBS],0,[[],[[self.S,0.5]]]],
            [[self.lacI],[],0.05,[[],[]]],
            [[self.promoter_2],[self.promoter_2,self.coding],0.5,[[[self.lacI,20]],[]]],
            [[self.coding],[],0.05,[[],[]]]
        ]
        return(self.species,self.effect)
