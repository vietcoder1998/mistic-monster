import { GameType } from '../another/response'

export default class Player {
    id: string
    name: string
    avatar: string
    rank_point: number = 1000

    constructor(id: string, name: string, avatar: string, rank_point: number) {
        this.id = id
        this.name = name
        this.avatar = avatar
        this.rank_point = rank_point
    }
}
