var game_setting = {
    // 1 is develop, 0 is product
    mode: 1,
}

class GameObject {
    x = 100
    y = 100
    w = 100
    h = 100
    z = 1
    v = 1
    scale_x = 1
    scale_y = 1
    gravity = 1
    style
    self
    parent
    isClean = false
    data = {
        hidden: false,
    }

    constructor(name, x, y, w, h, text) {
        if (x) {
            this.x = x
        }
        if (y) {
            this.y = y
        }
        if (w) {
            this.w = w
        }
        if (h) {
            this.h = h
        }
        if (name) {
            this.name = name
        }

        if (text) {
            this.text = text
        }
    }

    // SELF children
    render() {
        const self = this.self

        // default style
        if (self) {
            self.style.position = 'absolute'
            self.id = this.name
            self.style.left = this.x
            self.style.top = this.y
            self.style.width = this.w
            self.style.zIndex = 1
            self.style.height = this.h

            // set p
            if (this.text) {
                self.innerText = this.text
            }

            if (this.parent) {
                this.parent.appendChild(self)
            }
        }
    }

    moving(x, y, time) {
        this.self.style.transitionDuration = `${time || 1}s`
        this.self.style.top = y
        this.self.style.left = x
    }

    onClick(fn) {
        this.self.onclick(fn())
    }

    getParent() {
        return parent
    }

    destroy() {
        this.getParent().removeChild(this.self)
    }

    destroyChild() {
        if (this.children.length === 0) {
            console.log('no children in here')
        } else {
            this.children.for
        }
    }
}

//
class Scene extends GameObject {
    fps = 1
    timeScale = 1 / this.fps
    self
    children = []

    constructor(name, x, y, w, h) {
        super(name, x, y, w, h)
        if (name) {
            this.name = name
        }
        this.self = document.createElement('div')
        this.self.id = this.name
    }

    render() {
        // default
        this.parent = document.getElementsByTagName('body')[0]
        const self = this.self

        if (self) {
            self.style.width = this.w
            self.style.height = this.h
            self.style.position = 'relative'
            self.style.zIndex = 0
            this.parent.appendChild(this.self)
        }
    }

    load(obj) {
        obj.forEach((item) => {
            item.parent = this.self
            this.children.push(item)
        })

        this.fill()
    }

    destroy() {
        this.parent.removeChild(this.self)
    }

    clean() {
        if (this.self && this.children.length > 0) {
            this.children?.forEach((child) => {
                this.self.removeChild(child?.self)
            })
        } else {
            console.log('No children render')
        }

        this.isClean = true
    }

    fill() {
        this.children.forEach((child) => {
            child.render()
        })
    }
}

// ui
class TextUI extends GameObject {
    self = document.createElement('p')
    constructor(name, x, y, w, h, text) {
        super(name, x, y, w, h, text)
    }
}

class ButtonUI extends GameObject {
    self = document.createElement('button')
    constructor(name, x, y, w, h, text) {
        super(name, x, y, w, h, text)
    }
}

class EmptyUI extends GameObject {
    self = document.createElement('div')
    constructor(name, x, y, w, h, text) {
        super(name, x, y, w, h, text)
        this.self = document.createElement('div')
    }
}

class ImageUI extends GameObject {
    self = document.createElement('div')
    constructor(name, x, y, w, h, text) {
        super(name, x, y, w, h, text)
        this.self.id = name
    }

    setUrl(src) {
        this.self.src = src
    }
}

class Matrix extends GameObject {
    map = []
    size = 5
    constructor(name, x, y, w, h, src) {
        super(name, x, y, w, h, src)

        const ver = new Array()
        for (let i = 0; i < w; i++) {
            ver.push(
                new TileObject('t' + i + w, this.size * i + this.x, this.y)
            )
        }
        for (let i = 0; i < w; i++) {
            ver.push(
                new TileObject('t' + i + w, this.size * i + this.x, this.y)
            )
        }
        this.map.fill(ver, 0, h - 1)
    }

    drawingTile() {
        for (let i = 0; i < y - 1; i++) {
            const m = this.map[i]

            for (j = 0; j < m.length - 1; j++) {
                m.drawingSquare()
            }
        }
    }
}

class TileObject extends GameObject {
    drawingSquare() {
        const { x, y, w, h } = this
        const point = {
            x1: x - w / 2,
            x2: x + w / 2,
            y1: y - h / 2,
            y2: y + h / 2,
        }
        ctx.strokeStyle = '#ffffff'
        ctx.fillStyle = '#f6'
        ctx.moveTo(point.x1, point.y1)
        ctx.strokeRect(point.x1, point.y1, w, h)
    }
}

class CanvasUI extends GameObject {
    self = document.createElement('canvas')
    animations = []
    isAnimating = false
    interval
    ctx
    constructor(name, x, y, w, h, src) {
        super(name, x, y, w, h)
        if (src) {
            this.src = src
        }
        this.self.id = name
        this.ctx = this.self.getContext('2d')
    }

    loadAnimation(srcList) {
        const animation = new AnimationUI(
            'a',
            this.x,
            this.y,
            this.w,
            this.h,
            srcList
        )

        this.animations.push(animation)
    }

    animate() {
        if (this.isAnimating) {
            while (true) {
                let animation
                let activeSrc = 0
                const { srcList, time, w, h } = animation

                this.interval = setInterval(() => {
                    if (activeSrc === srcList.length) {
                        activeSrc = 0
                    }
                    src = srcList[activeSrc]
                    const image = new Image(w, h)
                    image.src = src
                    this.ctx.draw(image, this.x, this.y)
                }, time / src.length)
            }
        } else {
            const animation = this.animations[0]
            const image = new Image(100, 100)
            image.src = 'http://localhost:3007' + animation.srcList[0]

            if (animation) {
                image.onload(() => {
                    this.ctx.drawImage(image, 0, 0, 200, 200)
                })
            }
        }
    }

    stop() {
        this.isAnimating = false
    }

    getNumberSize() {
        const w = this.w.split(this.w.length, -2)
        const h = this.h.split(this.w.length, -2)
        const x = this.x.split(this.w.length, -2)
        const y = this.y.split(this.w.length, -2)

        return {
            w,
            h,
            x,
            y,
        }
    }
}

class AnimationUI extends GameObject {
    self = new Image()
    srcList = []
    active = 0
    actionTime = 300
    interval

    constructor(name, x, y, w, h, srcList) {
        super(name, x, y, w, h, srcList)
        if (srcList) {
            this.srcList = srcList
        }
    }
}

class Camera extends GameObject {}

// vector
class Vector2D {
    x = 1
    y = 1
    constructor(x, y) {
        if (x) {
            this.x = x
        }
        if (y) {
            this.y = y
        }
    }
}

class Vector3D extends Vector2D {
    x;y;z
    constructor(x, y, z) {
        super(x, y)
        if (z) {
            this.z = z
        }
    }
}

class Map extends GameObject {
    s = 10
    constructor(name, x, y, w, h, src) {
        super(name, x, y, w, h, src)
    }

    draw() {
        for (let i = 0; i < this.size; i++) {
            let a = []
            for (let j = 0; j < this.size; j++) {
                let b = []
                const o = new GameObject('block', 1, 2)
            }
        }
    }
}
