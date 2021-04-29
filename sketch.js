var ninja,ninjaimage;
var stone,stoneimage,stoneGroup;
var galaxy,galaxyimage;
var ground,ground2,ground3,ground4;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var sound;

function preload(){
   ninjaimage = loadImage("222.jpg");
  stoneimage = loadImage("223.gif");
   galaxyimage=loadImage("123.jpg");
  sound=loadSound("mixkit-sad-game-over-trombone-471.wav");
 
}

function setup() {
  createCanvas(800,500);

   ninja=createSprite(50,150,10,10);
   ninja.addImage("superman_moving",ninjaimage);
   ninja.scale=0.2;
   
   ground=createSprite(350,500,250,1000);
   ground.visible=false;
  
   ground2=createSprite(30,20,2000,10);
   ground2.visible=false;
  
   ground3=createSprite(20,20,0.01,1000);
   ground3.visible=false;
  
  ground4=createSprite(20,490,10000,10);
   ground4.visible=false;
  
  stoneGroup=new Group();
}

function draw() {
  background(galaxyimage);
 
  if(gameState===PLAY){
   
    stroke("yellow");
  fill("yellow");
  textSize(20);
  text("Help the ninja to complet this mission",100,20);
  text("score:"+score,500,50);
    
     if(keyDown("LEFT_ARROW")){
    ninja.x=ninja.x-8;
  }
 
  if(keyDown("RIGHT_ARROW")){
    ninja.x=ninja.x+8;
  }
  
  if(keyDown("UP_ARROW")){
    ninja.y=ninja.y-8;
  }
  
  if(keyDown("DOWN_ARROW")){
    ninja.y=ninja.y+8;
  }
  
  if(ninja.isTouching(ground)){
    ninja.bounceOff(ground);
  }
   if(ninja.isTouching(ground2)){
    ninja.bounceOff(ground2);
  }
    if(ninja.isTouching(ground3)){
    ninja.bounceOff(ground3);
  }
     if(ninja.isTouching(ground4)){
    ninja.bounceOff(ground4);
  }
    if(ninja.isTouching(stoneGroup)){
      stoneGroup.destroyEach();
      sound.play();
      gameState=END;
    }
  score=score+Math.round(getFrameRate()/60)
  if(frameCount % 80 == 0){
     spawnstone();
   }
  }
  if(gameState===END){
    background(0)
    stroke("red");
    fill("red")
    textSize(40);
    text("Game over",200,250);
    text("Press 'r' to restart",150,300);
     textSize(20);
    text("Highscore:"+score,400,40)
    
    ninja.visible=false;
  
    if(keyDown("r")){
      gameState=PLAY;
      score=0
      ninja.visible=true;
      ninja.x=50;
     ninja.y=150
    }
  }
 
 drawSprites();
}
function spawnstone(){
 
    stone=createSprite(500,Math.round(random(50,500)));
    stone.addImage("rock",stoneimage);
    stone.scale=0.1;
  stone.lifetime=130
    stone.velocityX=-(5+score/100);
    stoneGroup.add(stone);
}