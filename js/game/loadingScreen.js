/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import Game from '../engine/game.js';
import Button from './button.js';
class LoadingScreen extends Game {
constructor(canvasId) {
super(canvasId);
let startBtn = new Button(this.canvas.width/2,this.canvas.height/2,100,40, 'blue', "Start");
    this.addGameObject(startBtn);
    this.camera.target = startBtn; 
  }
}
export default LoadingScreen;
