document.addEventListener('DOMContentLoaded', function(){
    console.log("content loaded");
    // dom refs
    let body = document.querySelector('html');
    let wirebox = document.getElementById('wirebox');
    let resetBtn = document.getElementById('reset');
    let timer = document.getElementById('timer');

    //game logic variables
    const STARTING_TIME = 10;
    let remainingTime = 0;
    let gameOver = true;
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
        gameOver = false;
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
        let color = e.target.id;
        if (!gameOver && !wireState[color]){
            e.target.src="./img/cut-" + color + "-wire.png";
            wireState[color] = true;
            let wireIndex = wiresToCut.indexOf(color);
            //if wire has an index, it needs to be cut
            if (wireIndex > -1){
                console.log("Correct!");
                wiresToCut.splice(wireIndex, 1);
                if (wiresToCut.length < 1){
                    endGame(true);
                    console.log("You won!");
                }
            } else {
                endGame(false);
            }
        }
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