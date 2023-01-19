class Level extends Phaser.Scene {

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

		// jason
		const jason = this.physics.add.sprite(170, 266, "jason", 3);
		jason.scaleX = 3;
		jason.scaleY = 3;
		jason.body.setSize(16, 16, false);

        this.physics.world.enableBody(jason);

		this.events.emit("scene-awake");
	}

    create() {
        this.editorCreate();

}

    updatejason(){
    if (this.cursors.up.isDown) {
        jason.setVelocityY(-160);
        jason.anims.play("up-walk", true);
    }
    else if (this.cursors.down.isDown) {
        jason.setVelocityY(160);
        jason.anims.play("down-walk", true);
    }
    else if (this.cursors.left.isDown) {
        jason.setVelocityX(-160);
        jason.anims.play("left-walk", true);
    }
    else if (this.cursors.right.isDown) {
        jason.setVelocityX(160);
        jason.anims.play("right-walk", true);
    }

    }
}