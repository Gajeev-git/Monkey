var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;
var backGround, backImage;
var survivalTime = 0;

function preload() {
  
  backImage = loadImage("jungle.jpg");  


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}


function setup() {
 
    //creating background
  backGround = createSprite(0, 0, 600, 600);
  backGround.addImage(backImage);
  backGround.scale = 1;

  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;
  console.log(ground.x);

  foodGroup = createGroup();
  obstacleGroup = createGroup();

}


function draw() {
  
  createCanvas(400, 400);
  
if(gameState===PLAY){
  
    switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    default:break;
      
  }
  
    // moving background
  backGround.velocityX = -3;

  if (backGround.x < 0) {

    backGround.x = backGround.width / 2;
  }

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space") && monkey.y >= 159) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 2;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.1;
    gameState = END;
  }
  }
  
  if(gameState===END){
    
      // moving background
  backGround.velocityX = 0;

  if (backGround.x < 0) {

    backGround.x = backGround.width / 2;
  }
    
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
    
    monkey.collide(ground);
    
    if(keyDown("space")){
      gameState = PLAY;
    }
    
  }
  
   
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: ", +score, 550, 50);   
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("survivalTime: ", +survivalTime, 100, 50);
  
  food();
  obstacles();

  drawSprites();

}


function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 120, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;

    banana.lifetime = 200;

    foodGroup.add(banana);

  }

}


function obstacles() {

  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 315, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstacleGroup.add(obstacle);

  }

}