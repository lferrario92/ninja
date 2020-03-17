var joystick
var joystickHolder = document.getElementById('joystickHolder');

joystick  = new VirtualJoystick({
  container : joystickHolder,
  mouseSupport  : true,
  stationaryBase: true,
  baseX: 180,
  baseY: 640 - 126,
  limitStickTravel: true,
  stickRadius: 65,
});

function calcAngleDegrees(x, y) {
  return Math.atan2(y, x) * 180 / Math.PI;
}
