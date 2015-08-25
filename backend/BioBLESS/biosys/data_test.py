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
            "trans1": 0.001,#0.01,
            "trans2": 0.5,
            "decay1": 0.2,
            "decay2": 0.1
        },
        "e2": {
            "reg": 40
        },
        "e3": {
            "trans1": 0.01,#0.01,
            "trans2": 0.5,
            "decay1": 0.2,
            "decay2": 0.1
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
            "decay1": 0.2,
            "decay2": 0.1
        },
        "device_parameter": {
            "initial":[
                40,40,40
            ]
        }
    },
    {
        "device_parameter": {
            "initial":[
                0
            ]
        }
    }
    ]
}
