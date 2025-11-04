const stopWatch = document.querySelector(".stopWatch");
const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const continueBtn = document.querySelector(".continue-btn");
const restartBtn = document.querySelector(".restart-btn");

let milliSeconds = 0;
    seconds = 0, 
    minutes = 0,
    hours = 0;

let startTime = () => {
    milliSeconds += 10;
    if( milliSeconds >= 1000) {
        milliSeconds -= 1000;
        seconds++;

        if(seconds >= 60) {
        seconds -= 60;
        minutes++;

            if(minutes >= 60) {
            minutes -= 60;
            hours++;
            }
        }
    }
    
    // let milliSecondsText = milliSeconds < 100 ? "000" + milliSeconds.toString() : milliSeconds;
    let secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
    let minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    let hoursText = hours < 10 ? "0" + hours.toString() : hours;

    stopWatch.textContent = hoursText + ":" + minutesText + ":" + secondsText + ":" + milliSeconds;

}


let intervalId;

// start button
startBtn.addEventListener("click", () => {
    if(intervalId) return;
    intervalId = true; 
   intervalId = setInterval(startTime, 10);
});

// pause button
pauseBtn.addEventListener("click", () => {
    clearInterval(intervalId);
});

// continue button
continueBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = setInterval(startTime, 10);

});


// restart button
restartBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    milliSeconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    intervalId = setInterval(startTime, 10);
});

