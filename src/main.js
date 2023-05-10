import kaboom from "kaboom";
const K = kaboom({font:"sink",orientation: "landscape",});
//LOAD AS
K.loadSprite("left_rock_hand","sprites/left_rock.png");
K.loadSprite("left_paper_hand", "sprites/left_paper.png");
K.loadSprite("left_scissor_hand","sprites/left_scissor.png");
K.loadSprite("right_rock_hand","sprites/right_rock.png");
K.loadSprite("right_paper_hand","sprites/right_paper.png");
K.loadSprite("right_scissor_hand", "sprites/right_scissor.png");

K.loadSprite("btn_pause","sprites/paused_button.png");
K.loadSprite("btn_resume","sprites/resume_button.png");
K.loadSprite("btn_restart","sprites/restart_button.png");
K.loadSprite("btn_rock","sprites/rock_button.png");
K.loadSprite("btn_paper","sprites/paper_button.png");
K.loadSprite("btn_scissor","sprites/scissor_button.png");

K.loadSound("win","sound/win.wav");
K.loadSound("loss","sound/loss.wav");
// LOAD -->
const SCALE = K.width()/360;
const MID_Y = K.height()/2;
const MID_X = K.width()/2;

const BG_COLOR_LEFT =  K.color(255, 109, 96);
const BG_COLOR_LEFT2 = K.color(249, 150, 141);
const BG_LEFTS = [BG_COLOR_LEFT,BG_COLOR_LEFT2];
const BG_COLOR_RIGHT = K.color(5, 191, 219);
const BG_COLOR_RIGHT2 = K.color(52, 211, 255);
const BG_RIGHTS = [BG_COLOR_RIGHT,BG_COLOR_RIGHT2];

const TEXT_TOP_MARGIN = 6*SCALE;
const TEXT_CONFIG = {size: 40*SCALE,width: 140*SCALE};
const TEXT_CONFIG2 = {size: 15*SCALE,width: 260*SCALE};

const BUTTON_SIZE = 32;
const BUTTON_SCALE = SCALE/1.5;
const BTN_MARGIN = 24*SCALE;

const HAND_WIDTH = 80;
const HAND_HEIGHT = 32;
const HAND_SCALE = SCALE*2;

const STATES = ["Rock","Paper","Scissor"];
const CPU_HANDS = ["left_rock_hand","left_paper_hand","left_scissor_hand"];
const TTS = "TAP TO START!";

const FRAMES = 7;
const ANIM_VALUE = 1.5*SCALE;
const ANIM_MID = MID_Y - (HAND_HEIGHT*SCALE);
const CPU_FRAMES = [...gen_frames(FRAMES,-1),...gen_frames(FRAMES,1)];
const PLAYER_FRAMES = [...gen_frames(FRAMES,1),...gen_frames(FRAMES,-1)];

let gameState = TTS; // Running , TAP TO START!,Paused!
let cpuScore = 0;
let playerScore = 0;
let cpuState = "Waiting"; // "Waiting" Rock","Paper","Scissor"
let cpuSprite = "left_rock_hand";
let playerState = "Waiting"; // "Waiting" Rock","Paper","Scissor"
let playerSprite = "right_rock_hand";

function gen_frames(len,pc){// Frames array generator for hands;
    let frames = [];
    for(let i = 0; i<len; i++){frames.push(ANIM_MID + (pc*(ANIM_VALUE*i)));}
    frames = [...frames,...frames.splice(0,len-1).reverse()];
    return frames;
}
// RENDER BACKGROUND -->
const Left_Bg = K.add([
    K.pos(0,0),
    K.rect(MID_X,K.height()),
    BG_COLOR_LEFT,
    K.area(),
])

const Right_Bg = K.add([
    K.pos(MID_X,0),
    K.rect(MID_X,K.height()),
    BG_COLOR_RIGHT,
    K.area(),
])

Right_Bg.frames = 0;
Right_Bg.time = 0;
Right_Bg._animate = function(){
	if(Right_Bg.time > 0.3){
       Right_Bg.time = 0;
	   Right_Bg.frames++;
	}
	Right_Bg.use(BG_RIGHTS[Right_Bg.frames%BG_RIGHTS.length]);
	Right_Bg.time += K.dt();
}

Left_Bg.frames = 0;
Left_Bg.time = 0;
Left_Bg._animate = function(){
	if(Left_Bg.time > 0.3){
       Left_Bg.time = 0;
	   Left_Bg.frames++;
	}
	Left_Bg.use(BG_LEFTS[Left_Bg.frames%BG_LEFTS.length]);
	Left_Bg.time += K.dt();
}
// SCORES
const CPU_Score = K.add([
    K.text(cpuScore,TEXT_CONFIG),
    K.pos(MID_X/2, TEXT_TOP_MARGIN),
	K.origin("topright"),
    K.fixed(),
])

const Player_Score = K.add([
    K.text(playerScore,TEXT_CONFIG),
    K.pos(K.width() - MID_X/2,TEXT_TOP_MARGIN),
	K.origin("topleft"),
    K.fixed(),
])

CPU_Score._update = function(){
  cpuScore++;
  CPU_Score.text = cpuScore;
}
CPU_Score.reset = function(){
	cpuScore = 0;
	CPU_Score.text = cpuScore;
  }

Player_Score._update = function(){
	playerScore++;
	Player_Score.text = playerScore;
  }

Player_Score.reset = function(){
   playerScore = 0;
   Player_Score.text = playerScore;
}  
// HANDS Comps -->
const Player_Hand = K.add([
   K.sprite("right_rock_hand"),
   K.pos(K.width() - HAND_WIDTH*HAND_SCALE,MID_Y-(HAND_HEIGHT*SCALE)),
   K.scale(HAND_SCALE),
])

Player_Hand.frames = 0;
Player_Hand._animate = function (){
  if(gameState === "Running" && playerState === "Waiting"){
  Player_Hand.pos.y = PLAYER_FRAMES[Player_Hand.frames%(PLAYER_FRAMES.length-1)];
  Player_Hand.frames++;
  }else{
   Player_Hand.pos.y = ANIM_MID;
  }
}

const CPU_Hand = K.add([
	K.sprite(cpuSprite),
	K.pos(0,MID_Y-(HAND_HEIGHT*SCALE)),
	K.scale(HAND_SCALE),
 ]);

 CPU_Hand.frames = 0;
 CPU_Hand._animate = function (){
   if(gameState === "Running" && cpuState === "Waiting"){
	 CPU_Hand.pos.y = CPU_FRAMES[CPU_Hand.frames%(CPU_FRAMES.length-1)];
	 CPU_Hand.frames++;
   }else{
	CPU_Hand.pos.y = ANIM_MID;
   }
 };

CPU_Hand._play = function(){
  if(gameState === "Running" && cpuState === "Waiting"){
  let rand = Math.floor(Math.random() * STATES.length);
   cpuState = STATES[rand];
  const cpuSprite = CPU_HANDS[rand];
  CPU_Hand.use(K.sprite(cpuSprite));
  }
}
// BUTTONS Comps --->
const State_Button = K.add([
    K.text(gameState,TEXT_CONFIG2),
    K.pos(MID_X,MID_Y),
	K.origin("center"),
	K.area(),
    ])

	State_Button.on

State_Button.onClick(() => {
	if(gameState === TTS){
       gameState = "Running";
	   State_Button.text = "";
	   playerState = "Waiting";
	   cpuState = "Waiting";
	}
});

const Rock_Button = K.add([
    K.sprite("btn_rock"),
    K.pos(MID_X,K.height()-BTN_MARGIN),
    K.scale(BUTTON_SCALE),
	K.area(),
]);

const Paper_Button = K.add([
    K.sprite("btn_paper"),
    K.pos(MID_X + (BUTTON_SCALE*BUTTON_SIZE + BTN_MARGIN/3),K.height()-BTN_MARGIN),
    K.scale(BUTTON_SCALE),
	K.area(),
]);

const Scissor_Button = K.add([
    K.sprite("btn_scissor"),
    K.pos(MID_X + (2*BUTTON_SCALE*BUTTON_SIZE + BTN_MARGIN/1.5),K.height()-BTN_MARGIN),
    K.scale(BUTTON_SCALE),
	K.area(),
]);

const Pause_Button = K.add([
    K.sprite("btn_pause"),
    K.pos(MID_X + (5*BUTTON_SCALE*BUTTON_SIZE + BTN_MARGIN/1.5),K.height()-BTN_MARGIN),
    K.scale(BUTTON_SCALE),
	K.area(),
]);

const Restart_Button = K.add([
    K.sprite("btn_restart"),
    K.pos(MID_X + (6.35*BUTTON_SCALE*BUTTON_SIZE + BTN_MARGIN/1.5),K.height()-BTN_MARGIN),
    K.scale(BUTTON_SCALE),
	K.area(),
]);

Rock_Button.onClick(() => {
	if(gameState === "Running" && playerState === "Waiting"){
	playerState = "Rock";
	playerSprite = "right_rock_hand";
	Player_Hand.use(K.sprite(playerSprite));
	CPU_Hand._play();
	update_score(true);
	}
});

Paper_Button.onClick(() => {
	if(gameState === "Running" && playerState === "Waiting"){
	playerState = "Paper";
	playerSprite = "right_paper_hand";
	Player_Hand.use(K.sprite(playerSprite));
	CPU_Hand._play();
	update_score(true);
	}
});

Scissor_Button.onClick(() => {
	if(gameState === "Running" && playerState === "Waiting"){
	playerState = "Scissor";
	playerSprite = "right_scissor_hand";
	Player_Hand.use(K.sprite(playerSprite));
    CPU_Hand._play();
	update_score(true);
	}
});

Restart_Button.onClick(() => {
	if(gameState === "Running"){
       gameState = TTS;
	   State_Button.text = gameState;
	   playerSprite = "right_rock_hand";
	   playerState = "Rock";
	   cpuSprite = "Rock";
	   cpuSprite = "left_rock_hand";
	   Player_Hand.use(K.sprite(playerSprite));
	   CPU_Hand.use(K.sprite(cpuSprite));
	   Player_Score.reset();
	   CPU_Score.reset();
	}
});

Pause_Button.onClick(() => {
	if(gameState === "Running"){
       gameState = "Paused";
	   State_Button.text = gameState;
	   Pause_Button.use(K.sprite("btn_resume"));
	}else if(gameState === "Paused"){
	   gameState = "Running";
	   State_Button.text = "";
	   Pause_Button.use(K.sprite("btn_pause"));
	}
})
// UPDATE -> 
K.onUpdate(() => {
 Player_Hand._animate();
 CPU_Hand._animate();
 update_hands();  
})
// Update Functions
function update_score(plus){
	if(gameState == "Running"){
		if(playerState === "Rock" && cpuState === "Scissor"){
		  if(plus){
		   Player_Score._update();
		   K.play("win");
		   }
		   return "player_win";
		}else if(playerState === "Paper" && cpuState === "Rock"){
		   if(plus){
		   Player_Score._update();
		   K.play("win");
		   }
		   return "player_win";
		}else if(playerState === "Scissor" && cpuState === "Paper"){
		   if(plus){
		   Player_Score._update();
		   K.play("win");
		   }
		   return "player_win";
		}else if(playerState === "Paper" && cpuState === "Scissor"){
		   if(plus){
		   CPU_Score._update();
		   K.play("loss");
		   }
		   return "cpu_win";
		}else if(playerState === "Scissor" && cpuState === "Rock"){
		   if(plus){
		   CPU_Score._update();
		   K.play("loss");
		   }
		   return "cpu_win";
		}else if(playerState === "Rock" && cpuState === "Paper"){
		   if(plus){
		   CPU_Score._update();
		   K.play("loss");
		   }
		   return "cpu_win";
		}
		return "draw";
	 }
}

let up_time = 0;
function update_hands(){
	if(gameState === "Running"){
       if(cpuState !== "Waiting" && playerState !== "Waiting"){
         if(up_time > 2){
           cpuState = "Waiting";
		   playerState = "Waiting";
		   cpuSprite = "left_rock_hand";
		   playerSprite = "right_rock_hand";
		   CPU_Hand.use(K.sprite(cpuSprite));
		   Left_Bg.use(BG_COLOR_LEFT);
		   Player_Hand.use(K.sprite(playerSprite));
		   Right_Bg.use(BG_COLOR_RIGHT);
		   up_time  = 0;
		 }
		 let us = update_score(false);
		 if(us === "player_win"){
			Right_Bg._animate();
		 }else if(us === "cpu_win"){
			Left_Bg._animate();
		 }
		 up_time += K.dt();
	   }
	  
	}
}