from espresso import espresso
from math import log

def string2expr(string):
    """Compute minimal two-level sum-of-products form.

    Parameters
    ----------
    string : string
        A string of zeros and ones representing a truthtable.

    Returns
    -------
    expr : list
        Minimal two-level SOP form.
        Examples
    --------
    A truthtable:
    |---+---+---+-----|
    | A | B | C | out |
    |---+---+---+-----|
    | 0 | 0 | 0 |  1  |
    | 0 | 0 | 1 |  0  |
    | 0 | 1 | 0 |  1  |
    | 0 | 1 | 1 |  1  |
    | 1 | 0 | 0 |  0  |
    | 1 | 0 | 1 |  1  |
    | 1 | 1 | 0 |  0  |
    | 1 | 1 | 1 |  -  |
    |---+---+---+-----|
    string = '1011010-'
    """
    ninput = int(log(len(string), 2))
    cover = []
    for i in range(len(string)):
        row = bin(i).replace('0b', '')
        row = '0' * (ninput - len(row)) + row
        tmp = [int(k) + 1 for k in row]
        value = int(string[i]) if string[i] >= '0' and string[i] <= '9' else 2
        cover.append((tuple(tmp), (value,)))
    cover = set(cover)
    result = list(espresso(ninput, 1, cover))
    result = [i[0] for i in result]
    result = [''.join(['X' if i == 3 else str(i-1) for i in j]) for j in result]
    return result
