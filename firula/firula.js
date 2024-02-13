//Firula | www.7luas.com.br | Daniel Ferreira | Dec 2016

// Global vars (initialized in setup)
var currentSession, globalCounter, touchDuration, idleTime; // time vars
var isTouching, isVertical, demoMode, randomMode; // state vars (boolean)
var wall; //1=top,2=right,3=bottom,4=left
var drawMode;  //1: arcs connect to only one wall at a time; 2: two at a time; 3: same as 2 plus drawing
var wallLeft, wallRight, wallTop, wallBottom; // booleans: true if close to each side
var propA, propB, defDist, strokeAlpha, minColor, minAlpha, strokeNoise; // stroke vars
var baseColor, arcColor, drawColor; // color array vars
var lastX, lastY, posX, posY; // pos vars
var currentCommand;
var colorOverlay, introAlpha; // control alpha of intro and color overlay
var ww,wh; // Simplified vars
var acelX, acelY, variationBasis; // animate demo draw

function keyTyped() { // If key is pressed (desktop)

if(currentSession>0){ // If not intro
	currentCommand="none";
	randomMode = false;
		
	if (key == 's') {currentCommand="save";} 
	if (key == 'c') {currentCommand="clear";}
	if ((key == '1')||(key == '2')||(key == '3')) {drawMode=int(key);} 
	if (key == 'r') {setup();}

	if (key == '0') {randomMode=true;} // (I think has no effect)

	executeCommand(currentCommand);
}else{ // If intro
	if(introAlpha==0&&colorOverlay==0){
		randomMode=true;
		demoMode=true;
		newSession();
	}
}	
	
return false;
}


function newSession() { // Clears screen and randomizes parameters

if(currentSession!=0){ // If not intro, choose new random color
	baseColor=[minColor+random(255-minColor),minColor+random(255-minColor),minColor+random(255-minColor)]; //Generate new color scheme
}

if(colorOverlay==0){colorOverlay = 10;} // Activates overlay (buggy)

currentSession += 1;
strokeNoise = 20 + random(20);

//Define base color for arcs (slightly darker than general base color)
strokeWeight(1); noFill();
var colorVariation=20;
arcColor[0] = floor(3*baseColor[0]/4) + random(colorVariation);
arcColor[1] = floor(3*baseColor[1]/4) + random(colorVariation);
arcColor[2] = floor(3*baseColor[2]/4) + random(colorVariation);

//Define base color for drawing (even darker than arc color)
var tempDarkestColor = baseColor[0];
if((baseColor[0]+baseColor[1]+baseColor[2])<(3*255/2)){drawColor=[255,255,255,255];}else{drawColor=[0,0,0,255];};
}

function setup() { // Create canvas, initialize variables

background(255,255,255); // Won't appear

angleMode(DEGREES);

// Initialize vars
ww = windowWidth; wh = windowHeight;

currentSession = -1; 
globalCounter = 0; idleTime=0; touchDuration = 0;
isTouching = false;

wall = 0;
wallLeft = false; wallRight = false; wallTop = false; wallBottom = false;
propA = 2; propB = 3;
defDist = 100; strokeAlpha = 50; minColor = 50; minAlpha = 10;
baseColor = []; arcColor = []; drawColor = [];

demoMode = true;  randomMode = false;
drawMode = 2;

if(ww>wh){isVertical = false;}else{isVertical = true;};

colorOverlay = 0;
introAlpha=10;

variationBasis = 3000 + random(3000);

resetPen();

//Create canvas
createCanvas(ww, wh);

newSession();

} 

function resetPen(){ // Changes position and direction acel for demo draw
posX = random(ww); 
posY = random(wh);
acelX = random(10)/100;	
acelY = random(10)/100;	
}
 
function intro(){ // Intro screen (runs in draw)
textAlign(CENTER);
textFont("Helvetica");

// Define some vars
if(isVertical){var titleFontSize = ww/4;}else{var titleFontSize = ww/10;}
var textFontSize = titleFontSize/5;
var cursorY = titleFontSize*1.4;
var cursorX = ww/2;

noStroke();
fill(drawColor[0],drawColor[0],drawColor[0],20);

// Intro text
textSize(titleFontSize); 
text("firula",cursorX,cursorY);
cursorY += textFontSize*1.5;
textSize(textFontSize*0.7);
text("A SIMPLE DRAWING TOY",cursorX,cursorY);
textStyle(BOLD);
cursorY += textFontSize*4;
text("TAP / CLICK / PRESS KEY",cursorX,cursorY);
cursorY = wh-textFontSize*4;
textStyle(NORMAL);
textSize(textFontSize*0.5);
text("ABOUT FIRULA:",cursorX,cursorY);
cursorY = wh-textFontSize*3;
textSize(textFontSize*0.8);
text("www.7luas.com.br",cursorX,cursorY);
cursorY = wh-textFontSize*2;
textSize(textFontSize*0.5);
fill(drawColor[0],drawColor[0],drawColor[0],5);
text("v1.0",cursorX,cursorY);

// Animate intro (var is not alpha; it's just a countdown)
introAlpha-=1;

// Reset stroke for arcs (probably unecessary)
stroke(arcColor[0],arcColor[1],arcColor[2],strokeAlpha);
	
}

function windowResized() { // If window is resized, reset (avoids bug in mobile)
 setup();
}

function draw() { // Main loop

if(mouseY>4*wh/5&&currentSession==0){cursor(HAND);}else{cursor(CROSS);} // Mouse cursor changes to hand if on bottom in intro
		
if(globalCounter>36000){globalCounter = 0;}else{globalCounter+=1;}

if((currentSession>0)){if (isTouching){touchDuration+=1;}else{idleTime+=1;};} // Keep track of touch/idle times

if(idleTime>200){ // If idle for a couple seconds, reset and restart demo draw
	resetPen();
	demoMode=true; 
	randomMode=true;
	idleTime=0;
};

if(colorOverlay>0){ // Fade in color overlay
	var tempAlpha;
	if(currentSession>1){
		tempAlpha=30;
		colorOverlay-=1;
	}else{
		tempAlpha=150;
		colorOverlay-=1;
	}
	fill(baseColor[0],baseColor[1],baseColor[2],tempAlpha); 
	noStroke();
	rect(0,0,ww,wh);
}

if(introAlpha>0&&colorOverlay==0){intro();} // Run intro - only after overlay is visible (buggy)

if(demoMode&&randomMode&&introAlpha==0&&colorOverlay==0){ // Demo draw: randomizes color and pen resets
	drawMode=2; // Demo draw: always on mode 2 (simpler...)
 	var iRan = floor(random(variationBasis));
	if(iRan<8){newSession();};
	if(iRan<20){resetPen();};
}

// Defines position of "pen"
if(demoMode&&introAlpha==0){ // Random draw
	acelX+=(random(20)-random(20))/100; if(posX>ww||posX<0){acelX*=-1;}; if(abs(acelX)>5){acelX*=random(10)/10};
 	acelY+=(random(20)-random(20))/100; if(posY>wh||posY<0){acelY*=-1;}; if(abs(acelY)>5){acelY*=random(10)/10};
	posX+=acelX;posY+=acelY;
	isTouching=true;
}
if(!demoMode){ // Interactive mode
	posX=mouseX;
	posY=mouseY;
}

if(isTouching&&touchDuration>2&&colorOverlay==0){ // If touching/clicking (doesn't run if touch is too quick - avoid triggering in mobile)

	strokeAlpha = minAlpha+abs(sin(globalCounter))*(255-minAlpha);
	noFill();
	
	var tempp = strokeNoise*(sin(globalCounter/2));
	strokeWeight(1);
	stroke(arcColor[0]+tempp,arcColor[1]+tempp,arcColor[2]+tempp,strokeAlpha);	
		
	if(drawMode==3){stroke(floor(arcColor[0]/2)+tempp,floor(arcColor[1]/2)+tempp,floor(arcColor[2]/2)+tempp,strokeAlpha/4);} 

	if(drawMode>1){
		if(posX<ww/2){wallLeft=true;wallRight=false;}
		if(posX>ww/2){wallRight=true;wallLeft=false;}
		if(posY<wh/2){wallTop=true;wallBottom=false;}
		if(posY>wh/2){wallBottom=true;wallTop=false;}	
	}

	// Draw curves
	if((drawMode==1&&wall==4)||(drawMode>1&&wallLeft)){ //left walll
		var tempYa = random(wh);
		var dy = tempYa-posY;
		curve(posX+defDist,posY+(dy/2),posX,posY,0,tempYa,-defDist,tempYa+dy*4);
	}
	if((drawMode==1&&wall==2)||(drawMode>1&&wallRight)){ //right walll
		var tempYb = random(wh);
		var dy = tempYb-posY;
		curve(posX-defDist,posY+(dy/2),posX,posY,ww,tempYb,ww+defDist,tempYb+dy*4);
	}
	if((drawMode==1&&wall==1)||(drawMode>1&&wallTop)){ //top walll
		var tempXa = random(ww);
		var dx = tempXa-posX;
		curve(posX+(dx/2),posY+defDist,posX,posY,tempXa,0,tempXa+dx*4,-defDist);
	}
	if((drawMode==1&&wall==3)||(drawMode>1&&wallBottom)){ //lower walll
		var tempXb = random(ww);
		var dx = tempXb-posX;
		curve(posX+(dx/2),posY-defDist,posX,posY,tempXb,wh,tempXb+dx*4,wh+defDist);
	}
	

	if(drawMode==3){ // Direct draw (Mode 3)
		strokeWeight(2);
		stroke(drawColor[0],drawColor[1],drawColor[2],drawColor[3]);
		if(lastX>0){ line(posX, posY, lastX, lastY);} // avoids mobile mistaking last position on touch end as first position on touch (see touch end function)
		lastX = posX; lastY = posY;
	}
	
} // end 'if isTouching'
	
}


function executeCommand(currentCommand){

if(currentCommand=="save"){
	var fileName="firula_"+year()+month()+day()+"_"+currentSession+"_"+hour()+"h"+minute()+"min"+second()+"s";
	saveCanvas(fileName, 'jpg');
}

if(currentCommand=="clear"){
			newSession();	
}

currentCommand="none";

}
 
function touchStarted() { // Touch/Click

if(currentSession>0){ // If not intro
	demoMode = false;
	lastX = mouseX; lastY = mouseY; // Avoids connecting with previous line
	idleTime=0;
	
	if(touches.length==2){ // If two-finger touch
		if(touches[1].y>3*wh/4){ // If second finger on bottom, save
			currentCommand="save"; 
			executeCommand(currentCommand);
		}
		if(touches[1].y<wh/4) { // If second finger on top...
			if(touches[1].x<100) { //...left, reset (go to intro)
				setup();
			}else{ //...right, clear
				currentCommand="clear"; 
				executeCommand(currentCommand);
			}
		}
		if((touches[1].y>wh/4)&&(touches[1].y<3*wh/4)) { // If second finger on center, cycle modes
			if(randomMode){
				drawMode=1;
				randomMode=false;
			}else{
				if(drawMode==3){
					randomMode=true; // PS: I don't think this runs anymore
				}else{
					drawMode+=1;
				}
			}
		}		
	};
	
	if(!isVertical){ // Horizontal screen: prioritize side walls; PS: wall 1 = top (clockwise)
		if(posY<wh/2){wall=1;}
		if(posY>wh/2){wall=3;}
		if(posX<ww/propB){wall=4;}
		if(posX>propA*ww/propB){ wall=2;}
	}else{ // Vertical screen: prioritize top or bottom
		if(posX<ww/2){wall=4;}
		if(posX>ww/2){ wall=2;}
		if(posY<wh/propB){wall=1;}
		if(posY>propA*wh/propB){wall=3;}
	}

}else{ // If at intro

	if(mouseY>4*wh/5){ // If click/touch at bottom, open link
		window.open('http://www.7luas.com.br/english','_blank');
	}else{ // Starts firula
		if(!(introAlpha>0)&&colorOverlay==0){ // Unless intro or colorOverlay are still not done displaying
			randomMode=true;
			demoMode=true;
			newSession();
		}
	}
}

isTouching=true;

return false;
}

function touchEnded() { // Release touch/click

touchDuration = 0; idleTime=0;

wall=0;

wallLeft=false; wallRight=false; wallTop=false; wallBottom=false;

lastX=-10; // allows test to check if next touch is new

isTouching=false;

return false;
}