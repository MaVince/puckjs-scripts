const BASE_TIME = 100;
const timesBase = (multiplier) => (multiplier * BASE_TIME);
const DOT_TIME = timesBase(1);
const DASH_TIME = timesBase(3);
const INTER_SYMBOL_TIME = timesBase(1);
const INTER_LETTER_TIME = timesBase(3);
const INTER_WORD_TIME = timesBase(7);
const LETTERS_TO_MORSE = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..'
};
const leds = [LED1, LED2, LED3];
const RED = 0;
const GREEN = 1;
const BLUE = 2;

let isPlaying = false;

function playMorseString(str, ledId) {
  if (str.length <= 0) {
    isPlaying = false;
    return null;
  }

  if (typeof str === 'string') {
    return playMorseString(str.split(''), ledId);
  }

  const symbol = str.shift();
  let nextDelay;

  switch (symbol) {
    case '.':
      leds[ledId].set();
      str.unshift('~');
      nextDelay = DOT_TIME;
    break;
    case '-':
      leds[ledId].set();
      str.unshift('~');
      nextDelay = DASH_TIME;
    break;
    case ' ':
      nextDelay = INTER_WORD_TIME;
    break;
    case '~':
      nextDelay = INTER_SYMBOL_TIME;
    break;
    default:
      const convertedSymbols = LETTERS_TO_MORSE[symbol].split('');
      str.unshift.apply(str, convertedSymbols);
      nextDelay = INTER_LETTER_TIME;
    break;
  }

  setTimeout(() => {
    if (['.', '-'].indexOf(symbol) > -1) {
      leds[ledId].reset();
    }

    playMorseString(str, ledId);
  }, nextDelay);
}

function getRandomLetter() {
  const availableLetters = Object.keys(LETTERS_TO_MORSE);
  const lettersLength = availableLetters.length;
  const randomLetterIdx = Math.floor(lettersLength * Math.random());
  return availableLetters[randomLetterIdx];
}

let tries = 0;
let randomLetter = getRandomLetter();
let timeoutId = 0;

function onPressDownCallback() {
  tries++;
}

function onShortPressUpCallback() {
  if (isPlaying) {
    return null;
  }

  isPlaying = true;

  // play same letter
  playMorseString(randomLetter, RED);
}

function onLongPressUpCallback() {
  if (isPlaying) {
    return null;
  }

  isPlaying = true;

  // play new random letter
  randomLetter = getRandomLetter();
  playMorseString(randomLetter, tries > 1 ? BLUE : GREEN);
  tries = 0;
}

setWatch(function(e) {
  var len = e.time - e.lastTime;

  if (timeoutId) {
    onShortPressUpCallback();
    clearTimeout(timeoutId);
  }

  timeoutId = null;
}, BTN, { edge:"falling",repeat:true,debounce:50});

setWatch(function(e) {
  onPressDownCallback();
  timeoutId = setTimeout(function() {
    timeoutId = null;
    onLongPressUpCallback();
  }, 400);
}, BTN, { edge:"rising",repeat:true,debounce:50});
