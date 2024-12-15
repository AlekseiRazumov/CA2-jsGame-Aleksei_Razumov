/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

import GameObject from '../engine/gameobject.js';
import Level from './level.js';
import Renderer from "../engine/renderer.js";
import {AudioFiles} from '../engine/resources.js';
import LoadingScreen from './loadingScreen.js';
class Button extends GameObject
{
     constructor(x, y, w, h, color, str) {
      super(x,y);
      this.width = w;
      this.height = h;
      this.color = color;
      this.text = str;
     

      this.addComponent(new Renderer('skyblue',0,0,0,0));
      document.addEventListener('click', this.click.bind(this), false);
  }
 
 draw(ctx)
  {
      super.draw(ctx);
      ctx.fillStyle=this.color;
      ctx.fillRect(this.game.camera.x + this.x,this.game.camera.y + this.y, this.width, this.height );
      ctx.textAlign = "center";
      ctx.font = "20px serif";
      ctx.fillStyle="white";
      ctx.fillText(this.text, this.game.camera.x + this.x + this.width/2, this.game.camera.y + this.y + this.height/2);
  }
    click(event)
    {
        let rect = this.game.canvas.getBoundingClientRect();
        let width = this.width;
        let height = this.height;

        if (event.clientX - rect.left >= this.x && event.clientX - rect.left <= this.x + width && event.clientY - rect.top >= this.y && event.clientY - rect.top <= this.y + height) 
        {

          if(this.text === "Start")
          {
               AudioFiles.bgm.play();
               AudioFiles.bgm.volume =0.3;
              const level = new Level(this.game.canvas.id);
              level.start();
          }
          if(this.text === "Try Again")
          {
            this.game.reset();
            
            const menu = new LoadingScreen('gameCanvas');
            
            menu.start();

          }
          if(this.text === "Pause")
          {
              this.game.pauseGame();
               if(this.game.pause){
                    console.log("wwfw");
                    AudioFiles.bgm.pause();
                }

                else
                    AudioFiles.bgm.play();
              
          }
        }    
    }
   

}
    



    

export default Button

