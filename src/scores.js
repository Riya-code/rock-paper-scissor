import K from "./konstants";
import {MID_X,TEXT_TOP_MARGIN,TEXT_CONFIG} from "./konstants";

export let leftScore = 0;
export let rightScore = 0;

export const Left_Score = K.add([
    K.text(leftScore,TEXT_CONFIG),
    K.pos(MID_X/2, TEXT_TOP_MARGIN),
  	K.origin("topright"),
    K.fixed(),
])

export const Right_Score = K.add([
    K.text(rightScore,TEXT_CONFIG),
    K.pos(K.width() - MID_X/2,TEXT_TOP_MARGIN),
	  K.origin("topleft"),
    K.fixed(),
])

Left_Score._update = function(){
  leftScore++;
  Left_Score.text = leftScore;
}

Left_Score.reset = function(){
	leftScore = 0;
	Left_Score.text = leftScore;
  }

Right_Score._update = function(){
	rightScore++;
	Right_Score.text = rightScore;
  }

Right_Score.reset = function(){
   rightScore = 0;
   Right_Score.text = rightScore;
} 