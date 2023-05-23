import K from "./konstants";
import {TTS,BG_COLOR_LEFT,BG_COLOR_RIGHT} from "./konstants";
import {Right_Bg,Left_Bg} from "./background";
import {Left_Score,Right_Score,leftScore,rightScore} from "./scores";
import {State_Button,Restart_Button,Pause_Button,Rock_Button,Scissor_Button,Paper_Button,Switch_Button} from "./buttons";
import {Right_Hand,Left_Hand, init_animation } from "./hands";

export let gameState = TTS; // Running , TAP TO START!,Paused!
export let playerSide = "right"; // right left

export let leftState = "Waiting"; // "Waiting" Rock","Paper","Scissor"
export let leftSprite = "left_rock_hand";
export let rightState = "Waiting"; // "Waiting" Rock","Paper","Scissor"
export let rightSprite = "right_rock_hand";

export function setLeft(state,sprite){
   leftState = state;
   leftSprite = sprite;
}

export function setRight(state,sprite){
   rightState = state;
   rightSprite = sprite; 
}

export function setGameState(state){ 
   gameState = state;
}

export function setPlayerSide(side){
  playerSide = side;
}

function handle_sound(side){
	if(playerSide === side){
	   K.play("win");
	}else{
	   K.play("loss");
	}
  } 

// Update Functions
export function update_score(plus){
	if(gameState == "Running"){
		if(rightState === "Rock" && leftState === "Scissor"){
		  if(plus){
		   Right_Score._update();
		   handle_sound("right");
		   }
		   return "right_win";
		}else if(rightState === "Paper" && leftState === "Rock"){
		   if(plus){
		   Right_Score._update();
		   handle_sound("right");
		   }
		   return "right_win";
		}else if(rightState === "Scissor" && leftState === "Paper"){
		   if(plus){
		   Right_Score._update();
		   handle_sound("right");
		   }
		   return "right_win";
		}else if(rightState === "Paper" && leftState === "Scissor"){
		   if(plus){
		   Left_Score._update();
		   handle_sound("left");
		   }
		   return "left_win";
		}else if(rightState === "Scissor" && leftState === "Rock"){
		   if(plus){
		   Left_Score._update();
		   handle_sound("left");
		   }
		   return "left_win";
		}else if(rightState === "Rock" && leftState === "Paper"){
		   if(plus){
		   Left_Score._update();
		   handle_sound("left");
		   }
		   return "left_win";
		}
		return "draw";
	 }
}

let up_time = 0;
export function update_hands(){
	if(gameState === "Running"){
       if(leftState !== "Waiting" && rightState !== "Waiting"){
         if(up_time > 2){
           leftState = "Waiting";
		   rightState = "Waiting";
		   leftSprite = "left_rock_hand";
		   rightSprite = "right_rock_hand";
		   Left_Hand.use(K.sprite(leftSprite));
		   Left_Bg.use(BG_COLOR_LEFT);
		   Right_Hand.use(K.sprite(rightSprite));
		   Right_Bg.use(BG_COLOR_RIGHT);
		   up_time  = 0;
		 }
		 let us = update_score(false);
		 if(us === "right_win"){
			Right_Bg._animate();
		 }else if(us === "left_win"){
			Left_Bg._animate();
		 }
		 up_time += K.dt();
	   }	  
	}
}

// UPDATE -> 
K.onUpdate(() => {
	Right_Hand._animate();
	Left_Hand._animate();
	update_hands();
	init_animation();
   })