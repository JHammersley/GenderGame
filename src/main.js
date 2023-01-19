window.addEventListener('load', function () {

	var game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 800,
	height: 600,
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
});

game.scene.add("Preload", Preload);
game.scene.add("Level", Level);
game.scene.start("Preload");
game.scene.start("Level"); // start the Level scene
});
