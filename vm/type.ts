export enum AsmCommand {
    MOVE = 'MOV',
    INCREMENT = 'INC',
    ADD = 'ADD',
    DECREMENT = 'DEC',
    SUBTRACT = 'SUB',
    LOOP = 'LOOP',
    MULTIPLY = 'MUL',
    INTEGER_MULTIPLY = 'IMUL',
    DIVIDE = 'DIV',
    INTEGER_DIVIDE = 'IDIV',
    NOT = 'NOT',
    AND = 'AND',
    OR = 'OR',
    XOR = 'XOR',
    TEST = 'TEST',
    CF = 'CF',
    COMPARE = 'CMP',
}

export type CommandStep = [AsmCommand, string | undefined, string | undefined]
export enum RegisterType {
    INSTRUCTION_POINTER = '$EIP',
    STACK_POINTER = '$ESP',
    BASE_POINTER = '$EBP',
    SOURCE_INDEX = '$ESI',
    ACCUMULATOR = '$EAX',
    COUNTER = '$ECX',
    BASE_REGISTER = '$EBX',
    DATA = '$EDX',
    DESTINATION_INDEX = '$EDI',
}

export enum Storage {
    HEAP = 'HEAP',
    STACK = 'STACK',
    SEGMENT = 'SEGMENT',
}
export enum BitCommand {}
