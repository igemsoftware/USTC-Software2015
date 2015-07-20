import ReactionSystem
A=ReactionSystem.ReactionSystem([[["a"],["b"],1],[["b"],["c"],1]],["a","b","c"])
A.ShowSimulate([1000,0],10)
A.ShowSpecies
A.DelSpeciesName("c")
A.ShowSpecies
A.DelReaction([["b"],["c"],1])
A.ShowReaction
A.ShowSimulate([1000,0],10)
A.AddSpeciesName("d")
A.AddReaction([["a"],["d"],1])
A.ShowSimulate([1000,0,0],10)

