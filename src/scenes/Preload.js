class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");

	}
	/** @returns {void} */
	editorCreate() {

		// progress
		const progress = this.add.text(400, 349, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.text = "0%";
		progress.setStyle({ "fontSize": "30px" });

		// progress (components)

		this.events.emit("scene-awake");
	}


	preload() {

		this.editorPreload();
		this.load.pack("pack", "assets/preload-asset-pack.json");
		this.load.atlas('jason', '../assets/jasonsprite.png','../assets/jasonsprite.json');
		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
		
		this.jason
	}

}