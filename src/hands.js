import K from "./konstants";
import { SCALE,MID_Y,HAND_HEIGHT,HAND_WIDTH,HAND_SCALE,STATES,CPU_HANDS,ANIM_MID,CPU_FRAMES,PLAYER_FRAMES} from "./konstants";
import {gameState,playerState,cpuState,cpuSprite,setCpu, playerSprite} from "./main";

export const Player_Hand = K.add([
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
 
 export const CPU_Hand = K.add([
     K.sprite("left_rock_hand"),
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
   let state = STATES[rand];
   let sprite = CPU_HANDS[rand];
   setCpu(state,sprite);
   CPU_Hand.use(K.sprite(cpuSprite));
   }
 }