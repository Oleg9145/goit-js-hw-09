const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;

function changeBackgroundColor() {
  const newColor = getRandomHexColor();
  document.body.style.backgroundColor = newColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;

  intervalId = setInterval(changeBackgroundColor, 1000);
});

stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
});
///////////// ///////