import K from "./konstants";
import {MID_X,TEXT_TOP_MARGIN,TEXT_CONFIG} from "./konstants";

export let cpuScore = 0;
export let playerScore = 0;

export const CPU_Score = K.add([
    K.text(cpuScore,TEXT_CONFIG),
    K.pos(MID_X/2, TEXT_TOP_MARGIN),
  	K.origin("topright"),
    K.fixed(),
])

export const Player_Score = K.add([
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