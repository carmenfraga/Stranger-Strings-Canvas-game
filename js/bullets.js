class Bullets {
    constructor(ctx, gameSize, playerPosX, playerPosY) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.bulletsPos = {
            x: playerPosX + 77,
            y: playerPosY
        }
        this.bulletsSize = { w: 5, h: 15 }
        this.speed = 30
        this.radius = 10

        this.init()
    }

    init() {
        this.draw()
    }

    draw() {
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.bulletsPos.x, this.bulletsPos.y, this.bulletsSize.w, this.bulletsSize.h)
        this.move()
    }

    move() {
        this.bulletsPos.y -= this.speed
    }

}
