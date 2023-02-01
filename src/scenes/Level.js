export default class Level extends Phaser.Scene {

    /** @type {Phaser.Tilemaps.TilemapLayer} */
	mainLevel_1;
	/** @type {Phaser.Tilemaps.ObjectLayer} */
	MoneyLayer;
	/** @type {Phaser.Tilemaps.ObjectLayer} */
	foodlayer;
	/** @type {Phaser.Physics.Arcade.Sprite} */
	jason;
	/** @type {Phaser.Tilemaps.Tilemap} */
	mainmap;
	/** @type {Phaser.Tilemaps.Tilemap} */
	mainmap_1;
	/** @type {Phaser.Physics.Arcade.Sprite} */
    tosha;

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
			mainmap.addTilesetImage("items","items")
			// background_1
			mainmap.createLayer("Background", ["Serene_Village_48x48"], 0, 0);
			// mainLevel_1
			const mainLevel_1 = mainmap.createLayer("MainLevel", ["Serene_Village_48x48"], 0, 0);
			this.events.emit("scene-awake");
			//money layer
			const MoneyLayer = mainmap.createFromTiles('Money', {key: 'items', frames: {start: 0, end: 0, zeroPad: 4, prefix: "items"} });
			const foodlayer = mainmap.createFromTiles('food', {key: 'fooditems', frames: {start: 0, end: 12, zeroPad: 4, prefix: "items"} });

			foodlayer.forEach((food) => {
			  food.setPosition(food.x, food.y);
			});


			// jason
			this.jason = this.physics.add.sprite(170, 266, "jasonsprite", "jason0003");
			this.jason.scaleX = 3;
			this.jason.scaleY = 3;
			this.jason.body.setSize(16, 16, false);

			//camera settings
			this.cameras.main.startFollow(this.jason, true);
			this.cameras.main.setZoom(1);
	
			this.physics.add.collider(this.jason, mainLevel_1);
			this.physics.world.setBounds(0, 0, mainLevel_1.width, mainLevel_1.height);
			mainLevel_1.setCollisionByProperty({collides: true});
			this.jason.setCollideWorldBounds(true);
			
			this.jason.body.onWorldBounds = true;

			this.cursors = this.input.keyboard.createCursorKeys();

			//tosha
			this.tosha = this.physics.add.sprite(120, 204, "toshasprite", "Tosha0000");
			this.tosha.scaleX = 3;
			this.tosha.scaleY = 3;
			this.tosha.body.setSize(16, 16, false);
			this.physics.add.collider(this.jason, this.tosha, this.interact, null, this);

			//money
			let moneyScore = 0;
			this.money = this.physics.add.staticGroup()
			//this is how we actually render our coin object with coin asset we loaded into our game in the preload function
			MoneyLayer.forEach(object => {
			this.money.create('cash'); 
			this.money.scaleX = 3;
			this.money.scaleX = 3
			});

			this.physics.add.collider(this.jason, this.money);

			//items
			this.food = this.physics.add.staticGroup()
			//this is how we actually render our coin object with coin asset we loaded into our game in the preload function
			foodlayer.forEach(object => {
			this.food.create('food'); 
			this.food.scaleX = 3;
			this.food.scaleY = 3
			});
			this.physics.add.collider(this.jason, this.food);

			//collisons
			this.physics.add.overlap(this.jason, this.money, collectMoney, null, this);
		
			//score
			this.text = this.add.text(570, 70, `Money: ${moneyScore}x`, {
			  fontSize: '20px',
			  fill: '#ffffff'
			});
			this.text.setScrollFactor(0);

			//animations	
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

			function collectMoney() {
				this.money.disableBody(true, true); // remove the tile/coin
				moneyScore += 20000; // increment the score
				this.text.setText(`Money: ${moneyScore}x`); // set the text to show the current score
				return false;
			}
		
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