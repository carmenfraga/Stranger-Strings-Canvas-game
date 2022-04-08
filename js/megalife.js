class Megalife {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.megalifePos = { x: Math.random() * (600 - 20) + 20, y: 0 }
        this.megalifeSize = { w: 60, h: 60 }
        this.speed = 20
        this.gameSize = gameSize

        this.imageMegalife = undefined

        this.init()
    }

    init() {
        this.imageMegalife = new Image()
        this.imageMegalife.src = 'img/11.png'
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.imageMegalife, this.megalifePos.x, this.megalifePos.y, this.megalifeSize.w, this.megalifeSize.h)
    }

    move() {
        this.megalifePos.y += this.speed
    }
}