class Player {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.playerPos = { x: 600, y: 600 }
        this.playerSize = { w: 100, h: 100 }
        this.gameSize = gameSize

        this.imagePlayer1 = undefined

        this.bullets = []

        this.init()
    }

    init() {
        this.imagePlayer1 = new Image()
        this.imagePlayer1.src = 'img/player1.png'
    }

    draw() {
        this.ctx.drawImage(this.imagePlayer1, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }

    moveLeft() {
        this.playerPos.x -= 50
    }

    moveRight() {
        this.playerPos.x += 50
    }

    shoot() {
        this.bullets.push
    }
}