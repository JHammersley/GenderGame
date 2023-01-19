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
		this.load.spritesheet('jason', '../assets/jason-1.png',{
			frameWidth: 16,
			frameHeight: 16
			});
		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
		
		this.jason
	}


    create() {
        this.editorCreate();

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
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set up initial velocity and animation
    //this.jason.anims.play("down-walk", true);

    // Listen for player input and update velocity and animation accordingly
    this.input.keyboard.on("keydown_UP", event => {
        this.jason.setVelocityY(-100);
        this.jason.anims.play("up-walk", true);
    });
    this.input.keyboard.on("keydown_DOWN", event => {
        this.jason.setVelocityY(100);
        this.jason.anims.play("down-walk", true);
    });
    this.input.keyboard.on("keydown_LEFT", event => {
        this.jason.setVelocityX(-100);
        this.jason.anims.play("left-walk", true);
    });
    this.input.keyboard.on("keydown_RIGHT", event => {
        this.jason.setVelocityX(100);
        this.jason.anims.play("right-walk", true);
    });
}
}