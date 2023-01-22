class Level extends Phaser.Scene {

debugger;

    /** @type {Phaser.Tilemaps.TilemapLayer} */
	mainLevel_1;
	/** @type {Phaser.Physics.Arcade.Sprite} */
	jason;
	/** @type {Phaser.Tilemaps.Tilemap} */
	mainmap;
	/** @type {Phaser.Tilemaps.Tilemap} */
	mainmap_1;

	constructor() {
		super("Level");
	}

	/** @returns {void} */
	editorCreate() {

		// mainmap
		const mainmap = this.add.tilemap("mainmap");
		mainmap.addTilesetImage("Serene_Village_48x48", "Village");

		// mainmap_1
		const mainmap_1 = this.add.tilemap("mainmap");
		mainmap_1.addTilesetImage("Serene_Village_48x48", "Village");

		// background_1
		mainmap.createLayer("Background", ["Serene_Village_48x48"], 0, 0);

		// mainLevel_1
		const mainLevel_1 = mainmap_1.createLayer("MainLevel", ["Serene_Village_48x48"], 0, 0);

		this.events.emit("scene-awake");
	}

	create() {
        this.editorCreate();

			// jason
			this.jason = this.physics.add.sprite(170, 266, "jason", 0);
			this.jason.scaleX = 3;
			this.jason.scaleY = 3;
			this.jason.body.setSize(16, 16, false);
	
			this.physics.world.enableBody(this.jason);
			this.cursors = this.input.keyboard.createCursorKeys();
			
			// Create animations from the jason spritesheet
			this.anims.create({
				key: "jason-walk-up",
				frames: this.anims.generateFrameNames("jason", {start: 9, end: 11, zeroPad: 2, prefix: "jason"}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: "jason-walk-left",
				frames: this.anims.generateFrameNames("jason", {start: 3, end: 5, zeroPad: 2, prefix: "jason"}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: "jason-walk-right",
				frames: this.anims.generateFrameNames("jason", {start: 6, end: 8, zeroPad: 2, prefix: "jason"}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: "jason-walk-down",
				frames: this.anims.generateFrameNames("jason", {start: 0, end: 2, zeroPad: 2, prefix: "jason"}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: "jason-idle-down",
				frames: [{ key: "jason", frame: "jason00" }],
				repeat: -1
			});

						//this.jason.anims.play("jason-idle-down");

						//this.setFrame(this.idleFrame.down)

						// Set up player input
					
				}

    update() {
		if (this.cursors.up.isDown) {
			this.jason.setVelocityY(-200); // move up
			this.jason.anims.play("jason-walk-up");
		} else if (this.cursors.down.isDown) {
			this.jason.setVelocityY(200); // move down
			this.jason.anims.play("jason-walk-down");
		} else if (this.cursors.left.isDown) {
			this.jason.setVelocityX(-200); // move left
			this.jason.anims.play("jason-walk-left");
		} else if (this.cursors.right.isDown) {
			this.jason.setVelocityX(200); // move right
			this.jason.anims.play("jason-walk-right");
		} //else {
			//this.jason.anims.play("jason-idle-down");
			//this.jason.setVelocityX(0);
			//this.jason.setVelocityY(0);
		//}
	}	
}