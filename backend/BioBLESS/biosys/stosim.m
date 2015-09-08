maptoname[name_] := Thread[Range[Length[name]] -> name];
maptono[name_] := Thread[name -> Range[Length[name]]];

intensity[sour_, cur_] := Times @@ ((Binomial[cur[[#[[1]]]], #[[2]]]) & /@ sour);
intensitylist[reactant_, cur_] := intensity[#, cur] & /@ reactant;

Simulate[system_, initial_, stoptime_, plotspec_] := Module[
        {reactnum, c, reaction, reactant, product, current, time, record, h, a, sum, tao, mu, asum, nosys, noini, toname, tono, name, plt},

        reactnum = Length[system];
        c = (#[[2]]) & /@ system;

        name = Union[Flatten[(#[[1]]) & /@ system, Infinity]];
        toname = maptoname[name];
        tono = maptono[name];
        nosys = system /. tono;
        noini = #[[2]] & /@ SortBy[initial /. tono, #[[1]] &];

        reaction = (#[[1]]) & /@ nosys;
        reactant = Counts[#[[1]]] & /@ reaction // Normal;
        product = Counts[#[[2]]] & /@ reaction // Normal;

        current = noini;
        time = 0.;

        record = {{time, current}};

        Print[initial];

        While[
	        time < stoptime,
	        h = intensitylist[reactant, current];
    	        If[h == Table[0, {reactnum}], Break[]];
    	        a = h*c; asum = Plus @@ a;
    	        tao = Log[1/Random[]]/asum;
    	        mu = RandomChoice[a -> Range[reactnum]];
    	        (current[[#[[1]]]] -= #[[2]]) & /@ (reactant[[mu]]);
    	        (current[[#[[1]]]] += #[[2]]) & /@ (product[[mu]]);
    	        time = time + tao;
    	        Print[{Floor[time],Table[{i,current[[i/.tono]]},{i,plotspec}]}];
    	        AppendTo[record, {time, current}];
        ];

        record = {#[[1]], #[[2, plotspec/.tono]]} & /@ record;
        plt = ListPlot[
		Table[({#[[1]],#[[2,i]]}) & /@ record,{i,1,Length[plotspec]}],
       	 	Joined->True,
		InterpolationOrder->1,
		Frame->True,
		PlotLegends->plotspec,
		ImageSize->{1024,768},
		PlotRange->All
	      ];
        (* Export[$Playground<>"/temp.txt", ToString[{((#[[1]])& /@ record)}~Join~{Transpose[(#[[2,All]])&/@record]}]]; *)
        Export[$Playground<>"/temp.bmp", plt];
                                                     ];

(*DNA-mRNA-Protein construction*)

DNAtoProtein[dna_, {c1_, c2_}, {d1_, d2_}]:={
        {{{dna},{dna,dna<>"::mRNA"}},c1},
        {{{dna<>"::mRNA"},{dna<>"::Protein",dna<>"::mRNA"}},c2},
        {{{dna<>"::mRNA"},{}},d1},
        {{{dna<>"::Protein"},{}},d2}
        };

(*negative regulation construction*)

NegativeRegulate[{reaction_, c_}, regulon_, r_]:=Module[
        {temp=StringJoin@@((#<>"*")&/@(reaction[[1]]))},
        {
                {{reaction[[1]],{temp}},c},
                {{{temp,regulon},Append[reaction[[1]],regulon]},r*c},
                {{{temp},reaction[[2]]},c}
        }];

(*global trans and decay const*)



(*not gate construction*)

NotGate[i_, o_]:=Module[
        {dna=StringCases[o, x__~~"::"->x][[1]]},
        Join[
                DNAtoProtein[dna,{TRans1,Trans2},{Decay1,Decay2}][[2;;]],
                NegativeRegulate[{{{dna},{dna,dna<>"::mRNA"}},Trans1},i,Regulon]
        ]];

(*not gate*)

notgate = NotGate["lacI::Protein","gfp::Protein"];

notgateinit = {
        {"lacI::Protein",100},
        {"gfp",1000},
        {"gfp*",0},
        {"gfp::mRNA",0},
        {"gfp::Protein",0}
};

(*nor gate construction*)

NorGate[{i1_, i2_}, o_] := 
        Module[
	        {dna=StringCases[o,x__~~"::"->x][[1]]},
	        Union[
		        Join[
			        DNAtoProtein[dna,{Trans1,Trans2},{Decay1,Decay2}][[2;;]],
			        NegativeRegulate[{{{dna},{dna,dna<>"::mRNA"}},Trans1},i1,Regulon],
			        NegativeRegulate[{{{dna},{dna,dna<>"::mRNA"}},Trans1},i2,Regulon]
		        ]
	        ]
        ];

(*nor gate*)

norgate = NorGate[{"lacI::Protein","tetR::Protein"},"gfp::Protein"];

norgateinit = {
        {"lacI::Protein",100},
        {"tetR::Protein",75},
        {"gfp",1000},
        {"gfp*",0},
        {"gfp::mRNA",0},
        {"gfp::Protein",0}
}

(*and gate: from 3 not gate and a nor gate*)

AndGate[name_, {i1_, i2_}, o_]:=
        Module[
	        {
		        temp1=name<>".temp1",
		        temp2=name<>".temp2"
	        },
	        Union[
		        Join[
			        NotGate[i1,temp1<>"::Protein"],
			        NotGate[i2,temp2<>"::Protein"],
			        NorGate[{temp1<>"::Protein",temp2<>"::Protein"},o]	
		        ]
	        ]
        ];

(*and gate*)

andgate = AndGate["this",{"lacI::Protein","tetR::Protein"}, "gfp::Protein"];

andgateinit = {
        {"lacI::Protein",1000},
        {"tetR::Protein",1000},
        {"this.temp1",1000},
        {"this.temp2",1000},
        {"this.temp1*",0},
        {"this.temp2*",0},
        {"this.temp1::mRNA",0},
        {"this.temp2::mRNA",0},
        {"this.temp1::Protein",0},
        {"this.temp2::Protein",0},
        {"gfp",1000},
        {"gfp*",0},
        {"gfp::mRNA",0},
        {"gfp::Protein",0}
};


(*three not gate*)

vib = Join[
        DNAtoProtein["tetR",{Trans1,Trans2},{Decay1,Decay2}][[2;;]],
        DNAtoProtein["cI",{Trans1,Trans2},{Decay1,Decay2}][[2;;]],
        DNAtoProtein["lacI",{Trans1,Trans2},{Decay1,Decay2}][[2;;]],
        NegativeRegulate[{{{"tetR"},{"tetR","tetR::mRNA"}},Trans1},"lacI::Protein",Regulon],
        NegativeRegulate[{{{"cI"},{"cI","cI::mRNA"}},Trans1},"tetR::Protein",Regulon],
        NegativeRegulate[{{{"lacI"},{"lacI","lacI::mRNA"}},Trans1},"cI::Protein",Regulon]
      ];

vibinit = {
        {"tetR",1000},
        {"tetR*",0},
        {"tetR::mRNA",0},
        {"tetR::Protein",0},

        {"cI",1000},
        {"cI*",0},
        {"cI::mRNA",0},
        {"cI::Protein",0},

        {"lacI",1000},
        {"lacI*",0},
        {"lacI::mRNA",0},
        {"lacI::Protein",0}
};

(*DNA to mRNA to Protein*)

drp = DNAtoProtein["lacI",{0.01,0.5},{0.1,0.05}]

drpinit = {
        {"lacI",100},
        {"lacI::mRNA",0},
        {"lacI::Protein",0}
};

(*negative regulate*)

neg = NegativeRegulate[{{{"A"},{"B"}},0.1},"temp",2];

neginit = {
        {"A",500},
        {"B",0},
        {"temp",100},
        {"A*",0}
};

positiveRegulate[dna_,regulon_,{{trans1_, trans2_},{decay1_, decay2_},reg_}]:=
        {
        {{{dna},{dna,dna<>"::mRNA"}},trans1},
        {{{dna<>"::mRNA"},{dna<>"::mRNA",dna<>"::Protein"}},trans2},
        {{{dna<>"::mRNA"},{}},decay1},
        {{{dna<>"::Protein"},{}},decay2},
        {{{dna,regulon},{dna,regulon,dna<>"::mRNA"}},trans1*reg}
        }

trans1=0.001;
trans2=0.005;
decay1=trans1*10;
decay2=trans2*10;
bind=0.005
reg=2;

testCircuit = Join[
        positiveRegulate["ipgC","Ara",{{trans1,trans2},{decay1,decay2},reg}],
        positiveRegulate["mxiE","IPTG",{{trans1,trans2},{decay1,decay2},reg}],
        positiveRegulate["sicA","ipgC+mxiE",{{trans1,trans2},{decay1,decay2},reg}],
        positiveRegulate["invF","aTc",{{trans1,trans2},{decay1,decay2},reg}],
        positiveRegulate["rfp","sicA+invF",{{trans1,trans2},{decay1,decay2},reg}],
        {
                {{{"ipgC::Protein","mxiE::Protein"},{"ipgC+mxiE"}},bind},
                {{{"invF::Protein","sicA::Protein"},{"sicA+invF"}},bind},
                {{{"ipgC+mxiE"},{}},decay2},
                {{{"sicA+invF"},{}},decay2}
        }
              ];

testCircuitInitial = {
        {"ipgC",30},
        {"IPTG",30},
        {"aTc",30},
        {"ipgC",100},
        {"ipgC::mRNA",0},
        {"ipgC::Protein",0},
        {"mxiE",100},
        {"mxiE::mRNA",0},
        {"mxiE::Protein",0},
        {"invF",100},
        {"invF::mRNA",0},
        {"invF::Protein",0},
        {"sicA",100},
        {"sicA::mRNA",0},
        {"sicA::Protein",0},
        {"rfp",100},
        {"rfp::mRNA",0},
        {"rfp::Protein",0},
        {"ipgC+mxiE",0},
        {"sicA+invF",0}
}

Simulate[testCircuit, testCircuitInitial, 1000, (#[[1]])& /@ testCircuitInitial]
