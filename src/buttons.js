import K from "./konstants";
import { MID_X,MID_Y,TEXT_CONFIG2,BUTTON_SCALE,BUTTON_SIZE,BTN_MARGIN,TTS} from "./konstants";
import { Player_Score,CPU_Score} from "./scores";
import { Player_Hand,CPU_Hand} from "./hands";
import { setCpu,setGameState,setPlayer,gameState,playerState,cpuSprite,playerSprite,update_score} from "./main";

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

State_Button.onClick(() => {
	if(gameState === TTS){
       setGameState("Running");
	   State_Button.text = "";
       setPlayer("Waiting",playerSprite);
	   setCpu("Waiting",cpuSprite);
	}
});

Rock_Button.onClick(() => {
	if(gameState === "Running" && playerState === "Waiting"){
    setPlayer("Rock","right_rock_hand");
	Player_Hand.use(K.sprite(playerSprite));
    CPU_Hand._play();
	update_score(true);
	}
});

Paper_Button.onClick(() => {
	if(gameState === "Running" && playerState === "Waiting"){
    setPlayer("Paper","right_paper_hand");
	Player_Hand.use(K.sprite(playerSprite));
	CPU_Hand._play();
	update_score(true);
	}
});

Scissor_Button.onClick(() => {
	if(gameState === "Running" && playerState === "Waiting"){
    setPlayer("Scissor","right_scissor_hand");
	Player_Hand.use(K.sprite(playerSprite));
    CPU_Hand._play();
	update_score(true);
	}
});

Restart_Button.onClick(() => {
	if(gameState === "Running"){
       setGameState(TTS);
	   State_Button.text = gameState;
       setPlayer("Rock","right_rock_hand");
	   setCpu("Rock","left_rock_hand");
	   Player_Hand.use(K.sprite(playerSprite));
	   CPU_Hand.use(K.sprite(cpuSprite));
	   Player_Score.reset();
	   CPU_Score.reset();
	}
});

Pause_Button.onClick(() => {
	if(gameState === "Running"){
       setGameState("Paused");
	   State_Button.text = gameState;
	   Pause_Button.use(K.sprite("btn_resume"));
	}else if(gameState === "Paused"){
       setGameState("Running");
	   State_Button.text = "";
	   Pause_Button.use(K.sprite("btn_pause"));
	}
})