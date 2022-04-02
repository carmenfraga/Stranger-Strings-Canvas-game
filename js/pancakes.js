class Pancakes {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.pancakesPos = { x: Math.random() * (600 - 20) + 20, y: 0 }
        this.pancakesSize = { w: 100, h: 100 }
        this.speed = 20
        this.gameSize = gameSize

        this.imagePancake = undefined

        this.init()
    }

    init() {
        this.imagePancake = new Image()
        this.imagePancake.src = 'img/pancake.png'
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.imagePancake, this.pancakesPos.x, this.pancakesPos.y, this.pancakesSize.w, this.pancakesSize.h)
    }

    move() {
        this.pancakesPos.y += this.speed
    }
}