import Player from '@vimeo/player'
import throttle from 'lodash.throttle';

const STORAGE_KEY = "videoplayer-current-time";
const playerEl = document.querySelector('#vimeo-player')
const player = new Player(playerEl);

player.on('timeupdate', throttle(videoSeconds, 1000));

function videoSeconds(data){
    localStorage.setItem(STORAGE_KEY, data.seconds)
}


player.setCurrentTime(localStorage.getItem(STORAGE_KEY)).then(function(seconds) {
   
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
        
            break;

        default:
        
            break;
    }
});