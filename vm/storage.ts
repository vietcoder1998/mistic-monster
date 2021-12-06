import { LocationStorage, MemoryType, MemoryUnit } from '../mmc-compiler/type'
import { Storage } from './type'

/**
 * ASM IS VIRTUAL MACHINE LIKE ASSEMBLY THAT HANDLE ASSEMBLY CODE TO HANDLE FUNCTION WITH ADDRESS
 * TARGET:
 *   - READ STORAGE FROM JSON AND CONVERT INTO OBJECT
 *   - ACTION WITH MEMORY_UNIT ( INC, READ, WRITE )
 *   - SAVE VALUE WITH
 *
 */

export class MMC_STORAGE {
    private STORAGE: Record<string, string> = {
        '1': '',
        '0x000001': '',
        '0x000002': '',
        '0x000003': '',
        '0x000004': '',
        '0x000005': '',
        '0x000006': '',
        '0x000007': '',
        '0x000008': '',
    }

    /**
     *
     */
    constructor(_length?: number) {}

    public LEN: Number = Object.keys(this.STORAGE).length

    // read value with address
    READ(address: string): any {
        if (!address) {
            throw new Error('ADDRESS MEMORY IS NOT FOUND IN READING')
        }

        if (this.STORAGE[address]) {
            return this.STORAGE[address]
        }
    }

    // write value with address
    WRITE(address: string, value: string) {
        if (!address) {
            throw new Error('ADDRESS IS NOT FOUND IN WRITING')
        }
        this.STORAGE[address] = value
    }

    // APPEND
    APPEND(location: Storage, value: string) {
        switch (location) {
            case Storage.HEAP:
                break
            case Storage.STACK:
                break
            case Storage.SEGMENT:
                break
            default:
                break
        }
    }
}

// create 8bit address
export function HEX_ADDRESS(pre_address: number): string {
    const gen_0 = function (q: number) {
        let rs = ''
        for (let i = 0; i < q; i++) {
            rs += '0'
        }
        return rs
    }

    return '0x' + pre_address
}

// check address
export function MEMORY_TYPE(address: string): MemoryType {
    return address.includes('Ox') ? MemoryType.control : MemoryType.variable
}
