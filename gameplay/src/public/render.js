const size = 10
const w = '100%'
const h = '100vh'

const scene1 = new Scene('scene1', 0, 0, w, h)
const scene2 = new Scene('scene2', 0, 0, w, h)

const build_btn1 = new ButtonUI(
    'connect',
    '20px',
    '20px',
    '100px',
    '40px',
    'Profile'
)

const join_btn = new ButtonUI(
    'connect',
    'calc(100% - 200px)',
    '200px',
    '100px',
    '40px',
    'PvsP'
)

// btn ui
const m1 = new ButtonUI('test4', '20px', '60%', '100px', '40px', '+')
const m2 = new ButtonUI('test4', '220px', '60%', '100px', '40px', '+')
const m3 = new ButtonUI('test4', '420px', '60%', '100px', '40px', '+')
const actor = new CanvasUI('moving', '50%', '50%', '100px', '100px', '+')
actor.loadAnimation([
    '/1.png',
    '/2.png',
    '/3.png',
    '/4.png',
    '/5.png',
    '/6.png',
])
const m4 = new ButtonUI('test4', '20px', '80%', '100px', '40px', 'Monster')
const m5 = new ButtonUI('test55', '220px', '80%', '100px', '40px', 'Team')
const m6 = new ButtonUI('test7', '420px', '80%', '100px', '40px', 'Inventory')

join_btn.self.onclick = function () {
    onJoinEvent()
}

const new_btn = new ButtonUI(
    'connect',
    'calc(100% - 200px)',
    '400px',
    '100px',
    '40px',
    'load scene'
)

// show actor
console.log(actor)
// scene 1
scene1.load([build_btn1, join_btn, m1, m2, m3, actor])
scene1.render()

// scene 2
// btn ui
const b1 = new ButtonUI('test4', '20px', '30%', '100px', '40px', '+')
const b2 = new ButtonUI('test4', '220px', '30%', '100px', '40px', '+')
const b3 = new ButtonUI('test4', '420px', '30%', '100px', '40px', '+')
const b4 = new ButtonUI('test4', '520px', '30%', '100px', '40px', '+')

scene2.load([b1, b2, b3, b4])

// match game
const scene3 = new Scene('3', 0, 0, w, h)
const btn_match = new ButtonUI('test4', '520px', '30%', '100px', '40px', '+')

// victory or win

// inventory

// friend_ship

let is_clean = false

function loadScene2() {
    scene1.destroy()
    scene2.render()
    is_clean = !is_clean
}

b4.self.onclick = function() {
    client.emit(SkEvent.ADD_ACTION, roomId, id, {'test': '2323'})
}

scene3.load([b4])

function loadScene3(res) {
    scene2.destroy()
    console.log(res.data)
  
    scene3.render()
    is_clean = !is_clean
}
