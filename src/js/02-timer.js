import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('[data-start]')
const days = document.querySelector('[data-days]')
const hours = document.querySelector('[data-hours]')
const minutes = document.querySelector('[data-minutes]')
const seconds = document.querySelector('[data-seconds]')
const calendar = document.querySelector('.timer');



let date = new Date();
let timer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
if(selectedDates[0] <= date){
    Notiflix.Notify.failure('Please choose a date in the future');
    // date = new Date();
    // selectedDates[0] = date;
}else {
timer = new Date(selectedDates)
startBtn.disabled = false;
}
  },
};

 startBtn.disabled = true;
flatpickr(inputEl, options);

startBtn.addEventListener('click', startTimer)

function startTimer(){
    Notiflix.Notify.success('Timer is on!');
    startBtn.disabled = true;

    const intervalId = setInterval(() => {
        date = new Date();
        const deltaTime = timer - date;
        const selectDate = convertMs(deltaTime);
        const keys = Object.keys(selectDate)

        for(let key of keys){
            calendar.querySelector(`[data-${key}]`).textContent = selectDate[key]
        }
       
    
        if (deltaTime < 1000){
            clearInterval(intervalId);
            Notiflix.Notify.info('Time is up!');
         };
    }, 1000);
}



function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };

}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  };

  function updateDataInterface(dataObj) {
    const { days, hours, minutes, seconds } = dataObj;
  
  days.textContent = days;
  hours.textContent = hours;
 minutes.textContent = minutes;
 seconds.textContent = seconds;
  }

// // імпортуємо бібліотеки flatpickr та notiflix
// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// // додаємо темну тему до календаря вибору дати
// require('flatpickr/dist/themes/dark.css');

// const refs = {
//   startBtn: document.querySelector('button[data-start]'),
//   days: document.querySelector('span[data-days]'),
//   hours: document.querySelector('span[data-hours]'),
//   minutes: document.querySelector('span[data-minutes]'),
//   seconds: document.querySelector('span[data-seconds]'),
// };

// // додаємо змінну з поточним часом для перевірки вибору дати в майбутньому
// let date = new Date();

// // додаємо змінну з часом для таймера, яка надалі зміниться
// let dateForTimer = null;

// // додаємо об'єкт опцій для flatpickr
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] <= date) {
//       // повідомлення та скидання дати та часу в інпуті до поточних
//       Notify.failure('Please choose a date in the future');
//       date = new Date();
//       selectedDates[0] = date;
//     } else {
//       //присвоєння в змінну вибрану дату
//       refs.startBtn.removeAttribute('disabled');
//       dateForTimer = new Date(selectedDates);
//     }
//   },
// };

// // створюємо екземпляр класу flatpickr
// flatpickr('#datetime-picker', options);

// // встановлюємо на кнопку атрибут disabled і додаємо слухача
// refs.startBtn.setAttribute('disabled', '');
// refs.startBtn.addEventListener('click', startTheTimer);

// // функція, яка запускає таймер зворотнього відліку
// function startTheTimer() {
//   Notify.success('Timer is on!');
//   refs.startBtn.setAttribute('disabled', '');

//   // запускаємо таймер з функцією, яка виконається кожні 1000ms
//   const timerId = setInterval(() => {
//     date = new Date();
//     const objectOfData = convertMs(dateForTimer - date);

//     // оновлюємо інтерфейс
//     updateDataInterface(objectOfData);

//     // якщо час вийшов, очищаємо таймер і показуємо повідомлення
//     if (isTimeUp(objectOfData)) {
//       Notify.info('Time is up!');
//       clearInterval(timerId);
//     }
//   }, 1000);
// }

// // функція для перевірки, чи вийшов час
// const isTimeUp = obj => Object.values(obj).every(el => el === '00');

// // функція, яка конвертує секунди в дні, години, хвилини, секунди
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }

// // функція, яка перетворює одноцифрове число в рядок з нулем попереду
// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }

// //
// function updateDataInterface(dataObj) {
//   const { days, hours, minutes, seconds } = dataObj;

//   refs.days.textContent = days;
//   refs.hours.textContent = hours;
//   refs.minutes.textContent = minutes;
//   refs.seconds.textContent = seconds;
// }