class Level extends Phaser.Scene {

bugger;

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
			const jason = this.physics.add.sprite(170, 266, "jason", 3);
			jason.scaleX = 3;
			jason.scaleY = 3;
			jason.body.setSize(16, 16, false);
	
			this.physics.world.enableBody(jason);
			this.cursors = this.input.keyboard.createCursorKeys();

        //Jason Walking Animations Create//
        const animFrameRate = 10
        const anims = this.anims

        anims.create({
            key: "down-walk",
            type: "frame",
            frames:(
                {
                    key: "jason",
                    frame: 3,
                    duration: 0,
                    keyframe: false
                },
                {
                    key: "jason",
                    frame: 6,
                    duration: 0,
                    keyframe: false
                },
                {
                    key: "jason",
                    frame: 7,
                    duration: 0,
                    keyframe: false
                }
             ),
            frameRate: animFrameRate,
            repeat: -1
            })

        anims.create({
            key: "up-walk",
            type: "frame",
            frames:(
                {
                    key: "jason",
                    frame: 4,
                    duration: 0,
                    keyframe: false
                },
                {
                    key: "jason",
                    frame: 8,
                    duration: 0,
                    keyframe: false
                },
                {
                    key: "jason",
                    frame: 9,
                    duration: 0,
                    keyframe: false
                }
                ),
            frameRate: animFrameRate,
            repeat: -1
            })

         anims.create({
            key: "left-walk",
            type: "frame",
            frames:(
                {
                    key: "jason",
                    frame: 2,
                    duration: 0,
                    keyframe: false
                },
                {
                    key: "jason",
                    frame: 1,
                    duration: 0,
                    keyframe: false
                },
                {
                    key: "jason",
                    frame: 0,
                    duration: 0,
                    keyframe: false
                }
                ),
            frameRate: animFrameRate,
            repeat: -1
            })
            anims.create({
                key: "right-walk",
                type: "frame",
                frames:(
                    {
                        key: "jason",
                        frame: 5,
                        duration: 0,
                        keyframe: false
                    },
                    {
                        key: "jason",
                        frame: 10,
                        duration: 0,
                        keyframe: false
                    },
                    {
                        key: "jason",
                        frame: 11,
                        duration: 0,
                        keyframe: false
                    }
                    ),
                frameRate: animFrameRate,
                repeat: -1
                })
        this.idleFrame = {
            down: 3,
            left: 2,
            right:5,
            up: 4
        }
        //this.setFrame(this.idleFrame.down)

        // Set up player input
    
}

    update(){
		if (this.cursors.left.isDown) {
			this.jason.setVelocity(-160);
			this.jason.anims.play('left-walk', true);
		} else if (this.cursors.right.isDown) {
			this.jason.setVelocity(160);
			this.jason.anims.play('right-walk', true);
		} else if (this.cursors.up.isDown) {
			this.jason.setVelocity(-160);
			this.jason.anims.play('up-walk', true);
		} else if (this.cursors.down.isDown) {
			this.jason.setVelocity(160);
			this.jason.anims.play('down-walk', true);
		}
	}
}