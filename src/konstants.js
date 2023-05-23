import kaboom from "kaboom";
const K = kaboom({font:"sink"});

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
K.loadSprite("btn_left","sprites/left.png");
K.loadSprite("btn_right","sprites/right.png");

K.loadSound("win","sound/win.wav");
K.loadSound("loss","sound/loss.wav");

export const SCALE = K.width()/360;
export const MID_Y = K.height()/2;
export const MID_X = K.width()/2;

export const BG_COLOR_LEFT =  K.color(255, 109, 96);
export const BG_COLOR_LEFT2 = K.color(249, 150, 141);
export const BG_LEFTS = [BG_COLOR_LEFT,BG_COLOR_LEFT2];
export const BG_COLOR_RIGHT = K.color(5, 191, 219);
export const BG_COLOR_RIGHT2 = K.color(52, 211, 255);
export const BG_RIGHTS = [BG_COLOR_RIGHT,BG_COLOR_RIGHT2];

export const TEXT_TOP_MARGIN = 6*SCALE;
export const TEXT_CONFIG = {size: 40*SCALE,width: 140*SCALE};
export const TEXT_CONFIG2 = {size: 15*SCALE,width: 260*SCALE};

export const BUTTON_SIZE = 32;
export const BUTTON_SCALE = SCALE/1.5;
export const BTN_MARGIN = 24*SCALE;

export const HAND_WIDTH = 80;
export const HAND_HEIGHT = 32;
export const HAND_SCALE = SCALE*2;

export const STATES = ["Rock","Paper","Scissor"];
export const LEFT_HANDS = ["left_rock_hand","left_paper_hand","left_scissor_hand"];
export const RIGHT_HANDS = ["right_rock_hand","right_paper_hand","right_scissor_hand"];
export const TTS = "TAP TO START!";

export const MAX_FRAMES = 7;
export const MAX_FRAMES2 = 50;
export const ANIM_VALUE = 1.5*SCALE;
export const ANIM_MID = MID_Y - (HAND_HEIGHT*SCALE);
export const LHAND_FRAMES = [...gen_frames(MAX_FRAMES,-1),...gen_frames(MAX_FRAMES,1)];
export const RHAND_FRAMES = [...gen_frames(MAX_FRAMES,1),...gen_frames(MAX_FRAMES,-1)];
export const LEFT_INIT_FRAMES = gen_frames2(50,0,-1);
export const RIGHT_INIT_FRAMES = gen_frames2(50,K.width() - HAND_WIDTH*HAND_SCALE,1);

function gen_frames(len,p){// Frames array generator for hands;
    let frames = [];
    for(let i = 0; i<len; i++){frames.push(ANIM_MID + (p*i*ANIM_VALUE));}
    frames = [...frames,...frames.splice(0,len-1).reverse()];
    return frames;
}

function gen_frames2(len,x,p){
  let frames = [];
  for(let i = 0; i<len; i++){frames.push(x+(2*p*i*ANIM_VALUE));}
  return frames.reverse();
}

export default K;