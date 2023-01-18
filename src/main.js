window.addEventListener('load', function () {

	var gender = new Phaser.Game({
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
	},
	scene: [Preload, MainGame]
});

});
