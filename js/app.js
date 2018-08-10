// This class sets enemy attributes, y argument determines which row (1-4) enemy will spawn
class Enemy {
    constructor(y) {
        this.x = -101; // starts all enemies off-screen
        this.y = (y * 83) - 15; // Subtracted 15px to center sprite on game tile
        this.xMove = 101;
        this.speed = Math.floor((Math.random() * 200) + 100);
        this.sprite = 'images/enemy-bug.png';
    }
};

// This function randomly sets enemy speed & resets enemy position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < this.xMove * 5) {
        this.x += this.speed * dt;
    } else {
        setTimeout(() => {
            this.x = -120;
            this.speed = Math.floor((Math.random() * 200) + 100);
        }, 100);
    }
};

// This function renders the enemy sprites
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class sets the player starting position and dictates distance between moves
class Hero {
    constructor() {
        this.x = 202;
        this.y = 400;
        this.xMove = 101;
        this.yMove = 83;
        this.xMax = this.xMove * 4;
        this.yMax = (this.yMove * 5) - 15; // Subtracted 15px to center sprite on game tile
        this.sprite = 'images/char-boy.png';
    }
};

// This function checks for collision between Hero and Enemies
Hero.prototype.update = function() {
    for(let enemy of allEnemies) {
        if (this.y === enemy.y && (enemy.x + enemy.xMove/2 > this.x && enemy.x < this.x + this.xMove/2)) {
            this.sprite = 'images/char-boy-hurt1.png';
        }
    }
}

// This function renders the player sprite
Hero.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This checks player x & y coordinates on keyPress so sprite stays within the gameboard
Hero.prototype.handleInput = function(keyPress) {
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
};

// This Instantiates player & enemy objects
const player = new Hero();

const allEnemies = [];
const bug1 = new Enemy(1);
const bug2 = new Enemy(2);
const bug3 = new Enemy(3);
const bug4 = new Enemy(4);

// This pushes bug enemies into the allEnemies array;
allEnemies.push(bug1, bug2, bug3, bug4);

// This listens & sends keypresses to player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
