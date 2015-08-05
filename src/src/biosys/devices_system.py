#!/usr/bin/env python

from parts_system import parts_system
import numpy

class substance(object):
    '''
    Parameter:
        string:the name of the substance
        list:constance of the RNA_create,RNA_die,protein_create,protein_die
        string:the promotor of connect with this substance
    '''
    def __init__(self,name,constance,promotor):
        self.promoter=promotor
        self.name=name
        self.DNA=name+':DNA'
        self.RNA=name+':RNA'
        self.protein=name
        self.RNA_create=constance[0]
        self.RNA_die=consrtance[1]
        self.protein_create=constance[2]
        self.protein_die=constance[3]
        
    @property
    def get_species(self):
        return [self.DNA,self.RNA,self.protein]
    
    @property
    def get_effect(self):
        return [[[self.DNA,promotor+":Act"],[self.DNA,self.RNA,self.promoter+":Act"],self.RNA_create,[[],[]]],
                [[self.RNA],[],self.RNA_die,[[],[]]],
                [[self.RNA],[self.RNA,self.protein],protein_creat,[[],[]]]
                [[self.protein],[],],self.protein_die,[[],[]]]

class promoter(object):
    '''
    Parameter:
        string:the name of promoter
        gate:
            ["Strong"]|
            ["Not",[["",int],..]]|
            ["Nor",[["",int]..]]|
            [Nand[..]
            ["And",[...]]|
            [Or[..]|
    '''
    def __init__(self,name,active,gate):
        self.name=name
        self.active_name=name+":Act"
        
    @property
    def get_species(self):
        return [self.name,self.active_name]
    
    @property
    def get_effect(self):
        if gate[0]=="Strong":
            return [[self.name],[self.active],active,[[],[]]]
        if (gate[0]=="Not")or(gate[0]=="Nor"):
            return [[self.name],[self.active],active,[gate[1],[]]]
        if gate[0]=="Or":
            return [[self.name],[self.active],0,[[],gate[1]]]
        if gate[0]=="And":
            pass
        if gate[0]=="Nand":
            pass

class device_system(parts_system):
    
    def set_substance(self,substaces):
        self.substances=[]
        for single_substance in substances:
            self.substances.append(substance(single_substance))
        for single_substance in self.substances:
            species+=single_substance.get_species
            effect+=single_substance.get_effect
    
    def set_promotors(self,promotors):
        self.promotors=[]
        for single_promotors in promotors:
            self.promotors,append(promotors(single_promotor))
        for single_promotor in self.promotors:
            species+=single_promotors.get_species
            effect+=single_promoters.geteffect
    
    def __init__(self,substances,promotors):
        self.species=[]
        self.effect=[]
        self.set_substance(substances)
        self.set_promoters(promotors)
        self.set_species_and_effect(self.species,self.effect)
