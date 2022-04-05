class Lives {
    constructor(ctx, gameSize, imageLives) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.livesPos = { x: 30, y: 20 }
        this.livesSize = { w: 210, h: 100 }
        this.imageLives = imageLives

        this.init()
    }

    init() {
        this.imageLives = new Image()
        this.imageLives.src = 'img/hearts5.png'
    }

    draw() {
        this.ctx.drawImage(this.imageLives, this.livesPos.x, this.livesPos.y, this.livesSize.w, this.livesSize.h)
    }
}