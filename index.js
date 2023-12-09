let velocity = {x:0,y:0};
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x:1, y:1}
]
let food = {x:2,y:10}

const gameOverEl = document.querySelector('.game-over');
const scoreEl = document.querySelector('.cuurent');
const highScoreEl = document.  querySelector('.high');
const playAgainBtn = document.querySelector('.play-again');


// game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //collide with own body
    for(let i = 1 ; i < snakeArr.length ; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {return true;
        }
    }

    //collide with walls
    if(snake[0].x <= 0 || snake[0].x >=18 ||snake[0].y <=0 || snake[0].y >= 18)
    {return true
    }
    return false;
    
}

function gameEngine(){
    // updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverEl.classList.remove('hide');
        scoreEl.innerHTML = `🍎 : ${score}`;
        highScoreEl.innerHTML = `🏆 : ${hiscore}`;

        score = 0;
        scoreBox.innerHTML = "🍎 : "+ 0
        velocity = {x:0 , y:0};
       
        snakeArr = [{x:1,y:1}]
     
    }

    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        score += 1 ;
        scoreBox.innerHTML = "🍎 : " + score;
        if(score > hiscorevalue){
            hiscorevalue = score;
            localStorage.setItem("🏆",JSON.stringify(hiscorevalue));
            hiscoreBox.innerHTML = "🏆: " + hiscorevalue ;
        }
      
        snakeArr.unshift({x : snakeArr[0].x + velocity.x , y: snakeArr[0].y + velocity.y})
        let a = 2;
        let b = 16;
        food = { x: Math.round(a+(b-a)*Math.random()),
            y: Math.round(a+(b-a)*Math.random())}
    }

    // moving the snake
    for(let i = snakeArr.length - 2 ; i >= 0 ; i--){
     
        snakeArr[i+1] ={...snakeArr[i]}

    }

    snakeArr[0].x += velocity.x;
    snakeArr[0].y += velocity.y;


    
    // displaying the snake 
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        
        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

// Restart game
playAgainBtn.addEventListener('click',restartGame);

function restartGame(){
    gameOverEl.classList.add('hide');
     main();
}




//main game logic
let hiscore = localStorage.getItem("🏆") ;

if(hiscore === null){
    hiscorevalue = 0
    localStorage.setItem("🏆", JSON.stringify(hiscorevalue))
}
else{
    hiscorevalue = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "🏆: " + hiscore
}


window.requestAnimationFrame(main);

window.addEventListener('keydown', e=>{
     velocity = {x:0,y:1} // start the game
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            velocity.x = 0;
            velocity.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            velocity.x = 0;
            velocity.y = 1;
            break;
        case "ArrowLeft" :
            console.log("ArorwLeft")
            velocity.x = -1;
            velocity.y = 0;
            break;
        case "ArrowRight":
            velocity.x = 1;
            velocity.y = 0;
            break;

    }
})