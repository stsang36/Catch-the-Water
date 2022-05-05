// COPYRIGHT 2017 ©
var rain = [];
var bucket;
var backgrounder;
var cloud = [];
var cloudImage;
var bucketImage;
var count;
var mcount;
var ding;


function setup() {
  createCanvas(600, 600);
  rain[0] = new Rain(random(40, 65));
  rain[1] = new Rain(random(40, 65));
  rain[2] = new Rain(random(40, 65));
  aBucket = new Bucket();
  cloudImage = loadImage("assets/mrblow.png");
  bucketImage = loadImage("assets/bucket.png");
  cloud[0] = new Cloud(random(0, 400), random(0, 5), random(-5, 5));
  cloud[1] = new Cloud(random(0, 400), random(0, 5), random(-5, 5));
  cloud[2] = new Cloud(random(0, 400), random(0, 5), random(-5, 5));
  backgrounder = loadImage("assets/back.jpg");
  count = 0;
  mcount = 0;
  ding = loadSound("assets/ding.wav");

}

function draw() {
  background(backgrounder);
  rain[0].show();
  rain[0].move();
  rain[1].show();
  rain[1].move();
  rain[2].show();
  rain[2].move();
  cloud[0].show();
  cloud[0].move();
  cloud[1].show();
  cloud[1].move();
  cloud[2].show();
  cloud[2].move();
  aBucket.move();
  aBucket.show();
  rain[0].isTouching(aBucket.x, aBucket.y);
  rain[1].isTouching(aBucket.x, aBucket.y);
  rain[2].isTouching(aBucket.x, aBucket.y);
  textSize(20)
  if (count < 1) {
  text("Use arrow keys to move", 0, 20);
  }
  fill("Yellow")
  text("Points: " + count, 10, 590);
  if (mcount > 1) {
    text("OBJECTIVE COMPLETE!", 355, 590);
    print("WIN");
  } else {
    text("Get 30 points!", 465, 590);
  }

}
class Cloud {
  constructor(cloudX, cloudY, cloudSpeed) {
    this.x = cloudX;
    this.y = cloudY;
    this.xSpeed = cloudSpeed;
  }

  show() {
    image(cloudImage, this.x, this.y, 200, 150);
  }


  move() {
    this.x = this.x + this.xSpeed;
    if (this.x > 600) {
      this.xSpeed = random(-5, 5);
    }
    if (this.x < -250) {
      this.xSpeed = random(-5, 5);
    }
  }


}
class Bucket {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
  }
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x = this.x - 15;
      print("GOING LEFT!")
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x = this.x + 15;
      print("GOING RIGHT!")
    }
    this.y = 550;
    if (this.x > 500) {
      this.x = 500;
    }
    if (this.x < 0) {
      this.x = 0;
    }
  }

  show() {
    image(bucketImage, this.x, this.y - 50, 100, 100);
  }

}

class Rain {
  constructor(inSize) {
    this.x = random(0, 600);
    this.y = 0
    this.size = inSize;
    this.xSpeed = random(2, 5);
  }

  show() {
    textSize(this.size)
    text("💧", this.x, this.y);
  }

  move() {
    this.y = this.y + this.xSpeed;
    if (this.y > 600) {
      this.y = 0;
      this.x = random(0, 550);
      count = count - 3;
      print(count + " - 3 PTS")
    }
    if (count < 0) {
      count = 0;
    }
  }

  isTouching(testX, testY) {
    if (dist(testX, testY, this.x, this.y) < this.size) {
      this.x = random(0, 550);
      this.y = 0;
      ding.play();
      count = count + 1;
      print(count + " + 1 PTS")
    }
    if (count == 30) {
      mcount = mcount + 1;
    }

  }
}
