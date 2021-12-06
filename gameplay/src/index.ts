import * as dotenv from 'dotenv'
import express from 'express'
import {
    Express,
    NextFunction,
    Request,
    Response
} from 'express-serve-static-core'
import * as http from 'http'
import { Server, Socket } from 'socket.io'
import User from './models/character/player'
import SocketServer from './models/system/socket'

dotenv.config()

export default class ExpressApplicationService {
    public application: Express
    public server: any
    public socketController: SocketServer
    public io: Server

    constructor() {
        this.application = express()
        this.application.get(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                res.sendFile(__dirname + '/public/index.html')
            }
        )

        this.application.get(
            '/:name',
            (req: Request, res: Response, next: NextFunction) => {
                res.sendFile(__dirname + `/public/${req.params.name}`)
            }
        )

        this.server = http.createServer(this.application)
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: '*',
            },
        })
        this.socketController = new SocketServer(this.io)
    }

    running() {
        // this.io.use(socket => {
        //     const {state, roomId, privateKey } = socket.data
        //     const room: Room = this.socketController.lobby.getRoom(roomId)
        //     if (!room || privateKey !== room.privateKey) {
        //         socket.emit('error', {msg: 'u don`t have action in this room'})
        //     }
        // })
        this.io.on('connection', (socket: Socket) => {
            const { id, avatar, username, rank_point } = socket.handshake.auth
            try {
                socket.join(id)
                const user = new User(id, avatar, username, rank_point)

                this.socketController.setSocket(socket)
                this.socketController.lobby.addPlayerIntoLobby(user)
                console.log(this.socketController.lobby)
                this.socketController.listen()
            } catch (err) {
                socket._error(err)
            }

            socket.on('error', (err) => {
                console.log(err)
            })

            socket.on('disconnect', (reason) => {
                this.socketController.lobby.removePlayerInLobby(id)
                socket.leave(id)
            })
        })

        this.server.listen(process.env.PORT, () => {
            console.log(
                `start -> \x1b[32m http://localhost:${process.env.PORT}`
            )
        })
    }
}

const application = new ExpressApplicationService()
application.running()
