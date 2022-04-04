class Player {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.playerPos = { x: this.gameSize.w / 2, y: this.gameSize.h - 130 }
        this.playerSize = { w: 100, h: 100 }
        this.health = 5
        this.imagePlayer1 = undefined


        this.bullets = []

        this.init()
    }

    init() {
        this.imagePlayer1 = new Image()
        this.imagePlayer1.src = 'img/player1.png'
        //this.healthCounter()
    }

    draw() {
        this.ctx.drawImage(this.imagePlayer1, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.bullets.forEach(eachBullet => eachBullet.draw())
        this.clearBullets()
    }

    moveLeft() {
        // if (this.playerPos.x = 0 + this.playerSize.w) {
        //     this.playerPos.x = this.playerSize.w
        // } else {
        this.playerPos.x -= 50
    }

    moveRight() {
        // if (this.playerPos.x >= this.gameSize.w - this.playerSize.w) {
        //     // this.playerPos.x = this.gameSize.w - this.playerSize.w
        // } else {
        this.playerPos.x += 50
    }


    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.gameSize, this.playerPos.x, this.playerPos.y, this.playerSize.w))
    }

    clearBullets() {
        this.bullets = this.bullets.filter(eachBullet => eachBullet.bulletsPos.y >= 0)
    }
}
