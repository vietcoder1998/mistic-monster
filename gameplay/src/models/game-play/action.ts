export default class Action {
    monsterId: string
    abilityIds: string[] = []
    createAt: number = new Date().getTime()

    constructor(monsterId: string, abilityIds: string[]) {
        this.monsterId = monsterId
        this.abilityIds = abilityIds
    }
}
