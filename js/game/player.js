/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";
import GameObject from "../engine/gameobject.js";
import Input from '../engine/input.js';
import Game from "../engine/game.js";
import Platform from "./platform.js";
import Collectible from "./collectible.js";
import { Images } from '../engine/resources.js';
import ParticleSystem from '../engine/particleSystem.js'; 
import Projectile from './projectile.js'
import Cursor from './cursor.js'
import {AudioFiles} from '../engine/resources.js';
import Button from './button.js';

class Player extends GameObject {
constructor(x, y) {
    super(x, y); 
    this.renderer = new Renderer('blue', 50, 30, Images.player); 
    this.addComponent(this.renderer);
     this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
     this.isOnPlatform = false;

     this.addComponent(new Input()); 
     this.direction = -1;
     this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 300;
    this.jumpTime = 1.0;
    this.jumpTimer = 0;
    this.score=0;
    this.lives=100;
    this.Invulnerable=false;
    this.canDash=true;

    

}
emitCollectParticles(collectible) {
const particleSystem = new ParticleSystem(collectible.x, collectible.y, 'red', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

collect(collectible) {
	this.lives += collectible.value;
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible);
  }
startJump() {
    // Initiate a jump if the player is on a platform
   if (this.isOnPlatform) { 
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
   }
  }
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }
   collidedWithEnemy() {
    if (!this.isInvulnerable) {
          this.lives--;
          if(this.lives<=0){
              this.game.pauseGame();
              this.game.addGameObject(new Button(this.game.canvas.width/2,this.game.canvas.height/2,100,40,'blue', "Try Again")); 
              
              
          }
          this.isInvulnerable = true;
    setTimeout(() => {
            this.isInvulnerable = false;
          }, 500);
        }
  }

update(deltaTime) {
   

    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component
    const renderer = this.getComponent(Renderer);
    
    
    const cursor = this.game.gameObjects.filter((obj) => obj instanceof Cursor )[0];
    
    const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform );
    this.isOnPlatform = false;

    for (const platform of platforms) 
    {
      if (physics.isColliding(platform.getComponent(Physics))) 		
      {
         /* if (!this.isJumping) {
                
                if(this.y<platform.y && this.x>platform.x){
                     this.y = platform.y - this.renderer.height;
                }
                else if(this.y>platform.y && this.x>platform.x){
                     this.y = platform.y + platform.getComponent(Renderer).height;
                }
                if(this.x<platform.x){
                     this.x = platform.y - this.renderer.width;
                }
               
                
                
                this.isOnPlatform = true;
          }
                 * 
          */
      }
    }
    
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
      }
    }
    
    
    let velX=0;
    let velY=0;
    let velLength=1;
 

    
    if (input.isKeyDown('ArrowRight') || input.isKeyDown('KeyD') ) {
     // physics.velocity.x = 300;
     velX=300;
      this.direction = -1;
    } 
    else if (input.isKeyDown('ArrowLeft') || input.isKeyDown('KeyA')) {
          //physics.velocity.x = -300;
          velX=-300;
          this.direction = 1;
        } 
    
    
    if (input.isKeyDown('ArrowUp') || input.isKeyDown('KeyW')) {
          //physics.velocity.y = -300;
         velY=-300;
        } 
    else if (input.isKeyDown('ArrowDown') || input.isKeyDown('KeyS')) {
          //physics.velocity.y = 300;
          velY=300;
        } 
    
        if(velX !==0 || velY!==0){
            velLength =Math.sqrt(velX*velX+velY*velY);
            velX=velX/velLength;
            velY=velY/velLength;
            physics.velocity.x = 300*velX;
            physics.velocity.y = 300*velY;
        }
        else
        {
            physics.velocity.x = 0;
            physics.velocity.y = 0;
        }
        
      
    if(input.isKeyDown("MouseClicked"))
        {
            let dirX = cursor.x-this.x;
            let dirY = cursor.y-this.y;
            let dirLength =Math.sqrt(dirX*dirX+dirY*dirY);
            dirX=dirX/dirLength;
            dirY=dirY/dirLength;
            let projectile = new Projectile(this.x + (renderer.width/2) , 
            this.y + renderer.height/2, 10,10,Images.projectile1, "PlayerProjectile", dirX, dirY, 1000);
            this.game.addGameObject(projectile);
         
            
        }
    
    if(this.canDash && input.isKeyDown("Space")){
        this.x+=100*velX;
        this.y+=100*velY;
        this.canDash = false;
        setTimeout(() => {
            this.canDash = true;
          }, 1000);
        
    }
    
    
     super.update(deltaTime);


  }

}


export default Player;