// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(),
  enemy2: new Image(),
  collectible: new Image(),// The Image instance for the enemy.
  projectile1: new Image()
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jump.mp3', // The file path of the jump sound.
  collect: './resources/audio/collect.mp3' // The file path of the collect sound.
  // Add more audio file paths as needed
};

// Set the source of the player image.
Images.player.src = './resources/images/player/player.png'; // Update the image path

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/zombie.png'; // Update the image path
Images.enemy2.src = './resources/images/enemy/zombie_type2.png'; // Update the image path
Images.collectible.src = "./resources/images/collectible/star.png";
Images.projectile1.src = "./resources/images/player/Snowball.png";
// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
