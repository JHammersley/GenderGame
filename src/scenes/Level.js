
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
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
		const background = mainmap.createLayer("Background", ["Serene_Village_48x48"], 0, 0);

		// mainLevel_1
		const mainLevel = mainmap_1.createLayer("MainLevel", ["Serene_Village_48x48"], 0, 0);

		// jason sprite
		const jason = this.add.sprite(48, 0, "jason", 3);
		jason.scaleX = 3;
		jason.scaleY = 3;
		jason.body.allowGravity = false;
		jason.body.collideWorldBounds = true;
		jason.body.setSize(16, 16, false);

		this.mainLevel = mainLevel;
		this.jason = jason;
		this.mainmap = mainmap;
		this.mainmap_1 = mainmap_1;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	mainLevel_1;
	/** @type {Phaser.Physics.Arcade.Sprite} */
	arcadesprite_1;
	/** @type {Phaser.Tilemaps.Tilemap} */
	mainmap;
	/** @type {Phaser.Tilemaps.Tilemap} */
	mainmap_1;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

class Player extends Phaser.Scene {
    constructor(scene, x, y, textureKey, health){
        super(scene, x, y, textureKey, 'jason')

        const animFrameRate = 10
        const anims = scene.anims
        //this.health = health
        //this.facing = 'down'

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
        this.setFrame(this.idleFrame.down)

        /////////////////
        //inputs
        // this.cursors = this.input.keyboard.createCursorKeys()
        const {LEFT,RIGHT,UP,DOWN,W,A,S,D} = Phaser.Input.Keyboard.KeyCodes
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        })
         
    }//end constructor


    update(){
        const {keys} = this //output: this.keys
        const speed = 100
        const previousVelocity = this.body.velocity.clone()

        this.body.setVelocity(0)
        //movement
        if (keys.left.isDown || keys.a.isDown) {
            this.body.setVelocityX(-speed)
        } else if (keys.right.isDown || keys.d.isDown) {
            this.body.setVelocityX(speed)
        }

        if (keys.up.isDown || keys.w.isDown) {
            this.body.setVelocityY(-speed)
        } else if (keys.down.isDown || keys.s.isDown) {
            this.body.setVelocityY(speed)
        }

        this.body.velocity.normalize().scale(speed)

        //animations
        if (keys.up.isDown || keys.w.isDown) {
            this.anims.play('up-walk', true)
        } else if (keys.down.isDown || keys.s.isDown) {
            this.anims.play('down-walk', true)
        } else
        if (keys.left.isDown || keys.a.isDown) {
            this.anims.play('left-walk', true)
        } else if (keys.right.isDown || keys.d.isDown) {
            this.anims.play('right-walk', true)
        } else {
            this.anims.stop()
        }
 
        if (this.anims.currentAnim){
            this.facing = this.anims.currentAnim.key.split('-')[1]
            // console.log(this.facing);
        }

        //set idle animations
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            //show idle anims
            if (previousVelocity.x < 0) {
                this.setFrame(this.idleFrame.left)
            } else if (previousVelocity.x > 0) {
                this.setFrame(this.idleFrame.right)
            } else if (previousVelocity.y < 0) {
                this.setFrame(this.idleFrame.up)
            } else if (previousVelocity.y > 0) {
                this.setFrame(this.idleFrame.down)
            }
        }

    }
}
