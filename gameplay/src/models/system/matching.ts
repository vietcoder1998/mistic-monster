import Monster from "../character/monster"
import Player from "../character/player"

export default class Matching {
    id: string
    monsters: Monster[] = []
    player: Player
    energy: number = 0

    constructor(
        player: Player,
        monsters: Monster[]
    ) {
        this.player = player
        this.id = player.id
        this.monsters = monsters
    }
}