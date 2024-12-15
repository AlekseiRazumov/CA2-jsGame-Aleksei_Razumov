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
      new Platform(0,this.canvas.height-20,400,400),
      new Platform(500,this.canvas.height-20,400,20),
      new Platform(1500,this.canvas.height-80,200,80),
      new Platform(1800,this.canvas.height-120,200,120),
      new Platform(2100,this.canvas.height-20,400,20) ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }
    const collectibles = [
      new Collectible(0,this.canvas.height-40,20,20),
      new Collectible(500,this.canvas.height-50,20,20),
      new Collectible(1500,this.canvas.height-40,20,20),
      new Collectible(1800,this.canvas.height-40,20,20),
      new Collectible(2100,this.canvas.height-40,20,20) ];
    for (const collectible of collectibles) {
      this.addGameObject(collectible);
    }
    
    
    const enemies = [
          new Enemy(100, this.canvas.height-40,1, Images.enemy),
          new Enemy(700, this.canvas.height-80,2, Images.enemy2),
          new Enemy(1500, this.canvas.height-1300,1, Images.enemy)
        ];
        for (const enemy of enemies) {
          this.addGameObject(enemy);
        }
        
         this.addGameObject(new PlayerUI(10, 10));

this.addGameObject(new Button(this.canvas.width-110,10,100,40,'lightGrey', "Pause")); 

}

}

export default Level;