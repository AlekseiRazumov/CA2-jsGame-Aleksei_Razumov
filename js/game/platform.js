/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";
import Projectile from './projectile.js'
import Enemy from './enemy.js';
import Player from './player.js';

class Platform extends GameObject
{
    constructor(x, y, width, height, color = 'brown')
    {
    
  	super(x, y);
  	this.addComponent(new Renderer(color, width, height));
	this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
  	this.tag = 'platform'; 
    }
    update(deltaTime){
    const physics = this.getComponent(Physics);
     const renderer = this.getComponent(Renderer);
    
    const objects = this.game.gameObjects.filter((obj) => obj instanceof Player ||obj instanceof Enemy );
    this.isOnPlatform = false;

    for (const obj of objects) 
    {
      const otherPhysics = obj.getComponent(Physics);
      if (physics.isColliding(obj.getComponent(Physics))) 		
      {
        const [left, right, top, bottom] = physics.getBoundingBox();
        const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBox();
        if(left < otherRight && left>otherLeft && bottom > otherBottom && top<otherTop){
            //otherPhysics.velocity.x=0;
            obj.x = this.x - obj.getComponent(Renderer).width;
        }
        else if(right > otherLeft && bottom > otherBottom && top<otherTop){
            //otherPhysics.velocity.x=0;
            obj.x = this.x + renderer.width;
        }
        else if(top < otherBottom && top>otherTop){
            //otherPhysics.velocity.x=0;
            obj.y = this.y -obj.getComponent(Renderer).height;
        }
        else if(bottom > otherTop){
            //otherPhysics.velocity.x=0;
            obj.y = this.y +renderer.height;
        }

    }
  }
}
}
export default Platform


