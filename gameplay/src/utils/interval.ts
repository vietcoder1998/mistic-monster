import { Next } from '../models/another/typing'

export default class Interval {
    time = 1000
    stamp = 0
    runtime: any
    lastFunction: () => void

    constructor(time: number) {
        if (time) {
            this.time = time
        } else {
            this.time = 2000
        }
    }

    setTime(time: number) {
        this.time = time
    }

    // add next function in here, will be loop with 1s 
    execRuntime(next: Next, time?: number) {
        this.runtime = setInterval(() => {
            this.stamp += 1
            if (next) {
                next()
            }
        }, time || this.time)
    }

    clearRuntime(next?: () => void) {
        clearInterval(this.runtime)
        if (next) {
            next()
        }
    }

    resetInterval(next: () => void) {
        this.clearRuntime(() => next())
    }
}
