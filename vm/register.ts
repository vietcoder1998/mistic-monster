// BASE UNIT FOR MMC_VIRTUAL MACHINE

import { HexaCode } from '../mmc-compiler/type'
import { VALIDATE_BIT_CODE } from './operator/binary'
import { RegisterType } from './type'

// SAVE REGISTER WITH REGISTER BIT
export class Register {
    value: any
    constructor(value?: any) {
        this.value = value
    }

    get LOW(): HexaCode[] {
        return [this.value[2], this.value[3]]
    }

    get HIGH(): HexaCode[] {
        return [this.value[0], this.value[1]]
    }

    get FULL(): HexaCode[] {
        return this.value
    }

    set VALUE(value: [HexaCode, HexaCode, HexaCode, HexaCode]) {
        this.value = value
    }
}
