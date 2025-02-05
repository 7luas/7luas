// stopping Distances - new version (standalone) - 2024/09/09 - v2 British Safety Council 
// "v2:" indicates (most) changes done for v2
 
// Define global vars (and loads images)
if(1){ // Folder for vars

if(1) { // General Vars

var finalStatsAnimationCounter=1;

// External SVG files
var svgSmoke=new Image(); svgSmoke.src="assets/smoke.svg";
var svgClock=new Image(); svgClock.src="assets/clock.svg";
var svgCrash=new Image(); svgCrash.src="assets/crash.svg";
var svgFalseStop=new Image(); svgFalseStop.src="assets/falsestop.svg";

// svgClock.onload=loadedSVG("clock");
// svgSmoke.onload=loadedSVG("smoke");
// svgCrash.onload=loadedSVG("crash");
// svgFalseStop.onload=loadedSVG("falsestop");


var chaoY;

// Smoke variables
var smokeWobble=0;
var currentSmokeyLine=-1;	
	
// Valid Touch: the touch that activates each new stage (in order to show on screen where it was)
var validTouch=0;
var validTouchX = 0;
var validTouchY = 0;

var justResizedCanvas=false;

var devMode = true;

var mailWin;

var socialMediaFacebookText;

var widthMobileBreakPoint = 550; // for mobile
var widthMediumBreakPoint = 750; // for mobile
var mobile = false; // if ww<widthMobileBreakPoint, mobile = true
var medium = false;

var tooShort;	var breakPointSmallHeight = 401;
var tooNarrow;	var breakPointSmallWidth = 900;


var bump;

var debug=false;
var debugCurrentCarState=-2;


var hoverReset = false; var hoverShare = false; 
var hoverShareFacebook = false; var hoverShareTwitter = false; 

var introDelay = 0; // used to be 50

var page=5; ///
var nextPage=-1; 
var pageMax=6; ///
var pagesCompleted=4;
var pageList = ["Introduction","Logical order","Spot the hazzard","Drive carefully","Stopping distances","Summary"];

var nextIdle = 0;

var fadeInStart= 100;
var fadeIn = fadeInStart;


// Mouse
var mousePressed = false;
var mtx = 0;
var mty = 0;
var dragClick=false;

var t;
var ctx;  
var x; var y;
var ww; var wh;
var tw; var th;
var prevWW;	
var prevWH;

//Graph pars
var graphW;
//LinePars
// Car pars
var carQtdMax=22;
var carWidthMeters = 4; // constant; from original graph
var carWidthPixels;
var coneWidth;
var ppM;


var currentCarStopGoal=-1;
var brakingCoeficient=50; // how fast it brakes (NOTE: braking distance is fixed; this only affects how fast it will do it; adjust until speed feels right)
var currentCarStopped=false;

// General vars		
var px; var py;
var timer;
var timestep = 10; // normal: 10 (bigger is slower)

// General layout vars
var topBarHeight=0;
var marginUnit=0;
var bottomMargin;

// General Nav Vars
var revealNavCounter = 0;
var wobbleNext=false; var wobbleBack=false;
var navBtnSize=0;
var navBackOK=false;
var navNextOK=false;

// Font styles / vars
var pageTitlePosX=0; var pageTitlePosY=0;
var pageTitleFont;
var pageTitleFont;
var	pageTitleLineHeight= 0;
var pageSubTitleFont;		
var pageBarFont; //v2
var pageSmallFontBold;
var pageSmallFont;
var fontMedium; var fontSizeMedium;
var headerFont;
var markpage2=false;
var fontSizeSmall;
 
// Color styles / vars
var colorBlue = "#022c5a";
var colorOrange = "#f47922";
var colorBlueLight = "#43658b";
var colorRed = "#ec1d24";
var colorYellow = "#fcad18";
var colorGrey = "#a6a6a6";
var colorGreyLight = "#cccccc";
 
var globalTime = 0; 
var globalLoop = 0; 


}

if(1) { // Game Specific Varsv

var buttonW;
var buttonH;
var shareBtnX;

var shareFacebookX;
var shareTwitterX;

var totalHits;
var totalFalseStops;
var closeWinAfterDelay = -1;
var mail;
var fastestReaction;	

var sM = 0.75; // Speed Multiplier, for debugging. 1 is normal. Lower makes all speeds smaller
				
var page5AlphaNow;
var resetBtnX = 0;
var resetBtnY = 0;
var resetCarGame = false;
var gameAlpha=1;
var startCarGame=false;
var doneCarGame=false;
var doneDrawStats=false;
var carBrakeAction=false;
var lineScale; var lineScaleBase = 1; // Line: each road/car speed; LineScale: allows scaling all elements
var lineScaleMax;
var currentLine = 0; // Determines the sequence of car game = -1: pregame, 0-6: each line
var coneXinicial=0; 
var coneXright; // v2: cone actually just pops up and stays there :D
var rowsDataReset=[[40*sM,0,-3,0,0,24,-1,1],[50*sM,0,-2,0,0,38,-1,1],[60*sM,0,-2,0,0,55,-1,1],[70*sM,0,-2,0,0,75,-1,1]];
//rowsDataReset=[[40*sM,0,-3,0,0,24,-1]]; // for debugging
var rowsData=rowsDataReset;
// Ideally the arrays below should be created dynamically based on vectors above
var coneX=[coneXinicial,coneXinicial,coneXinicial,coneXinicial]; // será atualizado no init
var coneHit=[false,false,false,false];
var falseStop=[false,false,false,false];
// Variable list: [ (v2 overhaul)
// 0: speedMph
// 1: speedKmh
// 2: rowState (it is -3 for first row, then straight to -2  for others)
// 3: loop
// 4: car current x pos
// 5: brake distance for this row (in meters)
// 6: thinking distance for this row (in pixels)
// 7: animation counter for row
// (CarState: -3 preStartGame, -2 cruise, -1 cone come/think, 0 brake, 1 end)
var coneCountdownBase = 200; var coneCountdownDelta = 150; var coneCountdown=999;
		

// Reaction times
var reactionTimes=[9999,9999,9999,9999];
var timeSinceStart;
var timeConeAppeared=0;

}

}

// Main functions
function initialize() {	// Init game vars and state (v2 ok)

	//Init cavas
    c = document.getElementById("myCanvas");
	
	resizeCanvas();

    ctx = c.getContext("2d");


	resetConeCountDown();

	lineScale = lineScaleMax;
	
	ctx.fillStyle = "white"; 
	ctx.fillRect(0,0,ww,wh);

	coneXinicial=ww;
	coneX=[coneXinicial,coneXinicial,coneXinicial,coneXinicial,coneXinicial,coneXinicial];

	
	
	defineCursorEvents();
	
	//Start the timer
	clearInterval(timer);
	timer = setInterval(function(){gameStep()}, timestep);

	drawBackground();

}
function defineCursorEvents(){ //  (v2 ok)
	
// Mouse/Touch events (both use same mouse function)
c.addEventListener("mousedown", mouseDown, false);
c.addEventListener("touchstart", mouseDown, false);
function mouseDown(event) {
	
	// First, get x,y position of mouse or touch
	if(event.targetTouches="null"){ // IF MOUSE (ie., no touch events)
			pxt = event.x;
			pyt = event.y;
	}
	if(event.targetTouches!="null"&&event.targetTouches.length>0){  
		if(event.targetTouches.length>2){
			if(devMode){
				debug=true;
			}
		}else{
			pxt = event.targetTouches[0].pageX;
			pyt = event.targetTouches[0].pageY;
		}
	}


	mousePressed=true;
	mtx=pxt;
	mty=pyt;
 
	// Show where touch was
	validTouch=1;
	validTouchX = pxt;
	validTouchY = pyt;
	
	carBrakeAction=true;
	


}

c.addEventListener("mouseup", mouseUp, false);
c.addEventListener("touchend", mouseUp, false);
function mouseUp(event){		
	mousePressed = false;

	var newLine = "%0D%0A";
	var doubleNewLines = newLine+newLine;
	var bigSpace = newLine+newLine+newLine+newLine+newLine+newLine+newLine+newLine+newLine+newLine+newLine+newLine; 
	var feedbackInfo="NAME: "+doubleNewLines+"EMAIL: "+doubleNewLines+"COMPANY: "+doubleNewLines+"PRODUCT OF INTEREST: "+doubleNewLines+"----------------------------------------------"+doubleNewLines+"FASTEST REACTION TIME: "+fastestReaction+" (hits:"+totalHits+")";
		
	//RESET
	if((px>resetBtnX&&px<resetBtnX+buttonW&&py>resetBtnY&&py<resetBtnY+buttonH)){			
		if(lineScale==lineScaleMax){
			// If intro
			rowsData[currentLine][2]+=1;
		} else{
			// If ending
			resetCarGameFunction();
		}
	}


	
	dragClick=false;		
}

c.addEventListener("mousemove", mouseMove, false);
c.addEventListener("touchmove", mouseMove, false);	
function mouseMove(event){
	if(event.targetTouches="null"){ // IF MOUSE (ie., no touch events)
	}
	if(event.targetTouches!="null"&&event.targetTouches.length>0){ // IF TOUCH
		//px = Math.floor(event.targetTouches[0].pageX/bsx);
		//py = Math.floor((wh-event.targetTouches[0].pageY)/bsy);
	}	
	px = event.x;
	py = event.y;

	// HOVER?
	// Reset
	if((px>resetBtnX&&px<resetBtnX+buttonW&&py>resetBtnY&&py<resetBtnY+buttonH)){			
		hoverReset = true;
	}else{
		hoverReset = false;
	}
	// Share (to be deleted)
	


}
// End Mouse/Touch events

}

function resizeCanvas() {
	
prevWW = ww;	
prevWH = wh;
	
ww = window.innerWidth;
wh = window.innerHeight;

c.width  = ww;
c.height = wh;


// Don't allow non-landscape resolutions
var maxPropAllowed = 1.5;
if (ww/wh<maxPropAllowed){
	wh = ww/1.77;
}





lineScaleMax=3;
justResizedCanvas=true;	


//Update vars
pageTitleLineHeight = (ww/250+wh/18); // everything is related to this
if (pageTitleLineHeight<25){pageTitleLineHeight=25;}
topBarHeight=pageTitleLineHeight*1.5;
marginUnit=topBarHeight/2;
bottomMargin=marginUnit;
pageTitlePosX=marginUnit;
pageTitlePosY=topBarHeight+1.5*marginUnit;


fontSizeMedium = pageTitleLineHeight/2;
fontSizeTitle = pageTitleLineHeight*0.7;
 
pageTitleFont = "200 "+pageTitleLineHeight+"px poppinsregular";
pageTitleFontBold = "200 "+fontSizeTitle+"px poppinssemibold";
pageSubTitleFont = "200 "+pageTitleLineHeight/1.5+"px poppinsregular";
pageBarFont = "bold "+pageTitleLineHeight/2.5+"px poppinsregular";
fontSizeSmall = pageTitleLineHeight/3;
if(fontSizeSmall>15){fontSizeSmall=15;} // not too big
pageSmallFontBold = "bold "+fontSizeSmall+"px poppinssemibold"; // Era: pageSmallFontBold = "bold "+pageTitleLineHeight/1.9+"px poppinssemibold";
pageSmallFont = fontSizeSmall+"px poppinsregular";
headerFont = "bold "+pageTitleLineHeight/1.2+"px poppinssemibold";


fontMedium = fontSizeMedium +"px poppinsregular";
fontMediumBold = fontSizeMedium +"px poppinssemibold";

navBtnSize = ww/12;

menuH = wh;


//Graph pars
graphW = ww-2*(marginUnit);  /// Despite being called graph, this actually defines total useful area for game itself (roads, car etc) 
carWidthPixels=(graphW/carQtdMax)*lineScale;
coneWidth=carWidthPixels/3;
ppM= carWidthPixels/carWidthMeters;//pixels per meter

coneXright = ww-marginUnit;

// Adjust RowsData accordingly
for(var it=0;it<rowsDataReset.length;it++){
	// Set pixel speeds for each row 
	rowsData[it][1]=rowsData[it][0]*(carWidthPixels/250); //  carWidthPixels/250 = magic  number
	// Set car start position for each row
	if(rowsData[it][4]==0){
		rowsData[it][4]=marginUnit;
	}else{
		rowsData[it][4]=rowsData[it][4];
	}
}

 
	
}
function gameStep() { 	// Keeps updating vars (considers windows W&H) (v2 ok)

timeSinceStart = performance.now();

// Too short/narrow window
if(wh<breakPointSmallHeight){tooShort=true;}else{tooShort=false;}
if(wh<breakPointSmallWidth){tooNarrow=true;}else{tooNarrow=false;}
	
//Update screen/camvas
resizeCanvas();


if(page<pageMax){
	if(pagesCompleted<(page+1)){
		wobbleNext=true;
	}else{
		wobbleNext=false;
	}
}

//Draws page and UI
drawPage();
/// drawUI();

if(currentLine==0&&lineScale>1){
	if(introDelay>0){
		introDelay-=1;
	}else{
		// Draw intro
		ctx.textAlign="center";
		// Top intro texts
		ctx.fillStyle = colorBlue;
		ctx.globalAlpha=((lineScale-1)/(lineScaleMax-1));
		ctx.font = pageTitleFont;
		ctx.fillText("How fast can you stop?",ww/2,chaoY-pageTitleLineHeight*3);		
		ctx.font = fontMediumBold;
		ctx.fillText("Brake as soon as you see the obstacle",ww/2,chaoY-pageTitleLineHeight*2);
		// Button
		var tempFontSize= fontSizeTitle;
		ctx.font = pageTitleFontBold;
		var tempText="OK, LET'S BEGIN";
		var tempTextWidth=ctx.measureText(tempText).width;
		buttonW=tempTextWidth;
		buttonH=tempFontSize*1.6;		
		resetBtnX = (ww/2)-buttonW/2;				 
		resetBtnY = chaoY+pageTitleLineHeight*4;
		if(hoverReset){
			ctx.fillStyle = colorBlueLight;
		}else{
			ctx.fillStyle = colorBlue;				
		}
		ctx.fillRect(resetBtnX,resetBtnY,buttonW,buttonH);						
		ctx.fillStyle = "white";	
		ctx.textAlign = "center";			
		ctx.font = fontMediumBold;
		ctx.fillText(tempText,resetBtnX+buttonW/2,resetBtnY+tempFontSize*1.);

	}
}

if(currentLine==0&&rowsData[currentLine][2]<0){
	// Space bar
	ctx.fillStyle = colorOrange;
	var blar=((lineScale-1)/(lineScaleMax-1));
	ctx.globalAlpha=1-blar;
	if (ctx.globalAlpha>0.98){
		ctx.globalAlpha+=(bump/1);
		ctx.font = fontMediumBold;
		ctx.textAlign = "center";				
		ctx.fillText("TO BRAKE, PRESS THE SPACE BAR / CLICK / TAP",ww/2,pageTitleLineHeight*3);
	}

}

globalTime+=1;
if(globalLoop>1){
	globalLoop=0;
}else{
	globalLoop+=0.1;
}


// Show valid touch
if(validTouch>0){
	
	if(0){ // Avoid
		ctx.globalAlpha=validTouch;
		validTouch-=0.01;

		ctx.fillStyle="green";
		ctx.beginPath();
		ctx.arc(validTouchX,validTouchY, 20, 2*Math.PI, false);
		ctx.closePath();
		ctx.fill();	
		
		ctx.globalAlpha=1;
	}
}else{
	if(!carBrakeAction){
		validTouch=0;
	}
}


}
function drawPage() {	// Draws actual page (v2 ok except for todov2's)

	//Font style for top level of all pages
	ctx.font = pageTitleFont;
	ctx.fillStyle = colorBlue;
	ctx.textAlign="left"; 	

	//clear canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,ww,wh); 


	page5AlphaNow= ctx.globalAlpha;


	

	ctx.globalAlpha = 1;

	// ACTION (space/click) (todov2)
	if(carBrakeAction){
		if(lineScale==lineScaleMax){
			// No longer possible to start game from tapping anywhere on intro
			// You can still via Space bar
		}
		if(lineScale==1){ // pre v2: lineScale==1||lineScale==lineScaleMax
			if(currentLine==-1){currentLine=0;};
			if(currentLine>-1&&currentLine<rowsData.length){
				if(rowsData[currentLine][2]==-1||rowsData[currentLine][2]==-2){ // if thinking or cruising
					if(rowsData[currentLine][2]==-2){ // if brake when cruising (before cone comes), mark as false stop
						falseStop[currentLine]=true;
					}
					reactionTimes[currentLine]= (Math.floor(timeSinceStart-timeConeAppeared))/1000;					
					rowsData[currentLine][6]=rowsData[currentLine][4];// row's thinking distance = current car position (at moment they brake)					
					rowsData[currentLine][2]=0; // go to braking state
				}
			}
		}
		//Important:
		carBrakeAction=false;
	}

	//loops road (v2 ok)
	for(var i=0;i<rowsData.length; i++){
		if(rowsData[i][2]<-1){ // if cruising, update loop
			if(rowsData[i][3]<1){
				rowsData[i][3]+=rowsData[i][0]/(200*lineScale);
			}else{
				rowsData[i][3]=0; 
			}
		}else{  // if not, keep zero
			rowsData[i][3]=0;
		}
	}
	
	//intro (v2 ok)
	if(currentLine==0){
		if(rowsData[currentLine][2]==-3){
			lineScale = lineScaleMax;
		}else{
			
			if(Math.floor(lineScale*1000)==1000){
				lineScale= 1;
			}else{
				lineScale += (lineScaleBase-lineScale)/30;					
			}
		}
	}
			
	// Cone countdown (v2 ok)
	if(rowsData[currentLine][2]==-2){
		if(coneCountdown>0){
			coneCountdown -= 1;
		}else{
			
			// Cone comes (cone appears)
			rowsData[currentLine][2]=-1;
			resetConeCountDown(); 
			timeConeAppeared = timeSinceStart;
		}
	}
			
	//Draw lines
	if(justResizedCanvas||doneCarGame||doneDrawStats){ // if resized, draw all
		for(var i=0; i<currentLine+1; i++){
			drawLine(i,true);
		}
		justResizedCanvas=false;
	}else{ // normally, just draw some 
		for(var i=0; i<currentLine+1; i++){
			if(i==currentLine||i==currentLine-1){
				drawLine(i,true);
			}else{
				drawLine(i,false);				 // dont really draw, just calculate
			}
		}
	}

			
	// Footer
	if(doneCarGame){
		ctx.fillStyle = colorGrey;
		ctx.textAlign = "left";
		ctx.font = pageSmallFont;
		ctx.fillText("© 2024 British Safety Council",marginUnit,wh-(marginUnit/2));					
	}

	// Landscape
	if(window.innerWidth/window.innerHeight<1.4){
		ctx.fillStyle = colorOrange;
		ctx.textAlign = "center";
		ctx.font = fontMediumBold;
		ctx.fillText("BEST VIEWED IN LANDSCAPE MODE",ww/2,wh-(marginUnit/2));					
	}

 

if(closeWinAfterDelay>0){
	closeWinAfterDelay-=1;
}else{
	if(closeWinAfterDelay!=-1){
	mail.close();		
	}
	closeWinAfterDelay=-1;

}


if(debug){

	
	var topDebug=wh/2;
	ctx.fillStyle="black";
	ctx.textAlign="left";
	ctx.font = "bold "+20+"px Arial";
	ctx.fillText("debug: window w x h:"+ww+","+wh+" globalTime:"+globalTime, 10,topDebug+30);
	ctx.fillText("coneX[currentLine]:"+coneX[currentLine], 10,topDebug+80);
	ctx.fillText("currentLine:"+currentLine, 10,topDebug+130);
	ctx.fillText("doneCarGame:"+doneCarGame, 10,topDebug+150);
	ctx.fillText("lineScale:"+lineScale, 10,topDebug+170);
	ctx.fillText("carBrakeAction:"+carBrakeAction, 10,topDebug+230);
	ctx.fillText("coneCountdown:"+coneCountdown, 10,topDebug+250);
	ctx.fillText("falseStop:"+falseStop, 10,topDebug+270);
	ctx.fillText("fontSizeSmall:"+fontSizeSmall, 10,topDebug+290);
	ctx.fillText("finalStatsAnimationCounter:"+finalStatsAnimationCounter, 10,topDebug+310);

}


}
function drawBackground(){
		var grd=ctx.createLinearGradient(ww/2,0,ww/2,wh);
		grd.addColorStop(0,"#f1f1f1");
		grd.addColorStop(0.25,"white");
		grd.addColorStop(0.75,"white");
		grd.addColorStop(1,"#f1f1f1");
		ctx.fillStyle=grd;	
		ctx.fillStyle="white"; // Ebvitando gradiante no fundo	
		ctx.fillRect(0,0,ww,wh);	
}

function keyDown(e) {					// Deals with keystrokes
//Responds to a key press event

	// Space bar
	if(e.keyCode==32){
		// At end, reset
		if(doneCarGame&&currentLine==rowsData.length-1){
			resetCarGameFunction();
		}

		carBrakeAction=true;

		if(lineScale==lineScaleMax){
			rowsData[currentLine][2]+=1;
		}


	}

	if(e.keyCode==68&&0) {
		if(debug){
			debug=false;
		}else{
			debug=true;
		}
	}
	
	if(e.keyCode == 82) { //r = reset car game
		//alert(pageTitleLineHeight);
		resetCarGameFunction();
	}



    

	if(0){ // no special keys 2024/09/09
	if(e.keyCode ==68&&e.shiftKey){
		//devMode=true; // if SHIFT d devmode on
	}

	

	
	
 
    if(e.keyCode > 47 && e.keyCode < 58) { //Numbers 0:48, 1:49, 2:50 .. 9:57;

 

		
	} 
	}
	
	}
function keyUp(e) {
	if(1) { // used to be just Space-bar (e.keyCode == 32)

	 
	 
	
	}
}
  
// 5. Stoppping Distances (Car Game)
function drawLine(line,drawThisLine){ // (includes Stats)
		
	var topX;
	var topY;

	drawThisLine=true; // Because it was bugging out and now showing some lines sometimes (hacky)

	// These topX and topY are only really usefull for intro, since later they are same as marginUnit
	topX= marginUnit + ((ww/2)-carWidthPixels/2)*((lineScale-1)/(lineScaleMax-1)); 
	topY= marginUnit*5.5+(lineScale-1)/(lineScaleMax-1)*marginUnit*2; //  part after 6.25 is just adjustment for intro screen


	var graphH = (wh-topY-bottomMargin/2.7); /// Despite being called graph, this actually defines total useful area for game itself (roads, car etc)

	chaoY = (topY+line*(graphH/rowsData.length))-7*(lineScale-1); //util

	var reactX = topX;
	var reactY = chaoY-carWidthPixels/2.5;
	var tempCarretPosition=reactX;
	var tempText2="";
	var iconSize=carWidthPixels/3; // same height and width (clock is a bit higher, but this is fuddged below)

	
	if(drawThisLine&&0){
		// Background for the line (if needed)
		ctx.fillStyle = "pink";
		var tempH = carWidthPixels*1.65;
		ctx.fillRect(0,chaoY-(tempH/2),ww,carWidthPixels*2); 
	}
	
	//debug
	if(debug){
		ctx.font = "10px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("Me: item "+line+"/"+currentLine+" state:"+rowsData[line][2]+" currentCarStopGoal:"+currentCarStopGoal,topX,chaoY-carWidthPixels);
	}
	
	
	//Show stats 1/2 (below road/car)
	if(doneCarGame){ 
		if(finalStatsAnimationCounter>0){
			finalStatsAnimationCounter-=finalStatsAnimationCounter/100;
		}
	
		// Bars (Stripes)
		var stripesH = ((wh/6)*0.5)*(1-finalStatsAnimationCounter);
		var stripeY = (chaoY-marginUnit/2)+(((wh/6)*0.5)-stripesH);
		// If failed to brake, just put a red bar below all (up till the crash)
		if(coneHit[line]){
			ctx.fillStyle = colorRed;
			ctx.fillRect(topX,stripeY,graphW-carWidthPixels/2,stripesH);			
		}
		// Thinking...
		if(1||rowsData[line][2]>-2 ){
			var tempWthinking = rowsData[line][4]-marginUnit;
			if(rowsData[line][2]>-1){
				tempWthinking = rowsData[line][6]-marginUnit;
			}
			ctx.fillStyle = colorYellow;
			if(!falseStop[line]&&rowsData[line][6]>-1){ // Don't show if False stop, or if player never braked
				ctx.fillRect(topX,stripeY,tempWthinking,stripesH);
			}
		}
		// Braking...
		if(rowsData[line][2]>-1&&!coneHit[line]){
			var tempWbraking = (rowsData[line][5]*ppM);
			ctx.fillStyle = colorOrange;
			//if(falseStop[line]){tempWthinking+=marginUnit;} // dunno why. Hack
			ctx.fillRect(topX+tempWthinking,stripeY,tempWbraking,stripesH);
		}
		

		
		//Stripes text
		if(0){
			var stripeTextSize = stripesH*0.55;
			if(!(ww<800&&line==0)){ // Dont draw number if first line of mobile
				if(!(ww<500&&line==1)){ // Same for second line
					ctx.font = "bold "+stripeTextSize+"px Arial";
					ctx.textAlign="center"; 
					ctx.fillStyle = "white";
					var stripesTextY = stripeY+stripesH/2+stripeTextSize/2.5;
					ctx.fillText(rowsData[line][3]+" m",topX+tempWthinking/2,stripesTextY);
					ctx.fillText(rowsData[line][4]+" m",topX+tempWthinking+tempWbraking/2,stripesTextY);
				}
			}
		}

		//End texts
		if(0){		
			ctx.font = "bold 12px Arial";
			ctx.fillStyle = "black";
			var ety = chaoY+stripesH/3;
			var etx = topX+tempWthinking+tempWbraking-50; if(line<2){etx=topX+tempWthinking+tempWbraking+50+carWidthPixels;}
			ctx.fillText((rowsData[line][3]+rowsData[line][4])+" metres",etx,ety);
			if(wh>500){
				ctx.globalAlpha=0.6;
				ctx.font = "12px Arial";
				ctx.fillText("("+rowsData[line][2] +" car lengths)",etx,ety+12);
				ctx.globalAlpha=1;
			}
		}

		
		
	}

	if(rowsData[line][2]==1&&rowsData[line][7]>0){
		rowsData[line][7]-=rowsData[line][7]/4;
	}

 	//Draw Line (road+car)
	if(drawThisLine){
		drawRoad(topX,chaoY,line); // x,y,graphW,carW,line
	}
	//Draw Cone 
	ctx.globalAlpha=gameAlpha*page5AlphaNow;
	if(rowsData[line][2]>-2){ // ie. cone shows
//		coneX[line]+=(coneX[line]-coneXright)/10;
		coneX[line]-=(coneX[line]-coneXright)/2;
		if(drawThisLine&&!falseStop[line]){
			
			// draw crash star
			if(coneHit[line]){
				strokeStar(coneX[line]-coneWidth,(chaoY-carWidthPixels/8)+carWidthPixels/4,((carWidthPixels/2.1)*(1-rowsData[line][7])),10,2);
			}
			
			
			drawActualCone(coneX[line],chaoY-carWidthPixels/8,carWidthPixels,coneHit[line]);
		}
		ctx.globalAlpha=1;
	}
	// Draw skidmarks
	if(rowsData[line][2]>-1&&rowsData[line][6]!=-1){
		var lineStartX=rowsData[line][6];
		//if(falseStop[line]){lineStartX+=marginUnit;}
		var lineEndX=rowsData[line][4]+carWidthPixels/4;
		var lineY=chaoY+carWidthPixels/1.75;
		var	grad=ctx.createLinearGradient(lineStartX,lineY,lineEndX,lineY);
		grad.addColorStop(0, "rgba(0,0,0,0.1)");
		grad.addColorStop(1, "rgba(0,0,0,0)");
		//
		ctx.strokeStyle = grad;
		//ctx.lineCap = "round";
		for (var i = 0; i < 2; i++){
			ctx.lineWidth = (carWidthPixels/(15+15*i));
			ctx.setLineDash([2*i,4*i]);
			ctx.beginPath();
			ctx.moveTo(lineStartX, lineY);
			ctx.lineTo(lineEndX, lineY);
			ctx.stroke();		
		}
		ctx.setLineDash([]);
	}
	//Draw car
	if(drawThisLine){
		calculateCar(chaoY,line);
	}	
	
	


	//Show stats 2/2 (above road/car)
	if (1){ // Used to be: debug||doneCarGame
		
		// False stop?
		if(falseStop[line]&&(debug||doneCarGame)){
			// Desaturate
			ctx.globalCompositeOperation = "saturation";
			ctx.fillStyle = "hsl(0,0%,100%)";  // saturation at 100%
			ctx.fillRect(0,chaoY-((carWidthPixels*1.65)/2),ww,carWidthPixels*2); 		
			ctx.globalCompositeOperation = "source-over";  // restore default comp		

			// Whiten
			ctx.fillStyle = "white";
			ctx.globalAlpha=0.80;
			ctx.fillRect(0,chaoY-((carWidthPixels*1.65)/2),ww,carWidthPixels*2); 		
			ctx.globalAlpha=1;
		}
			
		// Show bar labels
		ctx.font = pageBarFont;
		ctx.textAlign = "left";
		ctx.globalAlpha=1-rowsData[line][7];
		if((!falseStop[line]&&!coneHit[line])&&(debug||doneCarGame)){
			ctx.drawImage(svgClock,tempCarretPosition,reactY-iconSize*1.1,iconSize,iconSize*1.2);
			tempCarretPosition+=iconSize*1.5;
			ctx.fillStyle = colorYellow;
			tempText2=reactionTimes[line].toFixed(2)+"s ";
			ctx.fillText(tempText2,tempCarretPosition,reactY);
			tempCarretPosition+=ctx.measureText(tempText2).width;
			ctx.fillText("REACTION TIME",tempCarretPosition,reactY);		
		}
		if(falseStop[line]){
			ctx.drawImage(svgFalseStop,tempCarretPosition,reactY-iconSize*0.9,iconSize,iconSize);
			tempCarretPosition+=iconSize*1.5;
			ctx.fillStyle = colorGrey;
			ctx.fillText("BRAKED TOO SOON",tempCarretPosition,reactY);
		}
		if(coneHit[line]){
			ctx.drawImage(svgCrash,tempCarretPosition,reactY-iconSize*0.9,iconSize,iconSize);
			tempCarretPosition+=iconSize*1.5;
			ctx.fillStyle = colorRed;
			ctx.fillText("CRASHED",tempCarretPosition,reactY);		
		}
		ctx.globalAlpha=1;


		// Feedback on top
		if(line==0&&(debug||doneCarGame)){  // only show once (picked this random line)
			var borda = 15;
			var tabY = marginUnit;
			var tabW = ww*1/2;
			var tabH = wh*0.4;	
			
			//header base
			ctx.globalAlpha = 1-finalStatsAnimationCounter;
			ctx.fillStyle = "white";
			ctx.fillRect(0,0,ww,topY-marginUnit*2);
			
			// Line 1 (big)
			totalHits = 0;
			totalFalseStops = 0;
			for(var i=0; i<coneHit.length; i++){if(coneHit[i]){totalHits+=1;}}
			for(var i=0; i<falseStop.length; i++){if(falseStop[i]){totalFalseStops+=1;}}
			var tempText ="";
			var tempTextWidth=0;
			ctx.textAlign="left"; 
			ctx.font = pageTitleFontBold;
			if(totalHits==0){
				if(totalFalseStops==1){
					ctx.fillStyle = colorGrey;
					tempText = "Brake only once you see the obstacle";
					ctx.fillText(tempText,marginUnit,marginUnit*1.5);
				}				
				if(totalFalseStops>1){
					ctx.fillStyle = colorGrey;
					tempText = "You are braking too soon!";
					ctx.fillText(tempText,marginUnit,marginUnit*1.5);
				}
				if(totalFalseStops==0){
					ctx.fillStyle = colorBlue;
					tempText = "No crashes! That last one was a ";
					ctx.fillText(tempText,marginUnit,marginUnit*1.5);
					tempTextWidth=ctx.measureText(tempText).width;
					tempText = "close call";
					ctx.fillStyle = colorRed;
					ctx.fillText(tempText,marginUnit+tempTextWidth,marginUnit*1.5);
					tempTextWidth+=ctx.measureText(tempText).width;
					tempText = " though...";
					ctx.fillStyle = colorBlue;
					ctx.fillText(tempText,marginUnit+tempTextWidth,marginUnit*1.5);
				}
			};
			if(totalHits>0){
				ctx.fillStyle = colorBlue;
				tempText = "You had ";
				ctx.fillText(tempText,marginUnit,marginUnit*1.5);
				tempTextWidth=ctx.measureText(tempText).width;
				if (totalHits==1){tempText = "one crash";}
				if (totalHits==2){tempText = "two crashes";}
				if (totalHits==3){tempText = "three crashes";}
				if (totalHits==4){tempText = "four crashes";}
				ctx.fillStyle = colorRed;
				ctx.fillText(tempText,marginUnit+tempTextWidth,marginUnit*1.5);
			}
			//
			
			// Line 2 (smaller)
			var secondLineY=marginUnit*1.5+pageTitleLineHeight;
			tempTextWidth=0;
			ctx.font = fontMedium;
			if (totalHits==4||totalFalseStops==4||((totalHits+totalFalseStops==rowsData.length)&&totalFalseStops>0)){
				ctx.fillStyle = colorBlue;
				tempText="You need to brake once you see the obstacle (press space bar, click or tap)";
				ctx.fillText(tempText,marginUnit,secondLineY);
			}else{
				// The bars below show your...
				ctx.fillStyle = colorBlue;
				tempText="The bars below show your ";
				ctx.fillText(tempText,marginUnit,secondLineY);
				tempTextWidth=ctx.measureText(tempText).width;
				// ...thinking...
				ctx.fillStyle = colorYellow;
				tempText="thinking ";
				ctx.fillText(tempText,marginUnit+tempTextWidth,secondLineY);
				tempTextWidth+=ctx.measureText(tempText).width;
				// ...and...
				ctx.fillStyle = colorBlue;
				tempText="and ";
				ctx.fillText(tempText,marginUnit+tempTextWidth,secondLineY);
				tempTextWidth+=ctx.measureText(tempText).width;
				// ...braking...
				ctx.fillStyle = colorOrange;
				tempText="braking ";
				ctx.fillText(tempText,marginUnit+tempTextWidth,secondLineY);
				tempTextWidth+=ctx.measureText(tempText).width;
				// ...distances for each speed.
				ctx.fillStyle = colorBlue;
				tempText="distances for each speed.";
				ctx.fillText(tempText,marginUnit+tempTextWidth,secondLineY);
				tempTextWidth+=ctx.measureText(tempText).width;
			}

			ctx.textAlign="center"; // reset to center

			// TRY AGAIN button
			var tempFontSize= fontSizeMedium;
			ctx.font = fontMediumBold;
			tempText=" TRY AGAIN ";
			tempTextWidth=ctx.measureText(tempText).width;
			buttonW=tempTextWidth;
			buttonH=tempFontSize*1.6;			
			var wobbleReset = Math.cos(globalTime/20);
			resetBtnX = ww-marginUnit-buttonW;				 
			resetBtnY = secondLineY-tempFontSize;
			if(hoverReset){
				ctx.fillStyle = colorBlueLight;
			}else{
				ctx.fillStyle = colorBlue;				
			}
			ctx.fillRect(resetBtnX,resetBtnY,buttonW,buttonH);						
			ctx.fillStyle = "white";	
			ctx.textAlign = "center";			
			ctx.fillText("TRY AGAIN",resetBtnX+buttonW/2,resetBtnY+tempFontSize*1.1);

			ctx.globalAlpha = 1;




			

			doneDrawStats = true; // makes stopping redraw
		}

	
	}

	if(debug){ // Show helpful guidelines
		// Show current car stop goal
		ctx.beginPath();
		ctx.strokeStyle = "purple";
		ctx.moveTo(currentCarStopGoal+carWidthPixels, 0);
		ctx.lineTo(currentCarStopGoal+carWidthPixels, wh);
		ctx.stroke();
		// Show current car position
		ctx.beginPath();
		ctx.strokeStyle = "green";
		ctx.moveTo(rowsData[currentLine][4], 0);
		ctx.lineTo(rowsData[currentLine][4], wh);
		ctx.stroke();
		// Show marginUnit on left
		ctx.beginPath();
		ctx.strokeStyle = "pink";
		ctx.moveTo(marginUnit, 0);
		ctx.lineTo(marginUnit, wh);
		ctx.stroke();
	}



}
function drawActualCar(x,y,carW,carH,cor,alphaCar){
	ctx.globalAlpha=alphaCar;
	
	x+= (carWidthPixels*0.8+(ww/2))*((lineScale-1)/lineScaleMax); // only acts on intro
	
	//Cor
	ctx.fillStyle = cor;

	var carBit=carW/10;
	//Body
	//ctx.fillRect(x,y+carH/1.8,carW,carW/4); 
	
	if(1){
	ctx.beginPath();
	ctx.moveTo(x,y+carH/1.8);
	ctx.lineTo(x+carW/8,y+carH/1.8);
	ctx.lineTo(x+carW/8+carBit,y);
	ctx.lineTo(x+carW-carW/2.5,y);
	ctx.lineTo(x+carW-carW/5,y+carH/1.8);	
	ctx.lineTo(x+carW,y+carH/1.8);
	ctx.lineTo(x+carW,y+carH/1.8+carW/4);
	ctx.lineTo(x,y+carH/1.8+carW/4);
	ctx.closePath();
	ctx.fill();
	}

//	ctx.fillRect(x+carW/8,y,carW-carW/3,carW/3);
	//Wheels
	var radWheel=carW/7;
	for(var i=0;i<2;i++){
		ctx.beginPath();
		var bitTemp = 0.101;
		var bumpy = bump;
		if(rowsData[currentLine][2]>-1){
			bumpy=0;
		}
		ctx.arc(x+(carW/4)+(i*(carW-radWheel-carW/3)), y+carH+(radWheel/2)-bumpy, radWheel, -bitTemp*Math.PI*2, (1+bitTemp) * Math.PI*2, false);
		ctx.closePath();
		ctx.fill();
	}

	ctx.globalAlpha=1;	
	
}
function calculateCar(y,line){

	var x = rowsData[line][4];

	var carW = carWidthPixels;

	var carH=carW/2;
	var state = rowsData[line][2];
	var brakingDistance=rowsData[line][5];
	var initialX=x;
	var carWd=0;

	if (state==-1){ // If cone showing, car moves right
		rowsData[line][4]+=rowsData[line][1]; // car speed = row's speed in pixels
	}
	if (state==0){ // If braking, stop car
		// Braking should always lead to car travelling brakingDistance
		if(currentCarStopGoal==-1){
			currentCarStopGoal=rowsData[line][4]+(brakingDistance*ppM);
		}else{
			rowsData[line][4]+=(currentCarStopGoal-rowsData[line][4])/brakingCoeficient; // If this feels wrong, try making coeficient consider row speed
		}
		
		if((currentCarStopGoal-rowsData[line][4]<0.75)||(coneHit[line])){
			rowsData[line][2]=1; // go to end state for this row
			currentCarStopGoal=-1; // so it can be used as trigger for the next row
			if(line==rowsData.length-1){ // last line, done game
					doneCarGame=true;
			}else{
				currentLine+=1;
				resetConeCountDown()
			}

		}
	}

	if(state==0&&currentCarStopGoal!=-1){ //braking
		var theStrength = (currentCarStopGoal-rowsData[line][4]-0.75)/300;
		drawSmoke(x,y,theStrength);
	}

	//hitcone?
	if((state==-1||state==0)&&(rowsData[line][4]+carWidthPixels+(coneWidth))>coneX[line]){ //check if hit by car
		coneHit[line]=true;
		rowsData[line][2]=1;
		currentCarStopGoal=-1; // so it can be used as trigger for the next row		
		if(line==rowsData.length-1){ // last line, done game
				doneCarGame=true;
		}else{
			currentLine+=1;
			resetConeCountDown()
		}		
	}

	//bump
	if(state<0){
		bump = Math.sin(globalTime/20)*lineScale*0.5;
		y+= bump;
	}
	drawActualCar(rowsData[line][4],y-carW/8,carW,carH,colorBlue,1);
		

}
function drawRoad(x,y,line){	

	var cw = carWidthPixels;
	// MAKE SURE EVERYTHINBG IS DRAW AS PROPORTION OF CAR WIDTH (cw), so it scales 
	
	var state = rowsData[line][2];
	var speed = rowsData[line][0];
	var dx = 0; // defasagem

	ctx.globalAlpha = gameAlpha*page5AlphaNow;

	ctx.fillStyle = colorGreyLight;
	
	// Road
	ctx.fillRect(0,y+cw/2.5,ww,cw/2.5);	

	// Guardrails top
	ctx.fillRect(0,y,ww,cw/5);	

	//Guardrails posts
	var distanceBetweenPosts=cw/1.5; var railQtd=Math.floor(ww/distanceBetweenPosts)+4;
	if(state<1){
		//crusing
		dx = rowsData[line][3]*distanceBetweenPosts; // this loops from 0 to 1: rowsData[line][3]
	}else{
		dx=0;
	}
	for(var i=0;i<railQtd;i++){
		//ctx.fillRect(x+(i*distanceBetweenPosts)-dx-(400)/3,y+cw/4,distanceBetweenPosts/8,cw/2-cw/4); //  Was bugging out a bit
		ctx.fillRect(x-(lineScale-1)*ww/5+((i-1)*distanceBetweenPosts)-dx,y,distanceBetweenPosts/4,cw*3/4);
	}
	ctx.globalAlpha = page5AlphaNow;

	
}
function drawSmoke(x,y,strength){

	smokeWobble=strength*((Math.sin(strength*(globalTime/200))+1)/2);
	var smokeHeight=carWidthPixels/3;
	ctx.drawImage(svgSmoke,x-carWidthPixels*0.9,y+(carWidthPixels/1.7)-smokeHeight*smokeWobble,carWidthPixels,smokeHeight*smokeWobble);
}
function drawActualCone(x,y,carW,hit){
	
	var coneBit=carW/10;

	var coneHeight=(carW/2)*1.2;
	var stripeHeight = coneHeight/5;
	ctx.lineWidth=coneBit/2;
	
	y+=coneHeight/5;
	
	x-=coneWidth;
	
	
	
	
	//Clipping Mask
	ctx.beginPath();
	ctx.moveTo(x,y+coneHeight);
	ctx.lineTo(x+coneBit,y);
	ctx.lineTo(x-coneBit+coneWidth,y);
	ctx.lineTo(x+coneWidth,y+coneHeight);
	ctx.closePath();
	ctx.strokeStyle = "black";
	ctx.stroke();
    // Clip to the current path
	ctx.save();
    ctx.clip();	
	// Draw red stripes
	ctx.fillStyle = colorRed;
	ctx.fillRect(x,y+coneHeight-stripeHeight,coneWidth,stripeHeight); 
	ctx.fillRect(x,y+coneHeight-3*stripeHeight,coneWidth,stripeHeight); 
	ctx.fillRect(x,y+coneHeight-5*stripeHeight,coneWidth,stripeHeight); 
	ctx.fillStyle = "white";
	ctx.fillRect(x,y+coneHeight-2*stripeHeight,coneWidth,stripeHeight); 
	ctx.fillRect(x,y+coneHeight-4*stripeHeight,coneWidth,stripeHeight); 
    // Undo the clipping
    ctx.restore();

}
function strokeStar(x, y, r, n, inset) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (r*inset));
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - r);
    }
    ctx.closePath();
	ctx.fillStyle=colorRed;
    ctx.fill();
    ctx.restore();
}
function resetConeCountDown(){
	coneCountdown = coneCountdownBase+ Math.random()*coneCountdownDelta;
}
function resetCarGameFunction(){
		window.location.reload(true);
}

function loadedSVG(par){
	alert("loaded svg:"+par);
}

window.onresize = function(event) {
   resetCarGameFunction();
};
// END of code
