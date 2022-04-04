class Bullets {
    constructor(ctx, gameSize, playerPosX, playerPosY, playerSizeW) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.bulletsPos = {
            x: playerPosX + playerSizeW,
            y: playerPosY + 10
        }
        this.speed = 30
        this.radius = 10

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


    // isCollision() {
    //     this.demogorgons.forEach((eachDemogorgon) => {

    //         if (this.bullets.bulletsPos.x < eachDemogorgon.demogorgonsPos.x + eachDemogorgon.demogorgonsSize.w &&

    //             this.bullets.bulletsPos.x + this.bullets.radius > eachDemogorgon.demosgorgonsPos.x &&

    //             this.bullets.bulletsPos.y < eachDemogorgon.demogorgonsPos.y + eachDemogorgon.demorgorgonsSize.h &&

    //             this.bullets.radius + this.bullets.bulletsPos.y > eachDemogorgon.demogorgonsPos.y) {

    //             Si hay colisión-- > GAME OVER

    //         } else {

    //             Si no hay colisión-- > SUMO PUNTOS SI EL OBSTÁCULO LLEGA AL FINAL DEL CANVAS SIN COLISIONAR

    //         }

    //     })
    // }

}
