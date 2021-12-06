const direction = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
}

document.addEventListener('keypress', (e) => {
    const direction = {
        RIGHT: 'right',
        LEFT: 'left',
        UP: 'up',
        DOWN: 'down',
    }

    e.preventDefault()
    switch (e.code) {
        case 'KeyW':
            moveShip(direction.UP)

            break
        case 'KeyS':
            moveShip(direction.DOWN)

            break
        case 'KeyA':
            right -=  1
            moveShip(direction.LEFT)
            break

        case 'KeyD':
            right +=  1
            moveShip(direction.RIGHT)

            break
        case 'Space':
            moveShip('shot')
            break

        case 'KeyE':
            break

        case 'KeyX': 
            moveShip('stop')
        default:
            break
    }
})
