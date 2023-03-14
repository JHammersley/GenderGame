import Preload from '/src/scenes/Preload.js';
import TitleScene from '/src/scenes/TitleScene.js';
import Level from '/src/scenes/Level.js';
import WinScene from '/src/scenes/WinScene.js';


//Load our scenes
var preload = new Preload();
var titlescene = new TitleScene();
var level = new Level ();
var winscene = new WinScene();

// game scene
var config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	scene: [TitleScene, Level, WinScene],
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
game.scene.add("WinScene", winscene);
game.scene.add("TitleScene", titlescene);




//start Preload
game.scene.start('Preload');