window.onload = () => {
    document.querySelector("#calculate").onclick = calculate;
    document.querySelector("#reset").onclick = resetTime;
    document.querySelector("#startCountdown").onclick=startCountdown;
}
function changeColor(element) {
    element.style.backgroundColor = 'lightpink'; /* New color on hover */
}

function resetColor(element) {
    element.style.backgroundColor = 'rgb(231, 166, 109)'; /*Reset to initial color */
}

  

function calculate() {
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;

    const stop = document.querySelector("#stop");
    const alarmSound = document.getElementById('alarmSound');
    const stopButton = document.getElementById('stopButton');

    const endTime = new Date(date + " " + time);

    const myInterval = setInterval(() => calculateTime(endTime), 1000);
    alarmSound.play();

    stop.addEventListener('click', () => {
        clearInterval(myInterval);
        alert("Paused!");
        alarmSound.pause();
        
       
    })
}

function calculateTime(endTime) {
    const currentTime = new Date();

    const days = document.querySelector('#countdown-days');
    const hours = document.querySelector('#countdown-hours');
    const minutes = document.querySelector('#countdown-minutes');
    const seconds = document.querySelector('#countdown-seconds');

    if (endTime > currentTime) {
        const timeLeft = (endTime - currentTime) / 1000;

        days.innerText = Math.floor(timeLeft / (3600 * 24));
        hours.innerText = Math.floor((timeLeft / 3600) % 24);
        minutes.innerText = Math.floor((timeLeft / 60) % 60);
        seconds.innerText = Math.floor(timeLeft % 60);
    
    } else {
        days.innerText = 0;
        hours.innerText = 0;
        minutes.innerText = 0;
        seconds.innerText = 0;
        
    }
}

function resetTime() {
    document.querySelector('#countdown-days').innerText = 0;
    document.querySelector('#countdown-hours').innerText = 0;
    document.querySelector('#countdown-minutes').innerText = 0;
    document.querySelector('#countdown-seconds').innerText = 0;
}
let timerCount = 0;

        function startCountdown(elementId, time) {
            const countdownElement = document.getElementById(elementId);
            let countdownTime = time;

            const interval = setInterval(() => {
                days.innerText = Math.floor(timeLeft / (3600 * 24));
                hours.innerText = Math.floor((timeLeft / 3600) % 24);
                minutes.innerText = Math.floor((timeLeft / 60) % 60);
                seconds.innerText = Math.floor(timeLeft % 60);
   

                countdownElement.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                countdownTime--;

                if (countdownTime < 0) {
                    clearInterval(interval);
                    countdownElement.innerHTML = "Time's up!";
                }
            }, 1000);
        }

        document.getElementById('addTimerButton').addEventListener('click', () => {
            timerCount++;
            const timerDiv = document.createElement('div');
            timerDiv.className = 'timer';
            timerDiv.id = `countdown${timerCount}`;
            document.getElementById('timersContainer').appendChild(timerDiv);

            // Start the countdown for the new timer (e.g., 60 seconds)
            startCountdown(`countdown${timerCount}`, 120);
        });
