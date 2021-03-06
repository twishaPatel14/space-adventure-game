//important matterJS variables
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world, body;

var board, die;
var girlPiece, girlSpaces, girlMoved;
var redPiece, redSpaces, redMoved;

function preload(){
  board = loadImage("sprites/bg.jpg");
}

function drawDie(x, y, side){
  fill("white");
  strokeWeight(8);
  rectMode(CENTER);
  rect(x, y, 100, 100, 20);

  fill("black")
  strokeWeight(3);
  //die number creation
  if(side === 1){
    circle(x, y, 20);
  }else if(side === 2){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
  }else if(side === 3){
    circle(x - 25, y - 25, 20);
    circle(x, y, 20);
    circle(x + 25, y + 25, 20);
  }else if(side === 4){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
  }else if(side === 5){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x, y, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
  }else if(side === 6){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
    circle(x - 25, y, 20);
    circle(x + 25, y, 20);
  }
}

function checkForGirlUpsAndDowns(){
  //rocket
  if(girlSpaces === 5){
    Matter.Body.setVelocity(girlPiece.body, {x:24, y: -35});
   girlSpaces = 68;
  } 

  if(girlSpaces ===13){
    Matter.Body.setVelocity(girlPiece.body, {x: -12, y: -45});
    girlSpaces = 84;
  }

  if(girlSpaces === 21){
    Matter.Body.setVelocity(girlPiece.body, {x: 7, y: -20});
    girlSpaces = 59;
  }

  if(girlSpaces === 30){
    Matter.Body.setVelocity(girlPiece.body, {x: 15, y: -30});
    girlSpaces = 95;
  }

  if(girlSpaces === 43){
    Matter.Body.setVelocity(girlPiece.body, {x:40, y: -15});
    girlSpaces = 90;
  }

 if(girlSpaces ===6){
  Matter.Body.setVelocity(girlPiece.body, {x: 15, y: 0});
  girlSpaces = 8;
 }
 if(girlSpaces ===92){
  Matter.Body.setVelocity(girlPiece.body, {x: 7, y: -13});
  girlSpaces = 95;
 }
  //spaceShip
  if(girlSpaces === 56){
    Matter.Body.setVelocity(girlPiece.body, {x: 7, y: 20});
    girlSpaces = 19;
  }

  if(girlSpaces === 76){
    Matter.Body.setVelocity(girlPiece.body, {x: -32, y: 26});
    girlSpaces =9;
  }

  if(girlSpaces === 62){
    Matter.Body.setVelocity(girlPiece.body, {x: 20, y: 33});
    girlSpaces = 25;
  }

  if(girlSpaces === 88){
    Matter.Body.setVelocity(girlPiece.body, {x: -13, y: 38});
    girlSpaces = 52;
  }

  if(girlSpaces === 91){
    Matter.Body.setVelocity(girlPiece.body, {x: 12, y: 26});
    girlSpaces = 65;
  }

  if(girlSpaces === 97){
    Matter.Body.setVelocity(girlPiece.body, {x: -7, y: 13});
    girlSpaces = 79;
  }

}

function setup() {
  //create canvas
  createCanvas(600,725);

  //setup
  engine = Engine.create();
  world = engine.world;

  //set gravity
  engine.world.gravity.y = 0;

  //create the die array
  die = [false, 1, 0, false, 0];
  //item 0 = if die is rolling
  //item 1 = current number displayed
  //item 2 = times to die will change
  //item 3 = blinking time or not
  //item 4 = blinking counter

  //create the pieces
 girlPiece = new GirlPiece(40, 550, 40, 40);
  girlSpaces = 1;
  girlMoved = false;

// redPiece = new RedPiece(40, 570, 40, 40);
  redSpaces = 1;
  redMoved = true;
}

function draw() {
  //draw the background
  background(200, 113, 79);  

  //update the engine
  Engine.update(engine);

  //draw the board
  image(board, 0, 0, 600, 600);

  //display the pieces
  girlPiece.display();
 // redPiece.display();

  //add a divider
  stroke("black");
  strokeWeight(8);
  
  line(0, 602.5, 600, 602.5);

  //draw die or make it blink or move it
  if(die[3] === false){
    drawDie(525, 665, die[1]);
  }else{
    if(die[4] % 2 === 0){
      drawDie(525, 665, die[1]);

      if(girlMoved === false && girlSpaces !== 100){
        if(girlSpaces % 10 === 0){
          girlPiece.moveUp();
        }else{
          var num = Math.floor(girlSpaces / 10);
          if(num === 0 || num === 2 || num === 4 || num === 6 || num === 8){
           girlPiece.moveRight();
          }else{
           girlPiece.moveLeft();
          }
        }
        girlMoved = true;
        girlSpaces++;
        console.log(girlSpaces);
      }
    }

    if(frameCount % 15 === 0){
      die[4]--;
      girlMoved = false;

      if(die[4] === 0){
        die[3] = false;
        die[0] = false;
        checkForGirlUpsAndDowns();
      }
    }
  }

  //make the die roll
  if(die[0] === true && die[2] > 0 && frameCount % 5 === 0){
    die[2]--;

    die[1]++;
    if(die[1] > 6){
      die[1] = 1;
    }

    if(die[2] === 0){
      die[3] = true;
      die[4] = die[1] * 2;
    }
  }
}

function keyPressed(){
  if (keyCode === 32 && die[0] === false) {
    die[0] = true;
    die[2] = round(random(12, 18));
  }
}