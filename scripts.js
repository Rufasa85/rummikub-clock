let currentTimes = []
let currentTurn = 0;
const timerSection = document.querySelector("#timer")
const startForm = document.querySelector("form")
let countdownTimer;

const startNextTurn = ()=>{
    let currTime = currentTimes[currentTurn%currentTimes.length];
    function playersTurnCountdown (){
        currTime--;
        currentTimes[currentTurn%currentTimes.length] = currTime
        if(currTime<=0){
            alert("you lose")
            clearInterval(countdownTimer)
        } else { 
            let mutatingTime = currTime
            let minutes = Math.floor(mutatingTime /6000)
            let timeString = '';
            timeString+=minutes;
            timeString +=':'
            mutatingTime -= 6000 * minutes;
            let seconds = Math.floor(mutatingTime/100);
            if (seconds <10){
                timeString += "0"
            }
            timeString+=seconds;
            timeString+="."
            mutatingTime-= seconds * 100
            // mutatingTime = Math.floor(mutatingTime /10)
            if(mutatingTime<10){
                timeString+="0"
            }
            timeString+=mutatingTime
            document.querySelector("#countdown").textContent = timeString
        }
    }
    if(!currTime){
        currentTurn++;
        currTime = currentTimes[currentTurn%currentTimes.length];
    }
    let currentPlayer = (currentTurn%currentTimes.length ) +1
    timerSection.setAttribute("class",`player-${currentPlayer}`)
    document.querySelector("#player-num").textContent = currentPlayer
    clearInterval(countdownTimer);
    countdownTimer = setInterval(playersTurnCountdown,10)
}

startForm.addEventListener("submit",e=>{
    e.preventDefault();
    const numPlayers = +document.querySelector('#player-count').value;
    const playerTime = +document.querySelector('#time-value').value;
    currentTimes = []
   for (let index = 0; index < numPlayers; index++) {
        currentTimes.push(playerTime * 100)
   }
   currentTurn = 0;
   timerSection.classList.remove("hidden");
   startForm.classList.add("hidden");
   console.log(currentTimes)
   startNextTurn()
})

document.querySelector("#end-turn").addEventListener("click",()=>{
    currentTurn++;
    startNextTurn()
})

document.querySelector("#end-game").addEventListener("click",e=>{
    clearInterval(countdownTimer);
    currentTimes = []
    currentTurn = 0;
    timerSection.classList.add("hidden")
    startForm.classList.remove("hidden")
})


