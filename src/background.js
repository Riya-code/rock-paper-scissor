import K from "./konstants";
import { MID_X,BG_COLOR_LEFT,BG_COLOR_RIGHT,BG_LEFTS,BG_RIGHTS } from "./konstants";

export const Left_Bg = K.add([
    K.pos(0,0),
    K.rect(MID_X,K.height()),
    BG_COLOR_LEFT,
    K.area(),
])
Left_Bg.frames = 0;
Left_Bg.time = 0;

export const Right_Bg = K.add([
    K.pos(MID_X,0),
    K.rect(MID_X,K.height()),
    BG_COLOR_RIGHT,
    K.area(),
])
Right_Bg.frames = 0;
Right_Bg.time = 0;

function handle_animation(obj,side){
    if(obj.time > 0.3){
        obj.time = 0;
        obj.frames++;
     }
     if(side === "right"){
     obj.frames = obj.frames%BG_RIGHTS.length;
     obj.use(BG_RIGHTS[obj.frames]);
     }else{
     obj.frames = obj.frames%BG_LEFTS.length;
     obj.use(BG_LEFTS[obj.frames]); 
     }
     obj.time += K.dt();    
}

Right_Bg._animate = function(){handle_animation(Right_Bg,"right")};
Left_Bg._animate = function(){handle_animation(Left_Bg,"left")};