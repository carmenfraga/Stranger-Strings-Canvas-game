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
            if (key === 'Shift') {
                this.player.shoot()
            }
        }
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.gameSize)
    },

    createDemogorgons() {
        this.demogorgons.push(new Demogorgons(this.ctx, this.gameSize))

    },

    createPancakes() {
        this.pancakes.push(new Pancakes(this.ctx, this.gameSize))

    },

    createBullets() {
        this.bullets.push(new Bullets(this.ctx, this.gameSize))

    },

    start() {
        setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.framesIndex++
            if (this.framesIndex % 30 === 0) {
                this.createDemogorgons()
            }
            if (this.framesIndex % 100 === 0) {
                this.createPancakes()
            }
        }, 150)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    drawAll() {
        this.player.draw()
        this.demogorgons.forEach(eachDemogorgon => eachDemogorgon.draw())
        this.pancakes.forEach(eachPancake => eachPancake.draw())
        this.bullets.forEach(eachBullet => eachBullet.draw())

    },
}