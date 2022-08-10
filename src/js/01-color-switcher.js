function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const startBtn = document.querySelector('[data-start]')
const closeBtn = document.querySelector('[data-stop]')
const body = document.querySelector('body')

 
function colorSwitcher (){
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  
  startBtn.disabled = true;
  // startBtn.removeEventListener('click',colorSwitcher)
}

function disableColorSwitcher (){
 
  startBtn.disabled = false;
clearInterval(intervalId);

// startBtn.addEventListener('click', colorSwitcher);

}
startBtn.addEventListener('click', colorSwitcher);
closeBtn.addEventListener('click', disableColorSwitcher);


