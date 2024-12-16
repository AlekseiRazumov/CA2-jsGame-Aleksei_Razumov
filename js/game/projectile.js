/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


import GameObject from "../engine/gameObject.js"
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';

import Enemy from './enemy.js';
import Platform from './platform.js';
import Player from './player.js';
class Projectile extends GameObject
{
    constructor(x,y, w, h, img, tag, dirX, dirY, speed)
    {
        super(x,y);
        this.addComponent(new Renderer('white', w, h, img));
        this.addComponent(new Physics({x:speed*dirX, y:speed*dirY}, {x:0, y:0}, {x:0,y:0}));
        this.tag = tag;
        
    }
    
    update(deltaTime)
    {
      
        if(this.x  < -1000 || this.x > 2000)
        {
          
            this.game.removeGameObject(this);
        }
        
        const objs = this.game.gameObjects.filter( (obj) => 
            (obj instanceof Enemy || obj instanceof Platform|| obj instanceof Player));
        for(let o of objs)
        {
          
            if(this.getComponent(Physics).isColliding(o.getComponent(Physics)))
            {
                
                if (this.tag==="PlayerProjectile" && o instanceof Enemy){   
                    o.hit();
                    this.game.removeGameObject(this);
                }
                else if (this.tag==="EnemyProjectile" && o instanceof Player){   
                    o.collidedWithEnemy();
                    this.game.removeGameObject(this);
                }
                else if(o instanceof Platform)
                     this.game.removeGameObject(this);
                
                
            }
        }
        
        super.update(deltaTime);
    }
}

export default Projectile;