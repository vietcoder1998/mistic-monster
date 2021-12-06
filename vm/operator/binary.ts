// base operator action into string
// for binary action

import { BitCode } from '../../mmc-compiler/type'

// AND return 1 only of A and B is 1
export function AND(A: 1 | 0, B: 1 | 0): 1 | 0 {
    if (A === 1 && B === 1) return 1
    return 0
}

// OR return 0 only of A and B is 0
export function OR(A: 1 | 0, B: 1 | 0): 1 | 0 {
    if (A === 0 && B === 0) return 0
    return 1
}

// NOT return 1 if A is 0, 0 if A is 1
export function NOT(A: 1 | 0): 1 | 0 {
    if (A === 1) return 0
    return 1
}
// NAND
export function NAND(A: 1 | 0, B: 1 | 0): 1 | 0 {
    if (A === 1 && B === 1) return 0
    return 1
}

// NOR
export function NOR(A: 1 | 0, B: 1 | 0): 1 | 0 {
    if (A === 0 && B === 0) return 1
    return 0
}

// XOR
export function XOR(A: 1 | 0 | number, B: 1 | 0 | number): 1 | 0 {
    if (A === B) return 0
    return 1
}

// MULTI_2_ARRAY_BIT_CODE
export function MULTI_SUB_BIT_CODE(A: string, B: string): string {
    let result: string = ''
    let Ci: 1 | 0 = 0

    if (!VALIDATE_BIT_CODE(A) || !VALIDATE_BIT_CODE(B)) {
        throw new Error('BIT_CODE`S FORMAT IS ERROR')
    }

    for (let i = A.length - 1; i >= 0; i--) {
        const a_i: BitCode = A[i] ? 1 : 0
        const b_i: BitCode = B[i] ? 1 : 0

        const sum_a_b: { S: 1 | 0; Co: 1 | 0 } = SUM_2_BIT_CODE(a_i, b_i)

        result += AND(sum_a_b.S, Ci).toString()
        Ci = sum_a_b.Co
    }

    if (Ci === 1) {
        return MULTI_SUB_BIT_CODE(result, String(Ci))
    }

    return result
}

/**
 *
 * @param A
 * @param B
 *
 * @returns {1|0: residuals, 1|0: totals }
 */
export function SUM_2_BIT_CODE(A: 1 | 0, B: 1 | 0): { S: 1 | 0; Co: 1 | 0 } {
    return {
        S: AND(A, B),
        Co: AND(A, B),
    }
}

/**
 * VALIDATE BIT CODE
 */

export function VALIDATE_BIT_CODE(
    input: number | string,
    expert_len?: number
): boolean {
    const len: number = expert_len || 8

    console.log('lent is', len)
    const str_input = input.toString()
    if (str_input.length !== len) {
        return false
    }

    for (let i = 0; i < len; i++) {
        const element = str_input[i].toString()

        if (element !== '0' && element !== '1') {
            return false
        }
    }

    return true
}

/**
 * CONVERT STRING TO BIT CODE
 */

export function STR_TO_BIT_CODE_ARR(input: string): BitCode[] {
    const result: BitCode[] = []
    if (VALIDATE_BIT_CODE(input)) {
        for (let i = 0; i < input.length; i++) {
            const element: BitCode = input[i] ? 1 : 0
            result.push(element)
        }
    }

    return result
}
