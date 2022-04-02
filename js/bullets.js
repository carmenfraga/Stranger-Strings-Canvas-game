class Bullets {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.bulletsPos = { x: this.playerPos.x + this.playerSize.w, y: this.playerPos.y + 10 }
        this.speed = 30
        this.radius = 10
        this.gameSize = gameSize

        this.init()


    }

    init() {
        this.draw()
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "black"
        this.ctx.arc(this.bulletsPos.x, this.bulletsPos.y, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()
    }

    move() {
        this.bulletsPos.y -= this.speed
    }
}