export default class Level extends Phaser.Scene {

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
	}

	create() {
        this.editorCreate();
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
		
			//map collison
			mainmap_1.setCollisionByProperty({collides: true});

			const debugGraphics = this.add.graphics().setAlpha(0.75);
				mainmap_1.renderDebug(debugGraphics, {
				tileColor: null, // Color of non-colliding tiles
				collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
				faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
});

			// jason
			this.jason = this.physics.add.sprite(170, 266, "jasonsprite", "jason0003");
			this.jason.scaleX = 3;
			this.jason.scaleY = 3;
			this.jason.body.setSize(16, 16, false);
	
			this.physics.world.enableBody(this.jason);
			this.physics.add.collider(this.jason, mainmap_1);
			this.jason.body.collideWorldBounds=true;
			this.cursors = this.input.keyboard.createCursorKeys();
			//camera settings
			this.cameras.main.setBounds(0, 0, 2160, 912);
			this.cameras.main.startFollow(this.jason, true);
			this.cameras.main.setZoom(1);

			
			// Create animations from the jason spritesheet
			this.anims.create({
				key: "jason-walk-up",
				frames: this.anims.generateFrameNames("jasonsprite", {start: 6, end: 8, zeroPad: 4, prefix: "jason"}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: "jason-walk-left",
				frames: this.anims.generateFrameNames("jasonsprite", {start: 0, end: 2, zeroPad: 4, prefix: "jason"}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: "jason-walk-right",
				frames: this.anims.generateFrameNames("jasonsprite", {start: 9, end: 11, zeroPad: 4, prefix: "jason"}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: "jason-walk-down",
				frames: this.anims.generateFrameNames("jasonsprite", {start: 3, end: 5, zeroPad: 4, prefix: "jason"}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: "jason-idle-down",
				frames: [{ key: "jasonsprite", frame: "jason0003" }],
				repeat: -1
			});

						//this.jason.anims.play("jason-idle-down");

						//this.setFrame(this.idleFrame.down)

						// Set up player input
					
				}

    update() {
		if (this.cursors.up.isDown) {
			this.jason.setVelocityY(-100); // move up
			this.jason.anims.play("jason-walk-up", true);
		} else if (this.cursors.down.isDown) {
			this.jason.setVelocityY(100); // move down
			this.jason.anims.play("jason-walk-down", true);
		} else if (this.cursors.left.isDown) {
			this.jason.setVelocityX(-100); // move left
			this.jason.anims.play("jason-walk-left", true);
		} else if (this.cursors.right.isDown) {
			this.jason.setVelocityX(100); // move right
			this.jason.anims.play("jason-walk-right", true);
		} else {
			this.jason.anims.play("jason-idle-down");
			this.jason.setVelocityX(0);
			this.jason.setVelocityY(0);
		}
	}	
}