class Player {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.playerSize = { w: 150, h: 150 }
        this.playerPos = { x: this.gameSize.w / 2 - 80, y: this.gameSize.h - 150 }
        this.health = 5
        this.imagePlayer1 = undefined


        this.bullets = []

        this.init()
    }

    init() {
        this.imagePlayer1 = new Image()
        this.imagePlayer1.src = 'img/player11.png'
        //this.healthCounter()
    }

    draw() {
        this.ctx.drawImage(this.imagePlayer1, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.bullets.forEach(eachBullet => eachBullet.draw())
        this.clearBullets()
    }

    moveLeft() {
        if (this.playerPos.x > 0) {
            this.playerPos.x -= 50
        } else {
        }
    }

    moveRight() {
        if (this.playerPos.x < this.gameSize.w - this.playerSize.w) {
            this.playerPos.x += 50
        } else {
        }
    }


    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.gameSize, this.playerPos.x, this.playerPos.y, this.playerSize.w))
    }

    clearBullets() {
        this.bullets = this.bullets.filter(eachBullet => eachBullet.bulletsPos.y >= 0)
    }
}
