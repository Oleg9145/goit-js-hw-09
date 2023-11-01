import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerFields = document.querySelectorAll('.timer .value');

let countdownInterval;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(selectedDate) {
  const now = new Date();
  const timeRemaining = Math.max(selectedDate - now, 0);

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  timerFields[0].textContent = String(days).padStart(2, '0');
  timerFields[1].textContent = String(hours).padStart(2, '0');
  timerFields[2].textContent = String(minutes).padStart(2, '0');
  timerFields[3].textContent = String(seconds).padStart(2, '0');

  if (timeRemaining === 0) {
    clearInterval(countdownInterval);
    startButton.disabled = false;
  }
}

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  minDate: 'today',
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    startButton.disabled = !selectedDate || selectedDate <= new Date();
    if (startButton.disabled) {
      timerFields.forEach(field => (field.textContent = '00'));
      window.alert('Please choose a date in the future');
    } else {
      clearInterval(countdownInterval);
      updateTimer(selectedDate);
    }
  },
});

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(datePicker.value, 'Y-m-d H:i');
  startButton.disabled = true;
  updateTimer(selectedDate);
  countdownInterval = setInterval(() => updateTimer(selectedDate), 1000);
});
