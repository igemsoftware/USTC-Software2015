system_data = {
    "nodes": ["NOT2","INPUT"],
    "arcs":[
        {"from": 1, "to": 0}
    ],
    "system_parameter":
    {
        "time": 1000
    },
    "simulation_parameters": [
    {
        "e1": {
            "trans1": 0,#0.01,
            "trans2": 0.5,
            "decay1": 0.1,
            "decay2": 0.05
        },
        "e2": {
            "reg": 20
        },
        "e3": {
            "trans1": 0.01,#0.01,
            "trans2": 0.5,
            "decay1": 0.1,
            "decay2": 0.05
        },
        "e4": {
            "reg": 20
        },
        "e5": {
            "reg": 20
        },
        "e6": {
            "trans1": 0.01,
            "trans2": 0.5,
            "decay1": 0.1,
            "decay2": 0.05
        },
        "device_parameter": {
            "initial":[
                20,20,20
            ]
        }
    },
    {
        "device_parameter": {
            "initial":[
                1
            ]
        }
    }
    ]
}
