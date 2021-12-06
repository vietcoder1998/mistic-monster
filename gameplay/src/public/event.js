const id = new Date().getTime().toString()
const gameIds = []
let roomId
let count = 0
let right = 0
let head = 0
let iN = 0

const client = io.connect(`http://localhost:3007`, {
    auth: {
        id,
        username: `user${Math.floor(Math.random() * 10)}`,
        avatar: '_',
        token: '_',
        gameType: 'galaxy',
        hahs: '_ddd',
    },
})

const SkEvent = {
    START_GAME: 'start_game',
    DIRECTION: 'direction',
    PAUSING: 'pausing',
    NEW_GAME: 'new_game',
    ALL_GAME: 'all_game',
    JOIN_QUEUE: 'join_queue',
    MATCH_USER: 'match_user',
    LEAVE_QUEUE: 'leave_queue',
    UPDATE_ROOM: 'update_room',
    QUERY_ROOM: 'query_room',
    END_GAME: 'end_game',
    CREATE_NEW_GAME: 'create_new_game',
    RESET_GAME: 'reset_game',
    SHOT: 'SHOT',
    ADD_ACTION: 'add_action',
}

let l = 3

function onLogin(e) {
    e.preventDefault()
    fetch('http://localhost:3007', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.parse(e),
    }).then((res) => {
        console.log(res)
    })
}

// create event
function onStartGame() {
    client.emit(SkEvent.START_GAME, id)
}

function onResetGame() {
    client.emit(SkEvent.RESET_GAME, roomId)
}

function onPauseGame() {
    client.emit(SkEvent.PAUSING, roomId)
}

function onJoinEvent() {
    const monster = {
        hash: 123,
        from: id,
        type: 'client',
        name: 'axv',
        dmg: '20',
        crit_rate: 0.3,
        heal: 400,
        amor: 20,
        mana: 100,
        state: 1,
        speed: 20 + Math.floor(Math.random() * 10),
        skills: ['dragon_call'],
        position: 1,
        ownerId: id,
    }
    const monsters = [monster, monster, monster]
    client.emit(SkEvent.JOIN_QUEUE, id, monsters)
    loadScene2()
}

client.on('connect', (socket) => {
    console.log('connect success ->', id)
})

// listen event
client.on(SkEvent.UPDATE_ROOM, (res) => {
    console.log(res)
})

client.on(SkEvent.RESET_GAME, (res) => {
    gameRender(res.data)
})

client.on(SkEvent.MATCH_USER, (res) => {
    console.log(res)
    roomId = res.data.id
    loadScene3(res)
})

client.on('error', (e) => {
    console.log(e)
})
