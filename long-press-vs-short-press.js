var timeoutId = null;
var leds = [LED1, LED2, LED3];
var idx = 0;

setWatch(function(e) {
  var len = e.time - e.lastTime;
  if (timeoutId) {
    digitalPulse(leds[idx],1,100);
    clearTimeout(timeoutId);
  }

  timeoutId = null;
}, BTN, { edge:"falling",repeat:true,debounce:50});

setWatch(function(e) {
  timeoutId = setTimeout(function() {
    idx = (idx + 1) % 3;
    timeoutId = null;
    digitalPulse(leds[idx], 1, 250);
  }, 400);
}, BTN, { edge:"rising",repeat:true,debounce:50});
