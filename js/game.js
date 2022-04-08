window.onload = () => {

    const startGameDOM = document.querySelector('#start-game')
    const myCanvasDOM = document.querySelector('#myCanvas')

    const playerImages = document.querySelectorAll('.playerImg')
    Array.from(playerImages).forEach(function (img) {
        img.addEventListener("click", function (e) {
            const imgSrc = e.target.getAttribute('src')
            startGameDOM.classList.add("hide")
            strangerStringsGame.init('myCanvas', imgSrc)
            myCanvasDOM.classList.remove("hide")

        })
    });
}

const strangerStringsGame = {
    name: 'Stranger Strings Game',
    description: 'Stranger Strings Canvas game',
    version: '1.0.0',
    author: 'Paula y Carmen',
    license: undefined,
    canvasNode: undefined,
    ctx: undefined,
    gameSize: { w: undefined, h: undefined },

    score: 0,
    level: 1,
    player: undefined,
    lives: undefined,
    demogorgons: [],
    pancakes: [],
    megalife: [],
    framesIndex: 0,

    init(myCanvasID, playerImage) {
        this.canvasNode = document.querySelector(`#${myCanvasID}`)
        this.ctx = this.canvasNode.getContext('2d')
        console.log('EL CONTEXTO:', this.ctx)
        this.playerImage = playerImage
        this.imageGameOver = new Image()
        this.imageGameOver.src = 'img/gameover.png'
        this.setDimensions()
        this.setEventListeners()
        this.createPlayer()
        this.createLives()
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
        document.onkeydown = event => {
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
        this.player = new Player(this.ctx, this.gameSize, this.playerImage)
    },

    createDemogorgons() {
        this.demogorgons.push(new Demogorgons(this.ctx, this.gameSize))
    },

    createPancakes() {
        this.pancakes.push(new Pancakes(this.ctx, this.gameSize))
    },

    createMegalife() {
        this.megalife.push(new Megalife(this.ctx, this.gameSize))
    },

    createLives() {
        if (this.player.health === 5) {
            this.lives = new Lives(this.ctx, this.gameSize, 'img/hearts5.png')
        }
        if (this.player.health === 4) {
            this.lives.imageLives.src = 'img/hearts4.png'
        }
        if (this.player.health === 3) {
            this.lives.imageLives.src = 'img/hearts3.png'
        }
        if (this.player.health === 2) {
            this.lives.imageLives.src = 'img/hearts2.png'
        }
        if (this.player.health === 1) {
            this.lives.imageLives.src = 'img/hearts1.png'
        }
        if (this.player.health === 0) {
            this.lives.imageLives.src = 'img/hearts0.png'
        }
    },

    start() {
        this.interval = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.framesIndex++
            // demogorgon 
            if (this.framesIndex < 300) {
                if (this.framesIndex % 20 === 0) {
                    this.createDemogorgons()
                    //this.level = 1
                }
            }
            if (this.framesIndex >= 300) {
                if (this.framesIndex % 10 === 0) {
                    this.createDemogorgons()
                    this.level = 2
                }
            }
            if (this.framesIndex > 600) {
                if (this.framesIndex % 5 === 0) {
                    this.createDemogorgons()
                    this.level = 3
                }
            }

            // pancakes 
            if (this.framesIndex <= 600) {
                if (this.framesIndex % 100 === 0) {
                    this.createPancakes()
                }
            }
            if (this.framesIndex > 600) {
                if (this.framesIndex % 70 === 0) {
                    this.createPancakes()
                }
            }

            // megalife 
            if (this.framesIndex > 590) {

                if (this.framesIndex % 80 === 0) {
                    this.createMegalife()
                }
            }

            // pop up level 
            if (this.framesIndex > 300 && this.framesIndex < 315) {
                this.popUpLevel()
            }
            if (this.framesIndex > 600 && this.framesIndex < 615) {
                this.popUpLevel()
            }

            this.demogorgonCollision()
            this.pancakeCollision()
            this.megalifeExplosion()
            this.healthCounter()
            this.exitDemogorgon()
            this.drawScore()
            this.drawLevel()
            this.createLives()
            this.lives.draw()
            this.gameOver()

        }, 150)
        //Theme song
        let themeSong = new Audio("./sounds/Themesong.mp3")
        themeSong.play()
    },

    reset() {
        //this.background = new Background()
        this.player = new Player(this.ctx, this.gameSize)
        this.lives = new Lives(this.ctx, this.gameSize, this.imageLives)
        this.demogorgons = []
        this.pancakes = []
        this.megalife = []
        this.score = 0
        this.framesIndex = 0
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    drawAll() {
        this.player.draw()
        this.demogorgons.forEach(eachDemogorgon => eachDemogorgon.draw())
        this.pancakes.forEach(eachPancake => eachPancake.draw())
        this.megalife.forEach(eachMegalife => eachMegalife.draw())
    },

    drawLevel() {
        this.ctx.font = 'bold 25px Arial'
        this.ctx.fillStyle = '#DC3732'
        this.ctx.fillText(`Level: ${this.level}`, 40, 100)

    },

    popUpLevel() {
        this.ctx.font = 'bold 150px Arial'
        this.ctx.fillStyle = 'rgba(11, 42, 66, .5)'
        this.ctx.fillText(`Level: ${this.level}`, 450, 400)
    },

    demogorgonCollision() {
        this.demogorgons.forEach((eachDemogorgon) => {
            this.player.bullets.forEach((eachBullet) => {

                if (eachBullet.bulletsPos.x < eachDemogorgon.demogorgonsPos.x + eachDemogorgon.demogorgonsSize.w &&

                    eachBullet.bulletsPos.x + eachBullet.radius > eachDemogorgon.demogorgonsPos.x &&

                    eachBullet.bulletsPos.y < eachDemogorgon.demogorgonsPos.y + eachDemogorgon.demogorgonsSize.h &&

                    eachBullet.radius + eachBullet.bulletsPos.y > eachDemogorgon.demogorgonsPos.y) {
                    // demogorgon desaparece 
                    const index = this.demogorgons.indexOf(eachDemogorgon)
                    this.demogorgons.splice(index, 1)
                    // bullet desaparece
                    const bulletIndex = this.player.bullets.indexOf(eachBullet)
                    this.player.bullets.splice(bulletIndex, 1)
                    // suma score al matar demogorgon
                    this.score++
                    //kill demogorgon sound
                    let killDemogorgonSound = new Audio("./sounds/hitdemogorgon.wav")
                    killDemogorgonSound.play()
                } else {
                }
            })
        })
    },

    pancakeCollision() {
        this.pancakes.forEach((eachPancake) => {

            if (this.player.playerPos.x < eachPancake.pancakesPos.x + eachPancake.pancakesSize.w &&

                this.player.playerPos.x + this.player.playerSize.w > eachPancake.pancakesPos.x &&

                this.player.playerPos.y < eachPancake.pancakesPos.y + eachPancake.pancakesSize.h &&

                this.player.playerSize.h + this.player.playerPos.y > eachPancake.pancakesPos.y) {
                // pancake desaparece 
                const index = this.pancakes.indexOf(eachPancake)
                this.pancakes.splice(index, 1)
                if (this.player.health < 5) {
                    this.player.health++
                }
                //Take pancake sound
                let takePancakeSound = new Audio("./sounds/pancake.wav")
                takePancakeSound.play()
            } else {
            }
        })
    },

    megalifeExplosion() {
        this.megalife.forEach((eachMegalife) => {

            if (this.player.playerPos.x < eachMegalife.megalifePos.x + eachMegalife.megalifeSize.w &&

                this.player.playerPos.x + this.player.playerSize.w > eachMegalife.megalifePos.x &&

                this.player.playerPos.y < eachMegalife.megalifePos.y + eachMegalife.megalifeSize.h &&

                this.player.playerSize.h + this.player.playerPos.y > eachMegalife.megalifePos.y) {
                // megalife desaparece 
                const index = this.megalife.indexOf(eachMegalife)
                this.megalife.splice(index, 1)
                this.demogorgons = []

                //Take megalife sound
                let takeMegalifeSound = new Audio("./sounds/explosion.wav")
                takeMegalifeSound.play()
            } else {
            }
        })
    },

    healthCounter() {
        this.demogorgons.forEach((eachDemogorgon) => {
            if (eachDemogorgon.demogorgonsPos.y >= this.gameSize.h) {
                this.player.health -= 1
                //Lost life sound
                let lostLifeSound = new Audio("./sounds/lostlife.wav")
                lostLifeSound.play()
            }
        })
    },

    exitDemogorgon() {
        this.demogorgons.forEach((eachDemogorgon) => {
            if (eachDemogorgon.demogorgonsPos.y >= this.gameSize.h) {
                const index = this.demogorgons.indexOf(eachDemogorgon)
                this.demogorgons.splice(index, 1)
            }
        })
    },

    drawScore() {
        this.ctx.font = 'bold 25px Arial'
        this.ctx.fillStyle = '#DC3732'
        this.ctx.fillText(`Score: ${this.score}`, 40, 140)
    },

    gameOver() {
        if (this.player.health === 0) {
            //Game over sound
            let gameOverSound = new Audio("./sounds/gameover.wav")
            gameOverSound.play()

            clearInterval(this.interval)

            //myCanvas se oculte y aparezca start-again
            const myCanvasDOM = document.querySelector('#myCanvas')
            myCanvasDOM.classList.add("hide")

            const startGameDOM = document.querySelector('#start-game')

            const startAgainDOM = document.querySelector('#start-again')
            const buttonStartAgain = startAgainDOM.querySelector('#start-again-button')

            const finalScore = document.getElementById('score')
            finalScore.innerHTML = `Score: ${this.score}`

            startAgainDOM.classList.remove("hide")

            //Al click, se oculte start-again y aparezca start-game
            buttonStartAgain.addEventListener("click", function () {
                console.log('FUNCIONOOOOO')

                startAgainDOM.classList.add("hide")
                startGameDOM.classList.remove("hide")
            })

            this.reset()
        }
    },

}