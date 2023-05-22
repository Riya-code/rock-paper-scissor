import K from "./konstants";
import { SCALE,MID_Y,HAND_HEIGHT,HAND_WIDTH,HAND_SCALE,STATES,LEFT_HANDS,RIGHT_HANDS,ANIM_MID,LHAND_FRAMES,RHAND_FRAMES} from "./konstants";
import {gameState,rightState,leftState,leftSprite,setLeft,setRight,rightSprite} from "./main";

export const Right_Hand = K.add([
    K.sprite("right_rock_hand"),
    K.pos(K.width() - HAND_WIDTH*HAND_SCALE,MID_Y-(HAND_HEIGHT*SCALE)),
    K.scale(HAND_SCALE),
 ])
Right_Hand.frames = 0;
Right_Hand.time = 0;

export const Left_Hand = K.add([
  K.sprite("left_rock_hand"),
  K.pos(0,MID_Y-(HAND_HEIGHT*SCALE)),
  K.scale(HAND_SCALE),
]);
Left_Hand.frames = 0;
Left_Hand.time = 0;

function handle_animation(obj,side){
  if(gameState === "Running" && rightState === "Waiting"){
    if(obj.time > 0.001){
     obj.frames++;
     obj.time = 0;
    }
    if(side === "left"){
      obj.frames = obj.frames%LHAND_FRAMES.length;
      obj.pos.y = LHAND_FRAMES[obj.frames];
    }else{
      obj.frames = obj.frames%RHAND_FRAMES.length;
      obj.pos.y = RHAND_FRAMES[obj.frames];
    }
  }else{
    obj.pos.y = ANIM_MID;
  }
  obj.time += K.dt();
}

 function handle_play(state,side){
  if(gameState === "Running" && state === "Waiting"){
    let rand = Math.floor(Math.random() * STATES.length);
    let state = STATES[rand];
    if(side === "left"){
      let sprite = LEFT_HANDS[rand];
      setLeft(state,sprite);
      Left_Hand.use(K.sprite(leftSprite));
    }else{
      let sprite = RIGHT_HANDS[rand];
      setRight(state,sprite);
      Right_Hand.use(K.sprite(rightSprite));
     }
    }
 }

 Right_Hand._animate = function (){ handle_animation(Right_Hand,"right");}
 Left_Hand._animate = function (){ handle_animation(Left_Hand,"left");};
 Right_Hand._play = function(){ handle_play(rightState,"right");}
 Left_Hand._play = function(){ handle_play(leftState,"left");}