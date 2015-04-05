var eSize = 10;
var x = 10;
var y = 10;
var speed = 1;
var distance;

var osc;
var env;
var ampReader;

var bgColor;
var notes = [60, 62, 61, 55, 53, 50, 48, 50];
var index = 0;


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(153);
	var p5Container = document.getElementById(p5Container);
	var myCan = createCanvas(windowWidth, windowHeight);
	myCan.parent('p5Container');
	x = windowWidth/2;
	y = windowHeight/2;

	initSound();
}

function draw() {
	//if (touchIsDown){
		background(255);
		var c = color(255, 0, 0, 200);
		var c2 = color(0, 0, 255, 200)
		fill(c2);
		noStroke();
		x += speed;
 		y += speed;
		ellipse(x, y, 10, 10);
		fill(c);
		ellipse(windowWidth/2, windowHeight/2, eSize, eSize);

	 	if ((x > windowWidth) || (x < 0) || (y > windowHeight) || (y < 0)) {
	 		speed = -speed;
	 	}
	 	distance = dist(windowWidth/2, windowHeight/2, x, y);
	 	if (distance <= 10) {
	 		speed = -speed;
	 	}


	//}
}

function initSound() {
  osc = new p5.Oscillator();
  osc.setType('sine');
  env = new p5.Env(0.01, .75, 0.5, 0.2, 0.5, 0);
  osc.start();
  osc.amp(env);
}

function playSound() {
  // alert('play sound!');
  var note = notes[index % notes.length];
  note = midiToFreq(note);
  osc.freq(note)
  env.play();
  index++;
}
