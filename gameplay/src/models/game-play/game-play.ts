import Action from './action'
import Round from './round'

export default class GamePlay {
    id: string
    time: number
    createAt: number = new Date().getTime()
    state: number = 0
    winnerId: number = null
    turn: number = 0
    lastAttackId: string
    nowTurn: string
    recentRound: number = 0
    playerIds: string[] = []
    nextPlayerId: string
    isEndRound?: boolean = false

    // key is playerId, quantity is number
    playerEnergy: Record<string, number> = {}
    rounds?: Round[] = []

    constructor(id: string, time: number, playerIds?: string[]) {
        this.id = id
        this.time = time
        this.playerIds = playerIds
        playerIds.forEach((id) => {
            this.playerEnergy[id] = 10
        })
    }

    // change turn
    onReceiverAction(actions: Record<string, Action>) {
        // change next to player 2
        let round = this.getRecentRound()

        // it not end push action and turn back for the first
        if ( round && this.rounds.length > 0  && this.isEndRound) {
            this.isEndRound = false
            round.actions = { ...round.actions, ...actions }
            this.nextPlayerId = this.playerIds[1]
        } else {
            round = new Round(this.playerIds[0], actions)
            this.rounds.push(round)
            this.nextPlayerId = this.playerIds[1]
            this.isEndRound = true
        }
    }

    getRecentRound() {
        if (this.rounds.length === 0) {
            return null
        }
        return this.rounds[this.rounds.length - 1]
    }

    //

    subEnergy(playerId: string, quantity: number) {
        let energy = this.playerEnergy[playerId]
        energy += quantity
        this.playerEnergy[playerId] = energy
    }

    // remove room when end game
    onEndGame(playerId: string) {
        this.isEndRound = true
    }
}
