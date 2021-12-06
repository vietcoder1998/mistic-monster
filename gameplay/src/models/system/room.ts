import Ability from '../character/ability'
import Monster from '../character/monster'
import Player from '../character/player'
import Action from '../game-play/action'
import GamePlay from '../game-play/game-play'
import Matching from './matching'

export default class Room {
    id: number = null
    players: Player[] = []
    monsters: Monster[] = []
    game: GamePlay
    interval: any
    privateKey: number

    constructor(id: number, matchingList: Matching[]) {
        this.id = id

        // get monsters from matching list and append to new list
        matchingList.map((match: Matching) => {
            const { monsters, player } = match

            monsters.forEach((monster: Monster) => {
                this.monsters.push(monster)
            })

            this.players.push(player)
        })
        // add game
        this.game = new GamePlay(
            id.toString(),
            new Date().getTime(),
            this.players.map((player) => player.id)
        )

        // sort monster to attack
        this.sortActionMonster(this.monsters)
    }

    // exec action after client request
    execAction(playerId: string): void {
        const round = this.game.getRecentRound()

        // filler monster for attack
        this.monsters?.forEach((attackMonster: Monster) => {

            // get all monster in attack and attack to defence monster
            if (attackMonster && attackMonster.state !== -1) {
                const action = round?.actions[attackMonster.id]

                action?.abilityIds.forEach((abilityId: string) => {
                    const ability = attackMonster?.abilities[abilityId]
                    let defenders: Monster[] = this.monsters
                        .filter(
                            (defenceMonster: Monster) =>
                                defenceMonster.ownerId !== attackMonster.ownerId
                        )
                        .sort((a, b) => a.position - b.position)

                    if (defenders.length === 0) {
                        this.game.onEndGame(attackMonster.ownerId)
                    } else {
                        if (ability.type === 'single') {
                            this.onAttack(attackMonster, ability, [
                                defenders[0],
                            ])
                        } else {
                            this.onAttack(attackMonster, ability, defenders)
                        }
                    }
                })
            }
        })

        // end action, send room
    }

    // sort monster with speed
    sortActionMonster(monsters: Monster[]) {
        monsters.sort((a: Monster, b) => a.speed - b.speed)
    }

    // receiver action and handle with action
    onReceiverAction(playerId: string, actions: Record<string, Action>): void {
        // action
        console.log('yeah i receiver ', actions)
        this.game.onReceiverAction(actions)
        if (this.game.isEndRound) {
            this.execAction(playerId)
        }
    }

    // action when attack
    onAttack(attacker: Monster, ability: Ability, defenders: Monster[]) {
        const buffMonster = { ...attacker }
        buffMonster.dmg += ability.dmg
        buffMonster.amr += ability.amr

        this.game.playerEnergy[attacker.ownerId] += ability.energy
        defenders.forEach((defenceMonster: Monster) => {
            defenceMonster.heal -=
                buffMonster.dmg - defenceMonster.amr > 0
                    ? buffMonster.dmg - defenceMonster.amr
                    : 0
            if (ability.poison) {
                defenceMonster.heal -= ability.poison
            }

            // when end turn update point for monster state
        })
    }
}
