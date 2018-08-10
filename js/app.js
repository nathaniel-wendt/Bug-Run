// this class sets enemy attributes, y argument determines which row (1-4) enemy will spawn
class Enemy {
    constructor(y) {
        this.x = -101; // starts all enemies off-screen
        this.y = (y * 83) - 15; // Subtracted 15px to center sprite on game tile
        this.xMove = 101;
        this.speed = Math.floor((Math.random() * 200) + 100);
        this.sprite = 'images/enemy-bug.png';
    }

    // this renders the enemy sprites
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // this uses dt to standardize time across all machines & randomizes enemy speed
    update(dt) {
        if (this.x < this.xMove * 5) {
            this.x += this.speed * dt;
        } else {
            setTimeout(() => {
                this.x = -120;
                this.speed = Math.floor((Math.random() * 200) + 100);
            }, 100);
        }
    }
};

// this class sets the player starting position and dictates distance between moves
class Hero {
    constructor() {
        this.x = 202;
        this.y = 400;
        this.xMove = 101;
        this.yMove = 83;
        this.xMax = this.xMove * 4;
        this.yMax = (this.yMove * 5) - 15; // Subtracted 15px to center sprite on game tile
        this.sprite = 'images/char-boy.png';
        this.hitCount = 0;
        this.winner = false;
    }

    // this renders the player sprite
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // this checks player x & y coordinates on KeyPress so sprite stays within the gameboard
    handleInput(keyPress) {
        if (keyPress === 'left' && this.x > 0) {
            this.x -= this.xMove;
        }
        if (keyPress === 'right' && this.x < this.xMax) {
            this.x += this.xMove;
        }
        if (keyPress === 'up' && this.y > 0) {
            this.y -= this.yMove;
        }
        if (keyPress === 'down' && this.y < this.yMax) {
            this.y += this.yMove;
        }
    }

    // this triggers player.reset(); if Hero and Enemy come within 40px on x or y axis
    update() {
        for(let enemy of allEnemies) {
            if ((enemy.x >= this.x - 40 && enemy.x <= this.x + 40) && 
                (enemy.y >= this.y - 40 && enemy.y <= this.y + 40)) {
                    this.reset();
                }
            }

        // if player made it across, after brief delay, display "You Won!" alert
        if (this.y === -15) {
            setTimeout(() => {
                this.winner = true;
                this.reset();
            }, 1)
        }
    }

    // this returns player to bottom middle square and updates game status
    reset() {
        this.x = 202;
        this.y = 400;
        // if player made it across, reset sprite, hitCount, and winner flag to false
        if (this.winner === true) {
            alert('You Won!');
            this.sprite = 'images/char-boy.png';
            this.hitCount = 0;
            this.winner = false;
        }
        // first player/enemy collision increases hitCount and changes sprite
        else if (this.hitCount === 0) {
            this.sprite = 'images/char-boy-hurt1.png';
            this.hitCount += 1;
        }
        // second player/enemy collision increases hitCount and changes sprite again
        else if (this.hitCount === 1) {
            this.sprite = 'images/char-boy-hurt2.png';
            this.hitCount += 1;
        // third player/enemy collision ends game, reverts hitCount and sprite for new game
        } else {
            alert('Game Over!');
            this.sprite = 'images/char-boy.png';
            this.hitCount = 0;
        }  
    }
};

// this Instantiates player & enemy objects
const player = new Hero();

const allEnemies = [];
const bug1 = new Enemy(1);
const bug2 = new Enemy(2);
const bug3 = new Enemy(3);
const bug4 = new Enemy(4);

// this pushes bug enemies into the allEnemies array;
allEnemies.push(bug1, bug2, bug3, bug4);

// this listens & sends keypresses to player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
