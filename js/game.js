var game = new Phaser.Game(360, 640, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

function preload() {

  game.load.image('test', 'assets/test_on.png');
  game.load.image('sky', 'assets/back.png');

  game.load.image('vjoy_base', 'assets/base.png');
  game.load.image('vjoy_body', 'assets/body.png');
  game.load.image('vjoy_cap', 'assets/cap.png');


  game.load.tilemap('map', 'assets/test_map.json', null, Phaser.Tilemap.TILED_JSON);
}

var sprite;
var cursors;
var joystick
var joystickHolder = document.getElementById('joystickHolder');
var newJoy;


function create() {

  game.add.image(0, 0, 'sky');


  // map = game.add.tilemap('map');

  // layer = map.createLayer('Capa de Patrones 1');

  // layer.resizeWorld();
  // game.physics.p2.convertTilemap(map, layer);

  //  Enable p2 physics
  game.physics.startSystem(Phaser.Physics.P2JS);

  //  Make things a bit more bouncey
  game.physics.p2.defaultRestitution = 0.8;

  //  Add a sprite
  sprite = game.add.sprite(200, 200, 'test');
  ice = game.add.sprite(100, 50, 'vjoy_cap');

  //  Enable if for physics. This creates a default rectangular body.
  game.physics.p2.enable(sprite);
  game.physics.p2.enable(ice);

  game.world.setBounds(0, 0, 1920, 1920);

  game.camera.follow(sprite);

  //  Modify a few body properties
  sprite.body.setZeroDamping();
  sprite.body.fixedRotation = true;

  cursors = game.input.keyboard.createCursorKeys();

  joystick  = new VirtualJoystick({
    container : joystickHolder,
    mouseSupport  : true,
    stationaryBase: true,
    baseX: 180,
    baseY: 640 - 126,
    limitStickTravel: true,
    stickRadius: 65,
  });
}

function calcAngleDegrees(x, y) {
  return Math.atan2(y, x) * 180 / Math.PI;
}

const theDivisor = 5

function update() {

  sprite.body.setZeroVelocity();

  if (cursors.left.isDown)
  {
    sprite.body.moveLeft(200);
    sprite.angle = -90;
  }
  else if (cursors.right.isDown)
  {
    sprite.body.moveRight(200);
    sprite.angle = 90;
  }

  if (cursors.up.isDown)
  {
    sprite.body.moveUp(200);
    sprite.angle = 0;
  }
  else if (cursors.down.isDown)
  {
    sprite.body.moveDown(200);
    sprite.angle = 180;
  }

  if (joystick.left())
  {
    sprite.body.velocity.mx = (joystick._stickX - joystick._baseX) / theDivisor;
    sprite.angle = calcAngleDegrees(joystick._stickX - joystick._baseX, joystick._stickY - joystick._baseY);
  }
  else if (joystick.right())
  {
    sprite.body.velocity.mx = (joystick._stickX - joystick._baseX) / theDivisor;
    sprite.angle = calcAngleDegrees(joystick._stickX - joystick._baseX, joystick._stickY - joystick._baseY);
  }

  if (joystick.up())
  {
    sprite.body.velocity.my = (joystick._stickY - joystick._baseY) / theDivisor;
    sprite.angle = calcAngleDegrees(joystick._stickX - joystick._baseX, joystick._stickY - joystick._baseY);
  }
  else if (joystick.down())
  {
    sprite.body.velocity.my = (joystick._stickY - joystick._baseY) / theDivisor;
    sprite.angle = calcAngleDegrees(joystick._stickX - joystick._baseX, joystick._stickY - joystick._baseY);
  }
}
