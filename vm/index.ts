import { LocationStorage, StorageUnit } from '../mmc-compiler/type'
import fs from 'fs'
import { MMC_STORAGE } from './storage'

// max value of simulator is 2^8 mmc and min is 1/2^8 (256bit) <=> in_range (00000000 ~ 11111111)
// with num256, the code is transform into hexadecimal and convert to byte_code
// design level:
// with loop, do action multi time, validate
// validate converting

export class VirtualMachine {
    private _heap_storage: Record<string, OddMemoryUnit> = {}
    private _stack_storage: Record<string, OddMemoryUnit> = {}
    private _segment_storage: Record<string, OddMemoryUnit> = {}
    private _max_size_heap_memory: number = 8 * 1024 * 1024
    private _max_size_stack_memory: number = 1 * 1024 * 1024
    private _used_heap_memory: number = 0
    private _used_stack_memory: number = 0
    private _asm: MMC_STORAGE = new MMC_STORAGE()

    constructor(
        _max_size_heap_memory?: number,
        _max_size_stack_memory?: number
    ) {
        if (_max_size_heap_memory) {
            this._max_size_heap_memory = _max_size_heap_memory
        }

        if (_max_size_stack_memory) {
            this._max_size_stack_memory = _max_size_stack_memory
        }

        const init_value = [
            new OddMemoryUnit(
                '0x00000000',
                'init1',
                StorageUnit.String8bit,
                'hello'
            ),
            new OddMemoryUnit(
                '0x00000001',
                'init',
                StorageUnit.String8bit,
                'world'
            ),
        ]

        this.push_data(init_value)

        console.info('>> MACHINE INFORMATION <<')
        console.log('==========================================')
    }

    // init value and push into segment
    push_data(inputs: OddMemoryUnit[], location?: LocationStorage) {
        switch (location) {
            case LocationStorage.heap:
                inputs.forEach((vl, i) => {
                    Object.assign(this._heap_storage, { [vl.address]: vl })
                })
                break

            case LocationStorage.segment:
                inputs.forEach((vl, i) => {
                    Object.assign(this._segment_storage, {
                        [vl.address]: vl,
                    })
                })
                break

            case LocationStorage.stack:
                inputs.forEach((vl, i) => {
                    Object.assign(this._stack_storage, { [vl.address]: vl })
                })
                break

            default:
                inputs.forEach((vl, i) => {
                    Object.assign(this._segment_storage, {
                        [vl.address]: vl,
                    })
                })
                break
        }
    }

    // json convert hex storage
    get json_convert_hex_storage() {
        // segment
        const segment_arr = Object.keys(this._segment_storage).map((k) => {
            const entry = this._segment_storage[k]
            return {
                [entry.address]: entry.hexadecimal,
            }
        })

        // stack
        const stack_arr = Object.keys(this._stack_storage).map((k) => {
            const entry = this._stack_storage[k]
            return {
                [entry.address]: entry.binary_code,
            }
        })

        // heap
        const heap_arr = Object.keys(this._heap_storage).map((k) => {
            const entry = this._stack_storage[k]
            return {
                [entry.address]: entry.binary_code,
            }
        })

        const segment_obj = {}
        const stack_obj = {}
        const heap_obj = {}

        segment_arr.forEach((e) => {
            Object.assign(segment_obj, e)
        })

        const result = {
            segment: segment_obj,
            heap: heap_obj,
            stack: stack_obj,
        }

        // Segment
        console.info('> Segment')
        console.table(segment_obj)

        console.info('> Heap')
        console.table(heap_obj)

        console.info('> Stack')
        console.table(stack_obj)

        return result
    }

    // get json convert from vm
    get json_convert_binary_code_storage() {
        // segment
        const segment_arr = Object.keys(this._segment_storage).map((k) => {
            const entry = this._segment_storage[k]
            return {
                [entry.address]: entry.binary_code,
            }
        })

        // stack
        const stack_arr = Object.keys(this._stack_storage).map((k) => {
            const entry = this._stack_storage[k]
            return {
                [entry.address]: entry.binary_code,
            }
        })

        // heap
        const heap_arr = Object.keys(this._heap_storage).map((k) => {
            const entry = this._stack_storage[k]
            return {
                [entry.address]: entry.binary_code,
            }
        })
        const segment_obj = {}
        const stack_obj = {}
        const heap_obj = {}

        // assign bit code to segment
        segment_arr.forEach((e) => {
            Object.assign(segment_obj, e)
        })

        // assign bit code to heap
        heap_arr.forEach((e) => {
            Object.assign(segment_obj, e)
        })

        // assign bit code to stack
        stack_arr.forEach((e) => {
            Object.assign(segment_obj, e)
        })

        const result = {
            segment: segment_obj,
            heap: heap_obj,
            stack: stack_obj,
        }

        console.info('> Segment')
        console.table(segment_obj)

        console.info('> Heap')
        console.table(heap_obj)

        console.info('> Stack')
        console.table(stack_obj)

        return result
    }

    // check memory if not full value
    get validate_memory_health(): {
        warning_heap: boolean
        warning_stack: boolean
        used_heap_rate: string
        used_stack_rate: string
    } {
        let warning_heap: boolean = false
        let warning_stack: boolean = false

        if (this._used_heap_memory > this._max_size_heap_memory * 0.9) {
            warning_heap = true
            console.warn('HEAP MEMORY is near fully')
        }

        if (this._used_stack_memory > this._max_size_stack_memory * 0.9) {
            warning_stack = true
            console.warn('STACK MEMORY is near fully')
        }

        return {
            warning_heap,
            warning_stack,
            used_heap_rate: `${
                this._used_heap_memory / this._max_size_heap_memory
            }%`,
            used_stack_rate: `${
                this._used_heap_memory / this._max_size_heap_memory
            }%`,
        }
    }

    // read file
    read(address: string): OddMemoryUnit {
        if (!address) {
            throw new Error('Address is not found')
        } else return this._stack_storage[address]
    }

    // push stack
    push_stack(input: OddMemoryUnit) {
        if (this._used_stack_memory + 8 > this._max_size_stack_memory) {
            throw new Error('Maximum memory stack')
        }
        if (!input) {
            throw new Error('Input Stack is not found')
        } else {
            Object.assign(this._stack_storage, { [input.info.address]: input })
        }
    }

    // push heap
    push_heap(input: OddMemoryUnit) {
        if (!input) {
            throw new Error('Input Stack is not found')
        } else {
            Object.assign(this._heap_storage, { [input.info.address]: input })
        }
    }

    // remove
    remove(addresses: string[]) {
        if (!addresses || addresses.length <= 0) {
            throw new Error('None address delete')
        } else {
            addresses.map((element, k) => {})
        }
    }

    // log and get data_segment
    get data_segment_raw() {
        console.time('yeah')
        console.info('>> Data segment <<')
        console.table(this._segment_storage)
        return this._segment_storage
    }

    get memory_health() {
        const result = {
            memory_heap_leak:
                this._max_size_heap_memory - this._used_heap_memory,
            memory_stack_leak:
                this._max_size_stack_memory - this._used_stack_memory,
            used_heap_memory: this._used_heap_memory,
            used_stack_memory: this._used_stack_memory,
            stack_storage: JSON.stringify(this._stack_storage),
            heap_storage: JSON.stringify(this._heap_storage),
            used_stack_rate: this.validate_memory_health.used_heap_rate,
            used_heap_rate: this.validate_memory_health.used_heap_rate,
        }

        console.table(result)
        return result
    }

    gas_fee(quantity: number) {
        return quantity * 3
    }

    // last heap index
    get last_heap_index(): OddMemoryUnit | Object {
        if (Object.keys(this._heap_storage).length > 0) {
            return {}
        } else {
            return this._heap_storage[
                Object.keys(this._stack_storage).length - 1
            ]
        }
    }

    // last stack index
    get last_stack_index(): OddMemoryUnit | Object {
        if (Object.keys(this._stack_storage).length > 0) {
            return {}
        } else {
            return this._stack_storage[Object.keys(this._stack_storage).length]
        }
    }

    // make json compile output, so can read and use in another virtual machine
    get compile_output(): Object {
        const out_put = {}
        return {}
    }
}

export function memory_address(address: number): string {
    return '0x' + address
}

export class ClusterMemoryUnit {
    _memory_storage: OddMemoryUnit[] = []
    _start_address: string = ''
    _end_address: string = ''
    _caller: string

    // address rank
    constructor(
        caller: string = '',
        start_address: string,
        end_address: string,
        init_storage: OddMemoryUnit[]
    ) {
        this._start_address = start_address
        this._end_address = end_address
        this._memory_storage = init_storage
        this._caller = caller
    }
}

export class OddMemoryUnit {
    private _address: string
    private _caller: string
    private _value: any
    private _type: StorageUnit
    private _is_used: boolean = false
    private _hexadecimal: string

    constructor(
        address: string,
        caller: string,
        type: StorageUnit,
        value: any
    ) {
        this._address = address
        this._caller = caller
        this._type = type

        // set default value if not have init value
        if (!value) {
            switch (type) {
                case StorageUnit.Number8bit:
                    this._value = '0'
                    break

                case StorageUnit.String8bit:
                    this._value = ''
                    break

                case StorageUnit.Array8Bit:
                    this._value = null
                    break

                default:
                    break
            }
        } else {
            this._value = value
        }
    }

    get binary_code() {
        return str_to_binary(this._value)
    }

    get address() {
        return this._address
    }

    get hexadecimal() {
        return str_to_hex(this._value)
    }

    // assign

    get info() {
        return {
            address: this._address,
            caller: this._caller,
            value: this._value,
            type: this._type,
            bit_code: this.binary_code,
            is_used: this._is_used,
            hexadecimal: this._hexadecimal,
        }
    }
}

// convert function
export function binary_to_hex(input: string | number): string {
    return parseInt(input.toString(), 2).toString(16)
}

export function hex_to_binary(input: string | number): string {
    return parseInt(input.toString(16), 16).toString(2)
}

export function binary_to_number(input: string | number): string {
    return parseInt(input.toString(), 2).toString()
}

export function number_to_binary(input: number): string {
    return parseInt(input.toString(), 10).toString(2)
}

export function str_to_binary(input: string) {
    var result = ''
    for (var i = 0; i < input.length; i++) {
        result += input.charCodeAt(i).toString(2)
    }
    return result
}

export function str_to_hex(input: string): string {
    var result = ''
    for (var i = 0; i < input.length; i++) {
        result += input.charCodeAt(i).toString(16)
    }
    return result
}
