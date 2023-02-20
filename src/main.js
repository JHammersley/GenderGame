import Preload from '/src/scenes/Preload.js';
import Level from '/src/scenes/Level.js';

//Load our scenes
var preload = new Preload();
var level = new Level ();

// game scene
var config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: { y: 0 }
		}
	}
};
var game = new Phaser.Game(config);

// Load Scenes
game.scene.add("Preload", preload);
game.scene.add("Level", level);


//start Preload
game.scene.start('Preload');