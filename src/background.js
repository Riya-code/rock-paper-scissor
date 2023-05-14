import K from "./konstants";
import { MID_X,BG_COLOR_LEFT,BG_COLOR_RIGHT,BG_LEFTS,BG_RIGHTS } from "./konstants";

export const Left_Bg = K.add([
    K.pos(0,0),
    K.rect(MID_X,K.height()),
    BG_COLOR_LEFT,
    K.area(),
])

export const Right_Bg = K.add([
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