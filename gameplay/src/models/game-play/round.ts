import Action from './action'

export default class Round {
    firstPlayerId: string
    actions?: Record<string, Action> = {}
    isEnd?: boolean = false
    createAt?: number = new Date().getDate()
    endAt?: number

    constructor(firstPlayerId: string, actions: Record<string, Action>) {
        this.firstPlayerId = firstPlayerId
        if (actions) {
            this.actions = actions
        }
    }
}
