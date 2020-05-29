document.addEventListener('DOMContentLoaded', function(){
    console.log("content loaded");
    // dom refs
    let body = document.querySelector('body');
    let wirebox = document.getElementById('wirebox');
    let resetBtn = document.getElementById('reset');
    let timer = document.getElementById('timer');

    //game logic variables
    const STARTING_TIME = 30;
    let remainingTime = 0;
    let gameOver = false;
    let countdown = null; //will hold countdown interval

    let wiresToCut = [];
    let wireState = {
        blue: false,
        green: false,
        red: false,
        white: false,
        yellow: false
    }

    //event listeners
    resetBtn.addEventListener("click", reset);
    wirebox.addEventListener("click", wireClick);

    function reset() {
        console.log("clicked reset");
        init();
    }

    function init(){
        remainingTime = STARTING_TIME;
        console.log("init run");
        for (const color in wireState){
            let randoNum = Math.random();
            if (randoNum > 0.5){
                wiresToCut.push(color);
            }
        }
        console.log(wiresToCut);
        countdown = setInterval(updateClock, 1000);
        resetBtn.disabled = true;
    }

    function wireClick(e) {
        console.log(e);
    }

    function updateClock(){
        console.log("clock updating");
        remainingTime--;
        timer.textContent = "00:00:" + remainingTime;
        if (remainingTime <= 0){
            endGame(false);
        }
    }

    function endGame(win){
        console.log("Win is " + win);
        clearInterval(countdown);
        gameOver = true;
        resetBtn.disabled = false;
        if (win){
            timer.classList.add("green");
        } else {
            body.classList.add("flat");
            timer.classList.add("red");
        }
    }

})

/*
const count_seconds = function(){
  let current_time = document.getElementById("time_display").innerHTML;
  console.log(current_time);
  current_time--;
  if (current_time === 0){
    clearInterval(countdown);
    document.getElementById("time_display").setAttribute("class", "red");
    document.querySelector("html").setAttribute("class", "flat");
  }
  document.getElementById("time_display").innerHTML = current_time;
}
document.querySelector("img").addEventListener("click");)

let countdown = setInterval(count_seconds, 1000);
console.log('loaded!');
*/