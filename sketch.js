let scene = 1;
let capture;
let timer1 = 0; //for popup1
let timer2 = 0; //for facial scan loading
let timer3 = 0; //for final popup
let timer4 = 0; //for end

//visual assets
let backgroundImg;
let popup1; //personality quiz
let poster1; //piechart
let hammer;
let screenCrack;
let popup2; //end photo
let yesButton;
let showCrack = false;
let col;

//personality quiz variables
let inp;
let name = "";
let sel1, sel2, sel3;
let bmonth = 0;
let bday = 0;
let byear = 0;
let radio;
let radioVal;
let colorSlider;
let colorVal = 30;
let submitButton;
let personality1 = "";
let personality2 = "";
let personality3 = "";
let rectShow = true;

//facial scan variables
let tracker;
let positions;
let x = 0;
let y = 0;
let numberCalled = false;
let scanEnable = false;
let drawFace = false;
let cb1, cb2, cb3, cb4;
let dialButton;

//new
let x1 = 630;
let y1 = 350;
let dialCount = 0;
let teleDistance = 0;

//break mirage variables
var mx;
var my;
var hammerX = 20;
var hammerY = 280;
let ybutton;
let showYButton = false;

function preload() {
  backgroundImg = createImg("background.png", "background"); 
  popup1 = createImg("popup1.png", "popup"); 
  hammer = createImg("hammer.png", "hammer");
  poster1 = createImg("results.png", "poster");
  popup2 = createImg("popupfinal.png", "final popup");
  yesButton = createImg("yesbutton.png", "yes button");
  screenCrack = createImg("crack.png", "screen cracks");}

function setup() {
  let canvas = createCanvas(800, 600);
  capture = createCapture(VIDEO);
  capture.elt.setAttribute('playsinline', '');
  capture.size(width-140, height);

  let canvasX = canvas.position().x;
  let canvasY = canvas.position().y;

  //hiding
  capture.hide();
  backgroundImg.hide();
  popup1.hide();
  hammer.hide();
  poster1.hide();
  popup2.hide();
  screenCrack.hide();
  yesButton.hide(); //IMAGE OF YES BUTTON
  pixelDensity(1);
  
  //ACTUAL BUTTON
  ybutton = createButton('');
  let ybuttonX = canvasX + 450; // Adjust the x-coordinate as needed
  let ybuttonY = canvasY + 410; // Adjust the y-coordinate as needed
  ybutton.position(ybuttonX, ybuttonY);
  ybutton.size(120, 40);
  let col = color(200,255,255, 0);
  ybutton.style('background-color', col);
  ybutton.style('border-width', 0);
  ybutton.mousePressed(yesB);
  ybutton.hide();
  
  //POPUP #1
  createQuizElements();
  
  //DIAL NUMBERS
  // var dialButton = document.createElement("button");
  // dialButton.innerHTML = "Do Something";

  // var body = document.getElementsByTagName("body")[0];
  // body.appendChild(dialButton);
  // dialButton.style.position = "absolute";
  // dialButton.style.width = "100px"
  // dialButton.style.height = "100px"
  // dialButton.style.bottom = "300px"; // Change the top position
  // dialButton.style.right = "140px"; 

  // dialButton.addEventListener ("click", function() {
  //   dialCount++;
  //   checkDialNums();
  //   console.log("DIALED");
  // });

  dialButton = createButton("");
  let buttonX = canvasX + 630; // Adjust the x-coordinate as needed
  let buttonY = canvasY + 370; // Adjust the y-coordinate as needed
  dialButton.position(buttonX, buttonY);
  dialButton.style('background-color', col);
  dialButton.style('border-width', 0);
  dialButton.size(100,100);
  dialButton.mousePressed(checkDialNums);

  //FACIAL TRACKER
  tracker = new clm.tracker(); // create a new clmtrackr object
  tracker.init(); // initialize the object
  tracker.start(capture.elt); // start tracking the video element capture.elt
  
}

function draw() {
  background(220);
  blendMode(BLEND);
  push();
  translate(capture.width + 220, 0);
  scale(-1, 1);
  image(capture, 350, 90, 220, 170);
  positions = tracker.getCurrentPosition();
  pop();
  blendMode(DODGE);
  fill(colorVal, 100, 100);
  if(rectShow){rect(350, 90, 220, 170);}
  blendMode(BLEND);
  if(showCrack){image(screenCrack, 0, 0, 800 ,  580);}
  image(backgroundImg, 0, 0, 800, 600);
  image(hammer, hammerX, hammerY, 48 ,  102);

  //console.log(mouseX + ", " + mouseY);
  
   switch (scene) {
    case 1:
      personalityQuiz();
      break;
    case 2:
      facialScan();
      break;
    case 3:
      breakMirage();
      break;
    case 4:
      break;
   }
  
  if(hammerX > 365 && hammerX < 525 && hammerY > 90 && hammerY < 260){
    console.log("HIT"); 
    breakMirage();
  }
  
  //user-set values (personality quiz info, etc.)
  text(personality1, 370, 110);
  text(personality2, 370, 130);
  text(personality3, 370, 150);
  
}

function personalityQuiz() {
  //FILTER
  var x1 = random(370, 480);
  var y1 = random(100, 190);
  var x2 = round(x1 + random(-10, 10));
  var y2 = round(y1 + random(-10, 10));
  var w = 50;
  var h = 50;
  set(x2, y2, get(x1, y1, w, h));
  
  //POPUP
  if (frameCount % 60 == 0) {timer1++;}
  if(timer1 >= 5){                           //CHANGE TIMER HERE
    console.log("POPUP");
    
    popup1.show();
    popup1.position(50, 50);
    inp.show();
    sel1.show();
    sel2.show();
    sel3.show();
    radio.show();
    colorSlider.show();
    submitButton.show();
    
    //name = name in function below
    bmonth = sel1.value();
    bday = sel2.value();
    byear = sel3.value();
    radioVal = radio.value();
    colorVal = colorSlider.value();
    
  }
  }

function enterName(){name = this.value();}

function createQuizElements() {
  
  //NAME
  inp = createInput('');
  inp.position(135, 176);
  inp.size(130);
  inp.input(enterName);
  inp.hide();
  
  //AGE
  sel1 = createSelect();
  sel2 = createSelect();
  sel3 = createSelect();
  sel1.position(135, 265);
  sel2.position(185, 265);
  sel3.position(235, 265);
  for(let i = 1; i<=12; i++){sel1.option(i);} //MONTH
  for(let j = 1; j<=31; j++){sel2.option(j);} //DAY
  for(let k = 1930; k<=2023; k++){sel3.option(k);} //YEAR
  sel3.selected(2000);
  sel1.hide();
  sel2.hide();
  sel3.hide();
  
  //PERSONALITY
  radio = createRadio();
  //textAlign(CENTER);
  radio.option('ALTRUISTIC');
  radio.option(' STYLISH ');
  radio.option('OBSCURE');
  radio.style('width', '113px');
  radio.position(135, 360);
  radio.hide();
  
  //COLOR SLIDER
  colorMode(HSB);
  colorSlider = createSlider(0, 360, 60, 40);
  colorSlider.position(135, 450);
  colorSlider.style('width', '100px');
  colorSlider.hide();
  
  //submit button
  submitButton = createButton('');
  submitButton.position(360, 455);
  submitButton.size(80, 30);
  col = color(200,255,255, 0);
  submitButton.style('background-color', col);
  submitButton.style('border-width', 0);
  submitButton.mousePressed(hidePopup1);
  submitButton.hide();}

function hidePopup1(){
  popup1.hide();
  inp.hide();
  sel1.hide();
  sel2.hide();
  sel3.hide();
  radio.hide();
  colorSlider.hide();
  submitButton.hide();
  
  //PERSONALITY INFO SHOWS UP
  personality1 = "HELLO " + inp.value();
  personality2 = "DOB: " + bmonth + "/" + bday + "/" + byear;
  personality3 = "STRENGTH: " + radio.value();

  scene++;}

function facialScan() {
  
  blendMode(BLEND);
  scanEnable = true;

  if(dialCount >= 4){
    numberCalled = true;
  }
  
  if(numberCalled){
      noFill();
      strokeWeight(5);
      push();
      scale(0.4, 0.4);
      translate(800, 100);
      beginShape(LINES);
      for (let i = 0; i < positions.length; i++) {
        stroke(random(0, 225));
        vertex(positions[i][0], positions[i][1]);
      }
      endShape();
      pop();
      strokeWeight(1);
      image(backgroundImg, 0, 0, 800, 600);


      if (frameCount % 60 == 0) {timer2++;}
      if(timer2 >= 7){
        drawFace = false; //removes face lines
        rectShow = false;
        scanEnable = false;
        numberCalled = false;
        console.log("WHAT WHAT WHAT");
        image(poster1, 0, 35);
        scene = 4;
      }

    }
}
  

function createDialNums(){
  // cb1 = createCheckbox('', false); //4
  // cb1.changed(checkDialNums);
  // cb1.position(660, 381);
  
  // cb2 = createCheckbox('', false); //5
  // cb2.changed(checkDialNums);
  // cb2.position(672, 405);
  
  // cb3 = createCheckbox('', false); //7
  // cb3.changed(checkDialNums);
  // cb3.position(678, 388);
  
  // cb4 = createCheckbox('', false); //8
  // cb4.changed(checkDialNums);
  // cb4.position(684, 371);


}

function checkDialNums(){
  // if(scanEnable && cb1.checked() && cb2.checked() && cb3.checked() && cb4.checked()){
  //   numberCalled = true;   
  //   drawFace = true;
  // }
  dialCount++;
  if(dialCount >= 4){
    numberCalled = true;
    drawFace = true;
  }
  
}

function breakMirage() {
  //add screen image crack
  capture.pause();
  personality1 = "";
  personality2 = "";
  personality3 = "";
  hammer.hide();
  
  if (frameCount % 60 == 0) {timer3++;}
  if(timer3 <= 2){
    showCrack = true;
  }
  else{
    image(popup2, 0, 50);
    push();
    translate(capture.width, 0);
    scale(-1, 1);
    let final = copy(capture, 0, 0, 800, 600, 80, 175, 400, 200);
    pop();
    ybutton.show();
    
    //square distorition
    var x1 = random(250, 530);
    var y1 = random(170, 300);
    var x2 = round(x1 + random(-10, 10));
    var y2 = round(y1 + random(-10, 10));
    var w = random(50, 80);
    var h = random(50, 80);
    var w2 = random(10, 15);
    var h2 = random(10, 15);
    set(x2, y2, get(x1, y1, w, h));
    set(x2-50, y2-50, get(x1, y1-80, 100, 100));
    set(x2+random(20,30), y2+random(20,30), get(x1, y1, w, h));
    set(x2-random(10,30), y2-random(10,30), get(x1, y1, w2, h2));
    set(x2-random(10,30), y2-random(10,30), get(x1, y1, w2, h2));
    
    //lengthwise distortion
    var xx1 = floor(random(width));
    var yy1 = 50;
    var xx2 = round(x1 + random(-7, 7));
    var yy2 = round(y1 + random(-5, 5));
    var ww = floor(random(10, 15));
    var hh = height - 470;
    set(xx2, yy2, get(xx1, yy1, ww, hh));
    
    //blendMode(SOFT_LIGHT);
    var tileCountX = 12;
    var tileCountY = 12;
    var stepX = width / tileCountX;
    var stepY = height / tileCountY;
    for (var gridY = 175; gridY < 360; gridY += stepY) {
      for (var gridX = 250; gridX < 580; gridX += stepX) {
        image(capture, gridX + random(5, 10), gridY + random(-10, 10), stepX, stepY + random(-40, 10));
      }
    }
    
    //HALFTONE FILTER
    let gridSize = 3;
    capture.loadPixels();
    for(let y = 0; y < 200; y+=gridSize){
        for(let x = 0; x < 335; x+=gridSize){

          let index = (x+y*width)*4;
          let r = capture.pixels[index];
          let dia = map(r, 0, 255, gridSize, 2);
          
          capture.remove();
       
          push();
          translate(250, 175);
          fill(0);
          noStroke();
          circle(x, y, dia+random(0.1, 0.5));
          fill(103, 20, 2)
          circle(x+0.05, y+0.05, dia+random(0.1, 0.5));
          pop();
        }
      }
    
    blendMode(OVERLAY);
    fill(209, 233, 122);
    rect(250, 175, 335, 200);
  }
  
  blendMode(BLEND);
  if(showYButton){
    image(yesButton, 455, 400, 125, 60);
    if (frameCount % 60 == 0) {timer4++;}
      if(timer4 >= 1){
        fill(0,0,0);
        rect(0,0,800,600);
        blendMode(BLEND);
      }
  }

  //timer for 3 seconds of glitchy effect
  //screen grab of face with copy and paste
  //popup image
  //copy screen grab onto the popup
  //buttons
}

function yesB() {
  showYButton = true;
}

function mouseClicked(){ 
  if(mouseX > 350 && mouseX < 625 && mouseY > 400 && mouseY < 490){
    if(colorVal < 255){
      colorVal = colorVal+50;
    }else{
      colorVal = 0;
    }
  }
}

function mouseDragged(){
  if ((mouseX > hammerX - 50) && (mouseX < hammerX + 50)){
    if ((mouseY > hammerY - 50) && (mouseY < hammerY + 50)){
      hammerX = mouseX;
      hammerY = mouseY;
    }
  }
}
