var throttle = require('lodash.throttle');
const emailEl = document.querySelector('label [name="email"]');
const textareaEl = document.querySelector('label [name="message"]');
const formEl = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onInputForm, 500));

formEl.addEventListener('submit', onFormSubmit)

function onInputForm() {
  const email = emailEl.value;
  const message = textareaEl.value;



  const formData = {
    email,
    message,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

onReloadPage();

function onReloadPage() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    emailEl.value = savedData.email;
    textareaEl.value = savedData.message;
  }
}


function onFormSubmit(event){
    event.preventDefault();
    const email = emailEl.value;
    const message = textareaEl.value;
  
  
  
    const formData = {
      email,
      message,
    };
    formEl.reset()
localStorage.removeItem(STORAGE_KEY)

console.log(formData);
}