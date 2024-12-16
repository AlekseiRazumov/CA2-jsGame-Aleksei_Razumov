/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

import Renderer from "../engine/renderer.js";
import Game from "../engine/game.js";
import Platform from "./platform.js";
import Player from "./player.js";
import Cursor from "./cursor.js";
import PlayerUI from "./playerUI.js";
import Enemy from "./enemy.js";
import Collectible from "./collectible.js";
import {Images} from '../engine/resources.js';
import Button from './button.js';

class Level extends Game {
constructor(canvasId)
 {
      
super(canvasId);
const player = new Player(50, this.canvas.height / 2 - 25);
    this.addGameObject(player);
const cursor = new Cursor(0, 0);
this.addGameObject(cursor);

 this.camera.target = player;
const platforms = [
      new Platform(-1000,0,40,2000),
      new Platform(-1000,0,2000,40),
      new Platform(-1000,2000,2000,40),
      new Platform(1000,0,40,2040),
      
      new Platform(200,800,600,40),
      new Platform(200,1200,600,40),
      new Platform(-800,800,600,40),
      new Platform(-800,1200,600,40),
      
      new Platform(200,200,40,640),
      new Platform(200,1200,40,600),
      new Platform(-200,200,40,640),
      new Platform(-200,1200,40,600)];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }
    
    
    
    const enemies = [
          new Enemy(100, this.canvas.height-40,1, Images.enemy),
          new Enemy(700, this.canvas.height-80,2, Images.enemy2)
         
        ];
    
       
         for (const enemy of enemies) {
              this.addGameObject(enemy);
            }
        
         this.addGameObject(new PlayerUI(10, 10));

this.addGameObject(new Button(this.canvas.width-110,10,100,40,'lightGrey', "Pause")); 

}


}

export default Level;