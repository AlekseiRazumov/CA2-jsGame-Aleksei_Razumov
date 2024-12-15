// Import the Level class from './game/level.js'.
import Level from './game/level.js';
import LoadingScreen from './game/loadingScreen.js';

// Create a new instance of the Level class with 'gameCanvas' as the canvas ID.
const menu = new LoadingScreen('gameCanvas');
//const game = new Level('gameCanvas');

// Start the game by calling the start method of the Level instance.
menu.start();
