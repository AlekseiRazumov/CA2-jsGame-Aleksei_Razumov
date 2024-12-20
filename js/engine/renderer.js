// Import the required modules and classes.
import Component from './component.js';
import Cursor from '../game/cursor.js'
import Game from "./game.js";
import Player from "../game/player.js";
import Enemy from "../game/enemy.js";
// The Renderer class extends Component and handles the visual representation of a game object.
class Renderer extends Component {
  // The constructor initializes the renderer component with optional color, width, height, and image.
  constructor(color = 'white', width = 50, height = 50, image = null) {
    super(); // Call the parent constructor.
    this.color = color; // Initialize the color.
    this.width = width; // Initialize the width.
    this.height = height; // Initialize the height.
    this.image = image; // Initialize the image.
  }

  // The draw method handles rendering the game object on the canvas.
  draw(ctx) {
    // If an image is provided and it has finished loading, draw the image.
    if (this.image && this.image.complete) {
      // Get the position and dimensions of the game object.
      const x = this.gameObject.x;
      const y = this.gameObject.y;
      const w = this.width;
      const h = this.height;
      
      
      
      const cursor = this.gameObject.game.gameObjects.find((obj) => obj instanceof Cursor );
      const cursorX=cursor.x;
      const cursorY=cursor.y;
      let atan = 0;
      
      if(this.gameObject instanceof Player ){
            const distanceX = x-cursorX;
            const distanceY = y-cursorY;
            const tan = distanceY/distanceX;
            atan = 0;

              if(distanceX>0){
                  atan = Math.atan(tan);
              }
              if(distanceX<0){
                   atan = (Math.atan(tan)+Math.PI);
              }
      }
      
      
      
      const player = this.gameObject.game.gameObjects.find((obj) => obj instanceof Player );
      const playerX=player.x;
      const playerY=player.y;
      if(this.gameObject instanceof Enemy){
            const distanceX = x-playerX;
            const distanceY = y-playerY;
            const tan = distanceY/distanceX;
            atan = 0;

              if(distanceX>0){
                  atan = Math.atan(tan);
              }
              if(distanceX<0){
                   atan = (Math.atan(tan)+Math.PI);
              }
      }
   
      
      // Check if the image should be flipped horizontally based on the direction of the game object.
      //const flipX = this.gameObject.direction === -1;
      
      ctx.save();
      ctx.translate((x + w/2), (y + h/2));
      if(this.gameObject instanceof Player || this.gameObject instanceof Enemy ){
      ctx.rotate(atan+Math.PI);
  }
      ctx.drawImage(this.image, -(w/2), -h/2, w, h);
      ctx.restore();
      
      
    } else {
      // If no image is provided or it has not finished loading, draw a rectangle with the specified color.
      ctx.fillStyle = this.color;
      ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height);
    }
  }
}

// The Renderer class is then exported as the default export of this module.
export default Renderer;
