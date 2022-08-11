import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('[data-start]')
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


