import Interval from '../../utils/interval'
import { SkCode, SkMsg, SkRes } from '../another/response'
import { Next, NextEmit } from '../another/typing'
import Monster from '../character/monster'
import Player from '../character/player'
import Action from '../game-play/action'
import Matching from './matching'
import Room from './room'

export default class Lobby {
    rooms: Room[] = []
    matchQueue: Matching[] = []
    // string is player id
    intervals: Record<string, Interval> = {}
    runtime: any
    players: Record<string, Player> = {}

    addPlayerIntoLobby(player: Player) {
        Object.assign(this.players, { [player.id]: player })
        Object.assign(this.intervals, { [player.id]: new Interval(1000) })
    }

    // remove player and runtime when user leave lobby
    removePlayerInLobby(id: string) {
        if (!id) {
            throw new Error('No playerId to remove')
        }
        if (id && this.players[id]) {
            delete this.players[id]
            delete this.intervals[id]
        }
    }

    // remove waiting runtime
    removeRuntime(playerIds: string[]) {
        playerIds.forEach((id) => {
            if (this.intervals[id]) {
                this.intervals[id].clearRuntime()
            }
        })
    }

    // remove player from matchQueue and add into players
    leaveQueue(ids: string[]) {
        if (!ids || ids.length === 0) {
            throw new Error('No ids in Match Queue')
        } else {
            ids.forEach((id) => {
                this.matchQueue.forEach((match: Matching, i) => {
                    if (match.player.id === id) {
                        this.matchQueue.splice(i, 1)
                    }
                })
            })
        }
    }

    // join queue
    async joinQueue(playerId: string, monsters: Monster[], next: Next) {
        const match = new Matching(this.findPlayer(playerId), monsters)
        let res: SkRes<Room>
        let receiver: string[] = []

        // when match user, match queue will push this
        this.matchQueue.push(match)
        this.intervals[playerId].execRuntime(() => {
            const { code, msg, match1, match2 } =
                this.matchUserInQueue(playerId)

            if (code === SkCode.SUCCESS && match1 && match1?.id) {
                // receiver queue and push user
                this.leaveQueue([match1.id, match2.id])
                const room = this.createRoom([match1, match2])
                res = new SkRes<Room>(code, room, msg)
                receiver = [match1.id, match2.id]

                next(receiver, res)
                this.removeRuntime([match1.id, match2.id])
            }
        })
    }

    // find player in matchQueue
    matchUserInQueue(id: string): {
        code: SkCode
        msg: string
        match1: Matching
        match2: Matching
    } {
        const length = this.matchQueue.length
        let code = SkCode.NOT_FOUND
        let msg = 'No one founded'
        let match1: Matching = this.matchQueue.filter((e) => e.id === id)[0]
        let match2: Matching
        let count = 0

        if (length >= 1) {
            if (id) {
                do {
                    count++
                    match2 = this.matchQueue[count]
                } while (
                    // if match2 is none exits, match.id === id, r
                    match2 &&
                    id === match2.id &&
                    count < length
                )

                if (match2 && match2.id) {
                    code = SkCode.SUCCESS
                    msg = SkMsg.SUCCESS
                }
            }
        }

        return {
            code,
            msg,
            match1,
            match2,
        }
    }

    findPlayer(playerId: string): Player {
        return this.players[playerId]
    }

    leaveInterval(ids: string[]) {
        if (!ids || ids.length === 0) {
            throw new Error('no id in ids to leaving')
        } else {
            ids.forEach((id: string) => {
                const playerInterval = this.intervals[id]
                playerInterval.clearRuntime()
            })
        }
    }

    getRoom(roomId: number): Room {
        return this.rooms[roomId]
    }

    getPlayer(id: string): Player {
        return this.players[id]
    }

    createRoom(matchingList: Matching[]): Room {
        const l: number = this.rooms.length
        const room = new Room(l, matchingList)

        // create room
        this.rooms.push(room)
        return room
    }

    addRoom(r: Room): void {
        Object.assign(this.rooms, { [r.id]: r })
    }

    deleteRoom(id: number): void {
        this.rooms.splice(id, id + 1)
    }

    startGameInRoom(roomId: number, next: NextEmit<Room>) {
        let r = this.getRoom(roomId)
        if (!r) {
            this.addRoom(r)
        } else {
            r.game.state = 1
        }
    }

    updateGamePlay(roomId: string, action?: Action, next?: NextEmit<Room>) {}

    cancelGame(roomId: number, next: NextEmit<Room>) {
        const room: Room = this.getRoom(roomId)
        next(
            new SkRes(SkCode.SUCCESS, room, 'Cancel game'),
            room.players.map((player: Player) => player.id)
        )
    }

    getGameInRoom(roomId: number) {
        const res = new SkRes()
        if (!roomId) {
            res.setCode(SkCode.NOT_FOUND)
        }

        const room = this.rooms[roomId]
        if (!room) {
            res.setCode(SkCode.NOT_FOUND)
        } else {
            res.setCode(200)
            res.setData(this.rooms[roomId].game)
        }
        return res
    }

    // find room and add action when game_play
    actionInRoom(
        roomId: number,
        playerId: string,
        actions: Record<string, Action>,
        next: Next
    ) {
        console.log(roomId, playerId, actions)
        const room: Room = this.getRoom(roomId)
        console.log(room)
        if (room) {
            room.onReceiverAction(playerId, actions)
            next({ code: SkCode.SUCCESS, room })
        }
    }
}
