var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('atari', 'assets/test_on.png');
    game.load.image('sky', 'assets/back.png');

    game.load.image('player', 'assets/player.png');
    game.load.image('vjoy_base', 'assets/base.png');
    game.load.image('vjoy_body', 'assets/body.png');
    game.load.image('vjoy_cap', 'assets/cap.png');

}

var sprite;
var cursors;
var joystick

function create() {

    game.add.image(0, 0, 'sky');

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    //  Make things a bit more bouncey
    game.physics.p2.defaultRestitution = 0.8;

    //  Add a sprite
    sprite = game.add.sprite(200, 200, 'atari');

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.p2.enable(sprite);

    //  Modify a few body properties
    sprite.body.setZeroDamping();
    sprite.body.fixedRotation = true;

    text = game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });

    cursors = game.input.keyboard.createCursorKeys();

    joystick  = new VirtualJoystick({
      container : document.getElementById('gameJoy'),
      mouseSupport  : true,
    });

    sprite2 = game.add.sprite(300, 300, 'player');

    game.vjoy = game.plugins.add(Phaser.Plugin.VJoy);

    game.vjoy.inputEnable(0, 0, 400, 600);
    game.vjoy.speed = {
        x:500,
        y:500
    };
}

function update() {

    sprite.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        sprite.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
        sprite.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
        sprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
        sprite.body.moveDown(400);
    }

    if (joystick.left())
    {
        sprite.body.moveLeft(400);
    }
    else if (joystick.right())
    {
        sprite.body.moveRight(400);
    }

    if (joystick.up())
    {
        sprite.body.moveUp(400);
    }
    else if (joystick.down())
    {
        sprite.body.moveDown(400);
    }


    var cursorsVjoy = game.vjoy.cursors;

    if (cursorsVjoy.left) {
        sprite2.x--;
    } else if (cursorsVjoy.right) {
        sprite2.x++;
    }

    if (cursorsVjoy.up) {
        sprite2.y--;
    } else if (cursorsVjoy.down) {
        sprite2.y++;
    }
}

function onUp() {
    console.log('up')
}