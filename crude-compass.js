var low = { "x": -4429, "y": 3456, "z": -1048 };
var high = { "x": -3608, "y": 4092, "z": 28 };

function onMag(p) {
  console.log('current', p);

  if (p.x < -4000 && p.y > 3800) {
    LED1.set();
  } else {
    LED1.reset();
  }
}

Puck.on('mag', onMag);
Puck.magOn(5);
