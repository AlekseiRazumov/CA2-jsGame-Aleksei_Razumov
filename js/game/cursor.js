/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';

class Cursor extends GameObject
{
    constructor(x, y)
    {
    
  	super(x, y);
  	this.addComponent(new Renderer('red', 10,10));
	this.addComponent(new Input()); 
  	this.tag = 'cursor'; 
    }
    
    
    update(deltaTime){
         const input = this.getComponent(Input); // Get input component
         const renderer =  this.getComponent(Renderer);
         this.x=input.mx + this.game.camera.x-25 -renderer.width/2;
         this.y=input.my + this.game.camera.y-25- renderer.height/2;
        
         super.update(deltaTime);
    }
}

export default Cursor;
