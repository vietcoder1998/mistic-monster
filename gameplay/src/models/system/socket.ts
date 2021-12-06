import { Server, Socket } from 'socket.io'
import { SkEvent } from '../../enums/index'
import Interval from '../../utils/interval'
import { SkRes } from '../another/response'
import { Next } from '../another/typing'
import Monster from '../character/monster'
import Player from '../character/player'
import Action from '../game-play/action'
import Lobby from './lobby'
import Room from './room'

export default class SocketController {
    public socket: Socket
    public lobby: Lobby = new Lobby()
    public loopInterval: Record<string, Interval> = {}
    io: Server

    constructor(io: Server) {
        this.io = io
    }

    setSocket(s: Socket) {
        this.socket = s
    }

    listen() {
        try {
            this.startGame()
            this.actionInGame()
            this.joinQueue()
            this.actionInGame()
            this.startGame()
        } catch (err) {
            throw this.socket.emit('error', err)
        }
    }

    // user join queue, when match a people, it will create a room and send user to it
    joinQueue(): void {
        this.socket.on(
            SkEvent.JOIN_QUEUE,
            (playerId: string, monsters: Monster[]) => {
                this.lobby.joinQueue(
                    playerId,
                    monsters,
                    (receiver: string[], res: SkRes) => {
                        this.io.to(receiver).emit(SkEvent.MATCH_USER, res)
                    }
                )
            }
        )
    }

    leaveQueue(): void {
        this.thread$({
            event: SkEvent.START_GAME,
            emit: SkEvent.UPDATE_ROOM,
            action: this.lobby.leaveQueue.bind(this.lobby),
        })
    }

    getRoom() {
        this.socket.on(SkEvent.QUERY_ROOM, (roomId) => {
            const room = this.lobby.getRoom(roomId)
            this.socket.emit(SkEvent.QUERY_ROOM, room)
        })
    }

    startGame() {
        this.thread$({
            event: SkEvent.START_GAME,
            emit: SkEvent.UPDATE_ROOM,
            action: this.lobby.joinQueue.bind(this.lobby),
        })
    }

    actionInGame() {
        this.socket.on(
            SkEvent.ADD_ACTION,
            (roomId: number, playerId?: string, actions?: Action) => {
                const room: Room = this.lobby.getRoom(roomId)
                room?.execAction(playerId)
                const playerIds = room.players.map((player: Player) => player.id)
                const room_data = {
                    id: room.id,
                    playerIds: room.players.map((player) => player.id),
                    monsters: room.monsters,
                    game: room.game
                }
                this.io.to(playerIds).emit(SkEvent.UPDATE_ROOM, room)
            }
        )
    }

    // event is client request, then execute action and bind data return into a promise
    thread$({
        event,
        emit,
        action,
        next,
    }: {
        event: SkEvent
        emit?: SkEvent
        action: Next
        next?: Next
    }) {
        this.socket.on(event, (...args) => {
            action(...args, (data: SkRes, receiver: string[]) => {
                console.log('next')
                if (emit) {
                    this.io.to(receiver).emit(emit, data)
                }
            })

            if (next) {
                next()
            }
        })
    }
}
