#!/usr/bin/env python

null=None

lizhi=[
    {
        "id": "INPUT",
        "input": [],
        "output": ["d1"],
        "parts": {
            "id": [["d1"]],
            "type": {"d1": "Input"}
	},
        "map": [],
        "type": {}
    },
    {
        "id": "OR1",
        "input": [
            "p100",
            "p200"
        ],
        "output": [
            "p12"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4",
                    "d5"
                ],
                [
                    "d6",
                    "d7",
                    "d8",
                    "d9"
                ],
                [
                    "d10",
                    "d11",
                    "d12",
                    "d13"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Coding",
                "d5": "Terminator",
                "d6": "Promoter",
                "d7": "RBS",
                "d8": "Coding",
                "d9": "Terminator",
                "d10": "Promoter",
                "d11": "RBS",
                "d12": "Coding",
                "d13": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p3",
                "id2": "d1",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "p8",
                "id2": "d10",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e4",
                "id1": "p100",
                "id2": "e2",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "p200",
                "id2": "e3",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "AND3",
        "input": [
            "p100",
            "p200"
        ],
        "output": [
            "p12"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7",
                    "d8"
                ],
                [
                    "d9",
                    "d10",
                    "d11",
                    "d12",
                    "d13"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "RBS",
                "d7": "Coding",
                "d8": "Terminator",
                "d9": "Promoter",
                "d10": "RBS",
                "d11": "Coding",
                "d12": "Coding",
                "d13": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "d7",
                "id2": "p7",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e3",
                "id1": "d11",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e4",
                "id1": "p7",
                "id2": "d9",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "p3",
                "id2": "d9",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e6",
                "id1": "d12",
                "id2": "p12",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "AND4",
        "input": [
            "p100",
            "p200"
        ],
        "output": [
            "p4"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4",
                    "d5"
                ],
                [
                    "d6",
                    "d7",
                    "d8",
                    "d9"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Coding",
                "d5": "Terminator",
                "d6": "Promoter",
                "d7": "RBS",
                "d8": "Coding",
                "d9": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "d8",
                "id2": "p8",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e3",
                "id1": "p100",
                "id2": "d1",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e4",
                "id1": "p200",
                "id2": "d1",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "p8",
                "id2": "d2",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "OR0",
        "input": [
            "p100",
            "p200"
        ],
        "output": [
            "p7"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7",
                    "d8"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "RBS",
                "d7": "Coding",
                "d8": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p100",
                "id2": "d1",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "p200",
                "id2": "d1",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e4",
                "id1": "p3",
                "id2": "d5",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "d7",
                "id2": "p7",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "AND0",
        "input": [
            "p100",
            "p200"
        ],
        "output": [
            "p3"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p100",
                "id2": "d2",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "p200",
                "id2": "d1",
                "type": "act",
                "params": {
                    "reg": 20
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "AND1",
        "input": [
            "p100",
            "p200"
        ],
        "output": [
            "p3"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p100",
                "id2": "d1",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "p200",
                "id2": "d2",
                "type": "act",
                "params": {
                    "reg": 20
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "AND2",
        "input": [
            "p100",
            "p200"
        ],
        "output": [
            "p8"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4",
                    "d5",
                    "d6",
                    "d7",
                    "d8",
                    "d9"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Coding",
                "d5": "Terminator",
                "d6": "Promoter",
                "d7": "RBS",
                "d8": "Coding",
                "d9": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "d4",
                "id2": "p4",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e3",
                "id1": "p3",
                "id2": "d6",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e4",
                "id1": "p4",
                "id2": "d6",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "d8",
                "id2": "p8",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e6",
                "id1": "p100",
                "id2": "e3",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e7",
                "id1": "p200",
                "id2": "e4",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "NOT7",
        "input": [
            "p100"
        ],
        "output": [
            "p10"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7"
                ],
                [
                    "d8",
                    "d9",
                    "d10",
                    "d11"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "sRNA",
                "d7": "Terminator",
                "d8": "Promoter",
                "d9": "RBS",
                "d10": "Coding",
                "d11": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p3",
                "id2": "d5",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "d6",
                "id2": "p6",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e4",
                "id1": "p6",
                "id2": "d9",
                "type": "lock",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "p100",
                "id2": "d2",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "NOT6",
        "input": [
            "p100"
        ],
        "output": [
            "p7"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7",
                    "d8"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "RBS",
                "d7": "Coding",
                "d8": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p3",
                "id2": "d5",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "p100",
                "id2": "d2",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "NOT7",
        "input": [
            "p100"
        ],
        "output": [
            "p10"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7"
                ],
                [
                    "d8",
                    "d9",
                    "d10",
                    "d11"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "sRNA",
                "d7": "Terminator",
                "d8": "Promoter",
                "d9": "RBS",
                "d10": "Coding",
                "d11": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p3",
                "id2": "d5",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "d6",
                "id2": "p6",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e4",
                "id1": "p6",
                "id2": "d9",
                "type": "lock",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "p100",
                "id2": "d2",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "NOT5",
        "input": [
            "p100"
        ],
        "output": [
            "p10"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7"
                ],
                [
                    "d8",
                    "d9",
                    "d10",
                    "d11"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "sRNA",
                "d7": "Terminator",
                "d8": "Promoter",
                "d9": "RBS",
                "d10": "Coding",
                "d11": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p3",
                "id2": "d5",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "d6",
                "id2": "p6",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e4",
                "id1": "p6",
                "id2": "d9",
                "type": "lock",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "p100",
                "id2": "d5",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e6",
                "id1": "d10",
                "id2": "p10",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "NOT4",
        "input": [
            "p100"
        ],
        "output": [
            "p11"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7",
                    "d8"
                ],
                [
                    "d9",
                    "d10",
                    "d11",
                    "d12"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "RBS",
                "d7": "Coding",
                "d8": "Terminator",
                "d9": "Promoter",
                "d10": "RBS",
                "d11": "Coding",
                "d12": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p3",
                "id2": "d5",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "d7",
                "id2": "p7",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e4",
                "id1": "p7",
                "id2": "d9",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "p100",
                "id2": "d5",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e6",
                "id1": "d11",
                "id2": "p11",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "NOT3",
        "input": [
            "p100"
        ],
        "output": [
            "p10"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7"
                ],
                [
                    "d8",
                    "d9",
                    "d10",
                    "d11"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "sRNA",
                "d7": "Terminator",
                "d8": "Promoter",
                "d9": "RBS",
                "d10": "Coding",
                "d11": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p3",
                "id2": "d5",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "d6",
                "id2": "p6",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e4",
                "id1": "p6",
                "id2": "d9",
                "type": "key",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "p100",
                "id2": "d2",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e6",
                "id1": "d10",
                "id2": "p10",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "NOT2",
        "input": [
            "p100"
        ],
        "output": [
            "p11"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7",
                    "d8"
                ],
                [
                    "d9",
                    "d10",
                    "d11",
                    "d12"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "RBS",
                "d7": "Coding",
                "d8": "Terminator",
                "d9": "Promoter",
                "d10": "RBS",
                "d11": "Coding",
                "d12": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p3",
                "id2": "d5",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "d7",
                "id2": "p7",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e4",
                "id1": "p7",
                "id2": "d9",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "p100",
                "id2": "d2",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "d11",
                "id2": "p11",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "NOT1",
        "input": [
            "p100"
        ],
        "output": [
            "p14"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7",
                    "d8"
                ],
                [
                    "d9",
                    "d10",
                    "d11"
                ],
                [
                    "d12",
                    "d13",
                    "d14",
                    "d15"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "RBS",
                "d7": "Coding",
                "d8": "Terminator",
                "d9": "Promoter",
                "d10": "sRNA",
                "d11": "Terminator",
                "d12": "Promoter",
                "d13": "RBS",
                "d14": "Coding",
                "d15": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p3",
                "id2": "d5",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "d7",
                "id2": "p7",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e4",
                "id1": "p7",
                "id2": "d9",
                "type": "inh",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "d10",
                "id2": "p10",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e6",
                "id1": "p10",
                "id2": "d13",
                "type": "key",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e7",
                "id1": "p100",
                "id2": "d5",
                "type": "key",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e8",
                "id1": "d14",
                "id2": "p14",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    },
    {
        "id": "NOT0",
        "input": [
            "p100"
        ],
        "output": [
            "p14"
        ],
        "parts": {
            "id": [
                [
                    "d1",
                    "d2",
                    "d3",
                    "d4"
                ],
                [
                    "d5",
                    "d6",
                    "d7"
                ],
                [
                    "d8",
                    "d9",
                    "d10",
                    "d11"
                ],
                [
                    "d12",
                    "d13",
                    "d14",
                    "d15"
                ]
            ],
            "type": {
                "d1": "Promoter",
                "d2": "RBS",
                "d3": "Coding",
                "d4": "Terminator",
                "d5": "Promoter",
                "d6": "sRNA",
                "d7": "Terminator",
                "d8": "Promoter",
                "d9": "RBS",
                "d10": "Coding",
                "d11": "Terminator",
                "d12": "Promoter",
                "d13": "RBS",
                "d14": "Coding",
                "d15": "Terminator"
            }
        },
        "map": [
            {
                "id": "e1",
                "id1": "d3",
                "id2": "p3",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e2",
                "id1": "p3",
                "id2": "d5",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e3",
                "id1": "d6",
                "id2": "p6",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e4",
                "id1": "p6",
                "id2": "d9",
                "type": "lock",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "d10",
                "id2": "p10",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            },
            {
                "id": "e6",
                "id1": "p10",
                "id2": "d12",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e7",
                "id1": "p100",
                "id2": "d5",
                "type": "act",
                "params": {
                    "reg": 20
                }
            },
            {
                "id": "e5",
                "id1": "d14",
                "id2": "p14",
                "type": "trans",
                "params": {
                    "trans1": 0.01,
                    "trans2": 0.5,
                    "decay1": 0.1,
                    "decay2": 0.05
                }
            }
        ],
        "type": {
            "type": null,
            "function": null,
            "chassis": null,
            "standard": null,
            "contributor": null
        }
    }
]
