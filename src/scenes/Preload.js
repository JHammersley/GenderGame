export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

	}

	/** @returns {void} */
	editorPreload() {
		//this.load.pack("asset-pack", "assets/preload-asset-pack.json");
		//this.load.pack("asset-pack", "assets/asset-pack.json");

	}
	/** @returns {void} */
	editorCreate() {

	}


	preload() {

		this.editorPreload();
		//this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');    
		//this.load.script('rexdialogquest', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdialogquest.min.js');
		//this.load.plugin('DialogModalPlugin', '../Components/dialog_plugin.js');
		this.load.pack("pack", "assets/preload-asset-pack.json");
		this.load.atlas('jasonsprite', '../assets/jasonsprite.png','../assets/jasonsprite.json');
		this.load.atlas('toshasprite', '../assets/toshasprite.png','../assets/toshasprite.json');
		this.load.image('Toshaface', 'assets/Tosha/Toshaface.png');
		this.load.atlas('food', 'assets/Game_Items/items.png','assets/Game_Items/items.json');
		this.load.atlas('fooditemstest', 'assets/Game_Items/fooditems.png','assets/Game_Items/fooditems.json');
		//this.load.image('object_tiles', 'assets/Game_Items/items.png');
		// load the PNG file
		this.load.image('base_tiles', 'assets/Village.png');
		// load the JSON file
		this.load.tilemapTiledJSON('tilemap', 'assets/mainmap.json');
		this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();
		var progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
		var progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(progressBar);

		this.newGraphics.fillStyle(0x3587e2, 1);
		this.newGraphics.fillRectShape(progressBarFill);

		var loadingText = this.add.text(250,260,"Loading: ", { fontSize: '32px', fill: '#FFF' });


		this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics,loadingText:loadingText});
		this.load.on('complete', this.complete, {scene:this.scene});

		// Any Assets you want to load in
		this.load.image('background', 'assets/background.png');
		for(var i =0;i<30;i++) {
			this.load.image('background_'+i, 'assets/background.png');
		}
	}

	updateBar(percentage) {
		if(this.newGraphics) {
			this.newGraphics.clear();
			this.newGraphics.fillStyle(0x3587e2, 1);
			this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage*390, 40));
		}
		percentage = percentage * 100;
		this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
		console.log("P:" + percentage);
	}

	complete() {
		console.log("COMPLETE!");
		this.scene.start("Level");
	}

}