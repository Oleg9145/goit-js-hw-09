import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const amountInput = form.querySelector('[name="amount"]');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const amount = parseInt(amountInput.value, 10);

  if (isNaN(amount)) {
    Notiflix.Notify.Failure('Будь ласка, введіть коректну кількість промісів.');
    return;
  }

  for (let i = 1; i <= amount; i++) {
    const delay = 1000 + i * 500;
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
