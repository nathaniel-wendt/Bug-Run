// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y - 15; // Subtracted 15px to center sprite on game tile
        this.xMove = 101;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// This renders the enemy sprites to simulate movement
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

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

// This renders the player sprite to simulate movement
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

const bug1 = new Enemy(0, 0, 200);
const allEnemies = [];
allEnemies.push(bug1);

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
