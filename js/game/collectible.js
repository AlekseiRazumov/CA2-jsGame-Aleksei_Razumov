/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js'; 
import { Images } from '../engine/resources.js';
import Game from "../engine/game.js";
class Collectible extends GameObject 
{
  constructor(x, y, width, height, color = 'red') 
{
super(x, y);
this.addComponent(new Renderer(color, width, height, Images.collectible));
this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
this.tag = 'collectible';
this.value = 1;
}

 

}
export default Collectible;
