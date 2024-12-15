/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';
import Collectible from "./collectible.js";
import Projectile from './projectile.js'
import Player from './player.js';
import Platform from './platform.js';

class Enemy extends GameObject {
    constructor(x, y, type, image) {
    super(x, y);
    this.addComponent(new Renderer('green', 50, 50, image));

    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));

        this.movementDistance = 0;
        this.movementLimit = 100;
        this.movingRight = true;
        this.type=type;
        this.canFire=true;
        this.lives=10;
      }
      update(deltaTime){
           const physics = this.getComponent(Physics);
            const renderer = this.getComponent(Renderer);
    
           const player = this.game.gameObjects.find((obj) => obj instanceof Player );
           
           let dirX = player.x-this.x;
           let dirY = player.y-this.y;
           let dirLength =Math.sqrt(dirX*dirX+dirY*dirY);
           dirX=dirX/dirLength;
           dirY=dirY/dirLength;
           physics.velocity.x=dirX*100;
           physics.velocity.y=dirY*100;
           
           if(this.type===1){
               if (physics.isColliding(player.getComponent(Physics))) {
                  player.collidedWithEnemy();
                }
                if(dirLength<=30){
                   physics.velocity.x=0;
                   physics.velocity.y=0;
               }
           }
           if(this.type===2){
               if(dirLength<=500 && dirLength>450){
                   physics.velocity.x=0;
                   physics.velocity.y=0;
               }
               else if(dirLength<500){
                   physics.velocity.x*=-1;
                   physics.velocity.y*=-1;
               }
               
               if(this.canFire){
                    let projectile = new Projectile(this.x + (renderer.width/2) , 
                    this.y + renderer.height/2, 10,10,Images.projectile2, "EnemyProjectile", dirX, dirY, 300);
                    this.game.addGameObject(projectile);
                     this.canFire = false;
                    setTimeout(() => {
                        this.canFire = true;
                      }, 1000);
               }
               
           }
           

    
    super.update(deltaTime);


   }
      
hit()
    {
        
        this.lives--;
        if(this.lives<=0){
            if(Math.floor(Math.random() * 5)===0){
                this.game.addGameObject(new Collectible(this.x,this.y,20,20));
            };
            this.game.removeGameObject(this);
        }
            
    }
}
export default Enemy;