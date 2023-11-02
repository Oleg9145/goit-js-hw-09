import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = form.querySelector('[name="delay"]');
const stepInput = form.querySelector('[name="step"]');
const amountInput = form.querySelector('[name="amount"]');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const initialDelay = parseInt(delayInput.value);
  const delayStep = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  for (let i = 1; i <= amount; i++) {
    const delay = initialDelay + (i - 1) * delayStep;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        const successMessage = `Promise ${position} виконався через ${delay} мс: Виконано`;
        console.log(successMessage);
        Notiflix.Notify.success(successMessage);
      })
      .catch(({ position, delay }) => {
        const failureMessage = `Promise ${position} виконався через ${delay} мс: Відхилено`;
        console.log(failureMessage);
        Notiflix.Notify.failure(failureMessage);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
