class Player {
    constructor(ctx, gameSize, imgSrc) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.playerSize = { w: 150, h: 150 }
        this.playerPos = { x: this.gameSize.w / 2 - 80, y: this.gameSize.h - 150 }
        this.health = 5
        this.speed = 60
        this.imagePlayer = undefined
        this.imageSrc = imgSrc


        this.bullets = []

        this.init()
    }

    init() {
        this.imagePlayer = new Image()
        this.imagePlayer.src = this.imageSrc
    }

    draw() {
        this.ctx.drawImage(this.imagePlayer, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.bullets.forEach(eachBullet => eachBullet.draw())
        this.clearBullets()
    }

    moveLeft() {
        if (this.playerPos.x > 0) {
            this.playerPos.x -= this.speed
        } else {
        }
    }

    moveRight() {
        if (this.playerPos.x < this.gameSize.w - this.playerSize.w) {
            this.playerPos.x += this.speed
        } else {
        }
    }


    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.gameSize, this.playerPos.x, this.playerPos.y, this.playerSize.w))
        //Shoot sound
        let shootSound = new Audio("./sounds/shoot.wav")
        shootSound.play()
    }

    clearBullets() {
        this.bullets = this.bullets.filter(eachBullet => eachBullet.bulletsPos.y >= 0)
    }
}
