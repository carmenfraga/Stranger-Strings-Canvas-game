class Demogorgons {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.demogorgonsPos = { x: Math.random() * (600 - 20) + 20, y: 0 }
        this.demogorgonsSize = { w: 100, h: 100 }
        this.speed = Math.random() * (20 - 10) + 10
        this.gameSize = gameSize

        this.imageDemogorgon = undefined

        this.init()
    }

    init() {
        this.imageDemogorgon = new Image()
        this.imageDemogorgon.src = 'img/demogorgon.png'
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.imageDemogorgon, this.demogorgonsPos.x, this.demogorgonsPos.y, this.demogorgonsSize.w, this.demogorgonsSize.h)
    }

    move() {
        this.demogorgonsPos.y += this.speed
    }
}