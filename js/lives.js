class Lives {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.livesPos = { x: 100, y: 100 }
        this.livesSize = { w: 50, h: 50 }

        this.init()
    }

    init() {
        this.imageLives = new Image()
        this.imageLives.src = 'img/Pink-Heart-Vector-PNG-File.png'
    }

    draw() {
        this.ctx.drawImage(this.imageLives, this.LivesPos.x, this.LivesPos.y, this.LivesSize.w, this.LivesSize.h)
    }
}