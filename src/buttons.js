import K from "./konstants";
import { MID_X,MID_Y,TEXT_CONFIG2,BUTTON_SCALE,BUTTON_SIZE,BTN_MARGIN,TTS} from "./konstants";
import { Right_Score,Left_Score} from "./scores";
import { Right_Hand,Left_Hand, resetFrames} from "./hands";
import { setLeft,setGameState,setRight,gameState,rightState,leftSprite,rightSprite,update_score, playerSide, leftState, setPlayerSide} from "./main";

export const State_Button = K.add([
    K.text(TTS,TEXT_CONFIG2),
    K.pos(MID_X,MID_Y),
	K.origin("center"),
	K.area(),
    ])

export const Rock_Button = K.add([
    K.sprite("btn_rock"),
    K.pos(MID_X,K.height()-BTN_MARGIN),
    K.scale(BUTTON_SCALE),
	K.area(),
]);

export const Paper_Button = K.add([
    K.sprite("btn_paper"),
    K.pos(MID_X + (BUTTON_SCALE*BUTTON_SIZE + BTN_MARGIN/3),K.height()-BTN_MARGIN),
    K.scale(BUTTON_SCALE),
	K.area(),
]);

export const Scissor_Button = K.add([
    K.sprite("btn_scissor"),
    K.pos(MID_X + (2*BUTTON_SCALE*BUTTON_SIZE + BTN_MARGIN/1.5),K.height()-BTN_MARGIN),
    K.scale(BUTTON_SCALE),
	K.area(),
]);

export const Pause_Button = K.add([
    K.sprite("btn_pause"),
    K.pos(MID_X + (5*BUTTON_SCALE*BUTTON_SIZE + BTN_MARGIN/1.5),K.height()-BTN_MARGIN),
    K.scale(BUTTON_SCALE),
	K.area(),
]);

export const Restart_Button = K.add([
    K.sprite("btn_restart"),
    K.pos(MID_X + (6.35*BUTTON_SCALE*BUTTON_SIZE + BTN_MARGIN/1.5),K.height()-BTN_MARGIN),
    K.scale(BUTTON_SCALE),
	K.area(),
]);

export const Switch_Button = K.add([
    K.sprite("btn_left"),
	K.pos(0,K.height()-BTN_MARGIN),
	K.scale(BUTTON_SCALE),
	K.area(),
]);

function handle_switch(){
 if(gameState === TTS){
	if(playerSide === "left"){
       setPlayerSide("right");
	   Switch_Button.use(K.sprite("btn_left"));
	   Switch_Button.pos.x = 0;
	   Rock_Button.pos.x += MID_X;
	   Paper_Button.pos.x += MID_X;
	   Scissor_Button.pos.x += MID_X;
	   Pause_Button.pos.x += MID_X;
	   Restart_Button.pos.x += MID_X;
	}else if(playerSide === "right"){
		setPlayerSide("left");
		Switch_Button.use(K.sprite("btn_right"));
		Switch_Button.pos.x = MID_X;
		Rock_Button.pos.x -= MID_X;
		Paper_Button.pos.x -= MID_X;
		Scissor_Button.pos.x -= MID_X;
		Pause_Button.pos.x -= MID_X;
		Restart_Button.pos.x -= MID_X;
	 }
	}
}

function handle_state(){
	if(gameState === TTS && !State_Button.hidden){
		setGameState("Running");
		State_Button.text = "";
		setRight("Waiting",rightSprite);
		setLeft("Waiting",leftSprite);
		Switch_Button.hidden = true;
      }
}

function handle_move(state,right,left){
 if(playerSide === "right" && gameState === "Running"){
	if(rightState === "Waiting" && leftState === "Waiting"){
		setRight(state,right);
		Right_Hand.use(K.sprite(rightSprite));
		Left_Hand._play();
	    update_score(true);
     }
  }else if(playerSide === "left" && gameState === "Running"){
	if(rightState === "Waiting" && leftState === "Waiting"){
	   setLeft(state,left);
	   Left_Hand.use(K.sprite(leftSprite));
	   Right_Hand._play();
	   update_score(true);
	}
  }
}

function handle_restart(){
	if(gameState === "Running"){
		setGameState(TTS);
		State_Button.text = gameState;
		setRight("Rock","right_rock_hand");
		setLeft("Rock","left_rock_hand");
		Right_Hand.use(K.sprite(rightSprite));
		Left_Hand.use(K.sprite(leftSprite));
		Right_Score.reset();
		Left_Score.reset();
		Switch_Button.hidden = false;
		resetFrames();
	 }
}

function handle_pause(){
	if(gameState === "Running"){
		setGameState("Paused");
		State_Button.text = gameState;
		Pause_Button.use(K.sprite("btn_resume"));
	 }else if(gameState === "Paused"){
		setGameState("Running");
		State_Button.text = "";
		Pause_Button.use(K.sprite("btn_pause"));
	 }
}

State_Button.onClick(() => handle_state());
Rock_Button.onClick(() =>  handle_move("Rock","right_rock_hand","left_rock_hand"));
Paper_Button.onClick(() =>  handle_move("Paper","right_paper_hand","left_paper_hand"));
Scissor_Button.onClick(() =>  handle_move("Scissor","right_scissor_hand","left_scissor_hand"));
Restart_Button.onClick(() => handle_restart());
Pause_Button.onClick(() => handle_pause());
Switch_Button.onClick(() => handle_switch());