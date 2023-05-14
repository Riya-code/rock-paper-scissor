import K from "./konstants";
import {TTS,BG_COLOR_LEFT,BG_COLOR_RIGHT} from "./konstants";
import {Right_Bg,Left_Bg} from "./background";
import {CPU_Score,Player_Score,cpuScore,playerScore} from "./scores";
import {Player_Hand,CPU_Hand } from "./hands";
import { State_Button,Restart_Button,Pause_Button,Rock_Button,Scissor_Button,Paper_Button} from "./buttons";

export let gameState = TTS; // Running , TAP TO START!,Paused!
export let cpuState = "Waiting"; // "Waiting" Rock","Paper","Scissor"
export let cpuSprite = "left_rock_hand";
export let playerState = "Waiting"; // "Waiting" Rock","Paper","Scissor"
export let playerSprite = "right_rock_hand";

export function setCpu(state,sprite){
   cpuState = state;
   cpuSprite = sprite;
}

export function setPlayer(state,sprite){
   playerState = state;
   playerSprite = sprite;
}

export function setGameState(state){
   gameState = state;
}
// UPDATE -> 
K.onUpdate(() => {
 Player_Hand._animate();
 CPU_Hand._animate();
 update_hands();  
})
// Update Functions
export function update_score(plus){
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
export function update_hands(){
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