var count = 0;
setWatch(function() {
  if(count === 0)
    LED1.set();
  else if (count === 1)
    LED2.set();
  else if (count === 2)
    LED3.set();
}, BTN1, {repeat:true, edge: 'rising', debounce: 50});

setWatch(function() {
  LED1.reset();
  LED2.reset();
  LED3.reset();
  count = (count + 1) % 3;
}, BTN1, {repeat:true, edge: 'falling', debounce: 50});
