// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
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
        this.sprite = 'images/char-boy.png';
    }
};

// This renders the player sprite to simulate movement
Hero.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This checks player x & y coordinates on keyPress so sprite stays within the 5x6 grid
// If grid size changes, console.log(this.x); to determine new '&& this.x <' parameter
Hero.prototype.handleInput = function(keyPress) {
    if (keyPress === 'left' && this.x > 0) {
        this.x -= this.xMove;
    }
    if (keyPress === 'right' && this.x < 400) {
        this.x += this.xMove;
    }
    if (keyPress === 'up' && this.y > 0) {
        this.y -= this.yMove;
    }
    if (keyPress === 'down' && this.y < 400) {
        this.y += this.yMove;
    }
};

// This Instantiates player & enemy objects
const player = new Hero();

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
