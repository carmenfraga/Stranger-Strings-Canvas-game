const strangerStringsGame = {
    name: 'Stranger Strings Game',
    description: 'Stranger Strings Canvas game',
    version: '1.0.0',
    author: 'Paula y Carmen',
    license: undefined,
    canvasNode: undefined,
    ctx: undefined,
    gameSize: { w: undefined, h: undefined },

    player: undefined,
    demogorgons: [],
    pancakes: [],
    framesIndex: 0,

    init(myCanvasID) {
        this.canvasNode = document.querySelector(`#${myCanvasID}`)
        this.ctx = this.canvasNode.getContext('2d')
        console.log('EL CONTEXTO:', this.ctx)

        this.setDimensions()
        this.setEventListeners()
        this.createPlayer()
        this.start()
    },

    setDimensions() {
        this.gameSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        this.canvasNode.setAttribute('width', this.gameSize.w)
        this.canvasNode.setAttribute('height', this.gameSize.h)
    },

    setEventListeners() {
        document.onkeyup = event => {
            const { key } = event
            if (key === 'ArrowLeft') {
                this.player.moveLeft()
            }
            if (key === 'ArrowRight') {
                this.player.moveRight()
            }
            if (key === ' ') {
                this.player.shoot()
            }
        }
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.gameSize)
    },

    createDemogorgons() {
        this.demogorgons.push(new Demogorgons(this.ctx, this.gameSize))
        console.log(this.demogorgons)
    },

    createPancakes() {
        this.pancakes.push(new Pancakes(this.ctx, this.gameSize))

    },

    start() {
        this.interval = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.framesIndex++
            if (this.framesIndex % 30 === 0) {
                this.createDemogorgons()
            }
            if (this.framesIndex % 100 === 0) {
                this.createPancakes()
            }
            this.isCollision()
            console.log(this.player.bullets)

        }, 150)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    drawAll() {
        this.player.draw()
        this.demogorgons.forEach(eachDemogorgon => eachDemogorgon.draw())
        this.pancakes.forEach(eachPancake => eachPancake.draw())
    },

    isCollision() {
        this.demogorgons.forEach((eachDemogorgon) => {
            this.player.bullets.forEach((eachBullet) => {

                if (eachBullet.bulletsPos.x < eachDemogorgon.demogorgonsPos.x + eachDemogorgon.demogorgonsSize.w &&

                    eachBullet.bulletsPos.x + eachBullet.radius > eachDemogorgon.demogorgonsPos.x &&

                    eachBullet.bulletsPos.y < eachDemogorgon.demogorgonsPos.y + eachDemogorgon.demogorgonsSize.h &&

                    eachBullet.radius + eachBullet.bulletsPos.y > eachDemogorgon.demogorgonsPos.y) {
                    const index = this.demogorgons.indexOf(eachDemogorgon)

                    return this.demogorgons.splice(index, 1)

                } else {

                    // Si no hay colisión --> SUMO PUNTOS SI EL OBSTÁCULO LLEGA AL FINAL DEL CANVAS SIN COLISIONAR



                    //   if (this.car.carPos.x < eachObstacle.obstaclePos.x + eachObstacle.obstacleSize.w &&

                    //     this.car.carPos.x + this.car.carSize.w > eachObstacle.obstaclePos.x &&

                    //     this.car.carPos.y < eachObstacle.obstaclePos.y + eachObstacle.obstacleSize.h &&

                    //     this.car.carSize.h + this.car.carPos.y > eachObstacle.obstaclePos.y) {



                }
            })

        })

    },

    // gameOver() {
    //     clearInterval(this.interval)
    // }
}