export enum Token {
    syntax = 'st',
    number = 'nb',
    operator = 'op',
    index = 'id',
    end_line = 'el',
}

export enum Decorator {
    sub = '-',
    add = '+',
    mul = '*',
    divide = '/',
    mod = '%',
    compare = '=',
    space = ' ',
    init = ':',
    dot = '.',
    dollar = '$',
    open_curly_bracket = '{',
    close_curly_bracket = '}',
    open_parent_theses = '(',
    close_parent_theses = ')',
    comma = ',',
    sign = '@',
}

export enum StorageUnit {
    Number8bit = 'number8b',
    Char8bit = 'char8b',
    String8bit = 'string8b',
    Array8Bit = 'array8b',
}

export enum AsmStorageUnit {
    address = 'address',
    integer = 'integer',
    float = 'float',
    string = 'string',
}

export enum LocationStorage {
    segment = 'segment',
    heap = 'heap',
    stack = 'stack',
}

export enum HardSyntax {
    function = 'function',
    class = 'class',
    decorator = '@',
    end_fn = ';',
    view = 'view',
    constructor = 'constructor',
    private = 'private',
}

export enum FunctionSyntax {
    if = 'if',
    then = 'then',
    return = 'return',
    public = 'public',
    for = 'for',
    while = 'while',
}

export type TokenEntryPoint = {
    id: number
    type: Token
    value: string | number
    parent_id: number
    children_id: number[]
    level: number
}

export enum MemoryType {
    variable = 'var',
    control = 'control',
}

export type MemoryUnit = {
    address: string
    in: LocationStorage
    value: string
    type: MemoryType
}

export type TreeSection = {}

export type BitCode = 1 | 0
export type HexaCode =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '0'
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
