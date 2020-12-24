//Create variables here
var reindeer, happyreindeer;
var database,position;
var foodS;
var foodStock;
function preload()
{
  reindeerImg1 = loadImage("reindeer.jpg");
  reindeerImg2 = loadImage("reindeer1.jpg");
  bgImage      = loadImage("background.jpg")
}

function setup() {
  createCanvas(800, 550);
  database = firebase.database();
  reindeer = createSprite(475,350,50,50);
  reindeer.addImage(reindeerImg1);
  reindeer.scale = 0.4;
  
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {
  background(bgImage);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    reindeer.addImage(reindeerImg2)
  }

  drawSprites();
  fill("red");
  noStroke();
  textSize(30);
  text("Food Remaining: " + foodS,50,330);


  textSize(40);
  text("Press up arrow to feed the Reindeer",100,430);

}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}