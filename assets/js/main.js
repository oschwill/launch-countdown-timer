const day = document.querySelectorAll('.day');
const hour = document.querySelectorAll('.hour');
const minute = document.querySelectorAll('.minute');
const second = document.querySelectorAll('.second');

/* CONTAINER */
const output = document.querySelector('.output');
const topLetter = document.querySelectorAll('.top-letter');
const bottomLetter = document.querySelectorAll('.bottom-letter');

let countDownDate = new Date('Feb 7, 2024 00:00:00').getTime();
let milliSecond = 1000;
let checkChange = { x: 10 };

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

    let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    let hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((countdown % (1000 * 60)) / 1000);

    // animate the letters
    animateLetters([days, hours, minutes, seconds]);

    day.forEach((d) => (d.innerText = String(days).length > 1 ? days : ('0' + days).slice(-2)));
    hour.forEach((d) => (d.innerText = String(hours).length > 1 ? hours : ('0' + hours).slice(-2)));
    minute.forEach(
      (d) => (d.innerText = String(minutes).length > 1 ? minutes : ('0' + minutes).slice(-2))
    );
    second.forEach(
      (d) => (d.innerText = String(seconds).length > 1 ? seconds : ('0' + seconds).slice(-2))
    );
  }, milliSecond);
})();

const animateLetters = (timeArr) => {
  checkChange.watch('x', function (id, oldVal, newVal) {
    console.log(id + ' changed from ' + oldVal + ' to ' + newVal);
  });
  console.log(timeArr);
};
