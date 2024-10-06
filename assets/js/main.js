const day = document.querySelectorAll('.day');
const hour = document.querySelectorAll('.hour');
const minute = document.querySelectorAll('.minute');
const second = document.querySelectorAll('.second');

/* CONTAINER */
const output = document.querySelector('.output');
const topLetter = document.querySelectorAll('.top-letter');
const bottomLetter = document.querySelectorAll('.bottom-letter');

/* PROPERTIES */
let countDownDate = new Date('May 31, 2025 00:00:00').getTime();
let milliSecond = 1000;
let animSecond = 250;
let animSecondDelay = 750;
let topLetterContainer, bottomLetterContainer;

// IFEE
(() => {
  let timer = setInterval(function () {
    // Holen uns immer die aktuelle Zeit
    let now = new Date().getTime();

    let countdown = countDownDate - now;

    if (countdown < milliSecond) {
      clearInterval(timer);
      output.innerHTML = 'COUNTDOWN FINISHED';
    }

    let timeObj = {
      days: Math.floor(countdown / (1000 * 60 * 60 * 24)),
      hours: Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((countdown % (1000 * 60)) / 1000),
    };

    // start animate letters
    animateLetters(timeObj);

    // paste values in html
    day.forEach(
      (d) =>
        (d.innerText =
          String(timeObj.days).length > 1 ? timeObj.days : ('0' + timeObj.days).slice(-2))
    );
    hour.forEach(
      (d) =>
        (d.innerText =
          String(timeObj.hours).length > 1 ? timeObj.hours : ('0' + timeObj.hours).slice(-2))
    );
    minute.forEach(
      (d) =>
        (d.innerText =
          String(timeObj.minutes).length > 1 ? timeObj.minutes : ('0' + timeObj.minutes).slice(-2))
    );
    second.forEach(
      (d) =>
        (d.innerText =
          String(timeObj.seconds).length > 1 ? timeObj.seconds : ('0' + timeObj.seconds).slice(-2))
    );
  }, milliSecond);
})();

const animateLetters = ({ days, hours, minutes, seconds }) => {
  // animate Seconds
  animater(topLetterContainer.seconds, bottomLetterContainer.seconds);
  switch (true) {
    case seconds === 0 && minutes > 0:
      // Animate minutes
      animater(topLetterContainer.minutes, bottomLetterContainer.minutes);
      break;
    case seconds === 0 && minutes === 0 && hours > 0:
      // Animate hours and minutes
      animater(topLetterContainer.minutes, bottomLetterContainer.minutes);
      animater(topLetterContainer.hours, bottomLetterContainer.hours);
      break;
    case seconds === 0 && minutes === 0 && hours === 0:
      // Animate days, hours and minutes
      animater(topLetterContainer.minutes, bottomLetterContainer.minutes);
      animater(topLetterContainer.hours, bottomLetterContainer.hours);
      animater(topLetterContainer.days, bottomLetterContainer.days);
      break;
    default:
      break;
  }
};

const init = () => {
  topLetterContainer = {
    days: topLetter[0],
    hours: topLetter[1],
    minutes: topLetter[2],
    seconds: topLetter[3],
  };

  bottomLetterContainer = {
    days: bottomLetter[0],
    hours: bottomLetter[1],
    minutes: bottomLetter[2],
    seconds: bottomLetter[3],
  };
};

const animater = (topLetter, bottomLetter) => {
  topLetter.animate(
    { transform: 'rotateX(360deg)' },
    { duration: animSecond, iterations: 1, delay: animSecondDelay }
  );
  bottomLetter.animate(
    { transform: 'rotateX(-360deg)' },
    { duration: animSecond, iterations: 1, delay: animSecondDelay }
  );
};

init();
