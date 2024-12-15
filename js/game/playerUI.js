/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

import GameObject from '../engine/gameobject.js';
import UI from '../engine/ui.js';
import Player from './player.js';

class PlayerUI extends GameObject {
  constructor(x, y) {
    super(x, y); // Call the constructor of the GameObject class.

this.uiComponent = new UI('Lives: 3 Score: 0', x, y);
    this.addComponent(this.uiComponent);
  }
  
   update(deltaTime) {
const player = this.game.gameObjects.find((obj) => obj instanceof Player);

this.uiComponent.setText(`Lives: ${player.lives} Score: ${player.score}`);
  }

} 

export default PlayerUI;

