import { BitCode } from '../mmc-compiler/type'
import { Register } from './register'
import { MMC_STORAGE } from './storage'
import { AsmCommand, CommandStep, RegisterType } from './type'

/**
 * ADD ACTION INTO QUEUE
 * ACTION TREE WILL CONVERT INTO STEP TREE
 *
 */

export default class MMC_CORE {
    FLAG: Record<string, BitCode> = {
        // OVER FLOW FLAG WITH ONE BIT
        OF: 0,
        // DIRECTION FLAG WITH COMPARING OF DATA CHAIN => IF 0, LEFT TO RIGHT, IF 1 RIGHT TO LEFT
        DF: 0,
        // INTERRUPT FLAG WITH USING FOR SINGLE STEP TO TRAP FLAG
        IF: 0,
        // SIGN FLAG WITH SHOW SIGNAL RESULT FOR OPERATOR
        SF: 0,
        // ZERO FLAG WITH RESULT: IF RESULT !==  0 RETURN 0 AND IF RESULT == 0 RETURN 1
        ZF: 0,
    }

    REGISTER = {
        // INSTRUCTION POINTER: SAVE ADDRESS OF NEXT INSTRUCTION FOR EXECUTED
        $EIP: new Register(),
        // STACK POINTER: SAVE ADDRESS OF INSTRUCTION IN STACK
        $ESP: new Register(),
        // BASE POINTER: SAVE ADDRESS
        $EBP: new Register(),

        // ACCUMULATOR: SAVE TYPE OF INSTRUCTION LOGIC NUMBERER: EXAMPLE: SUBTRACTION, MULTIPLICATION, ...
        $EAX: new Register(),
        // BASE REGISTER: VALUE BASE INDEX ADDRESS
        $EBX: new Register(),
        // COUNTER: VALUE OF LOOP QUANTITY
        $ECX: new Register(),
        // DATA: VALUE OF DATA USE FOR INPUT OUTPUT LIKE ACCUMULATOR
        $EDX: new Register(),

        // SOURCE INDEX: VALUE OF DESTINATION INDEX
        $EDI: new Register(),
        // DESTINATION INDEX; VALUE OF SOURCE INDEX
        $ESI: new Register(),
    }

    // command step to running
    COMMAND_STEPS: CommandStep[] = []

    VARIABLE: Record<string, [string, any]> = {
        a: ['0x012355865', 0],
        b: ['0x012355865', 1],
    }

    STORAGE: MMC_STORAGE = new MMC_STORAGE()

    constructor() {
        this.INFO()
        this.CLEAR()
    }

    // PUSH STEP INTO CHANEL
    PUSH(step: CommandStep) {
        this.COMMAND_STEPS.push(step)
    }

    /**
     * EXECUTE COMMAND IN COMMAND LIST
     */
    EXECUTE(index?: number) {}

    /** */
    LOAD_FUNCTION(fc_name: string, index: number) {}

    /**
     * IF @param {number} index, CLEAR INPUT IN CHANEL
     */
    CLEAR(index?: number) {
        if (index) {
            this.COMMAND_STEPS.splice(index, 1)
        } else {
            this.COMMAND_STEPS = []
        }
    }

    /**
     * SHOW INFO FOR REGISTER
     *
     */

    INFO() {
        console.log('> REGISTER CHANEL DATA')
        console.log('======================')
        console.table(this.COMMAND_STEPS)
    }

    /**
     * WRITE TO REGISTER
     *
     */
    PUSH_ACTION(command: AsmCommand, target: string, source?: string) {
        if (!command) {
            throw new Error('NO REGISTER`S COMMAND FOUNDED')
        } else {
            const command_step: CommandStep = [command, target, source]
            this.COMMAND_STEPS.push(command_step)
        }
    }
    /**
     * MAKE VARIABLE
     */
    CREATE_VARIABLE(name: string, value: string): void {
        if (!name) {
            throw new Error('NAME IS NOT EXIST')
        }

        if (!value) {
            throw new Error('VARIABLE VALUE IS NOT EXIST')
        }

        Object.assign(this.VARIABLE, { [name]: value })
    }

    /**
     * MAP VALUE OF VARIABLE INTO HOST
     */
    MAP($name: string, $r_name: RegisterType) {
        const value = this.VARIABLE[$name]
        const register = this.REGISTER[$r_name]
    }

    /**
     * ACTION FOR
     */

    MOV(target: RegisterType, source: RegisterType): void {}

    /**
     * LOOP
     */
    LOOP(action?: Function): void {
        while (parseInt(this.REGISTER.$ECX.LOW[1], 16) > 0) {
            action()
        }
    }
}
