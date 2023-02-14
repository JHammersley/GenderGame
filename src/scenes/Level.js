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
	/** @type {Phaser.Physics.Arcade.Sprite} */
    food;

	collectMoney(jason, money) {
		money.destroy();
		this.moneyScore ++;
		console.log(`Money Score: ${this.moneyScore}`);
	}
	
	collectFood(jason, food) {
		food.destroy();
		this.foodScore += 1;
		console.log(`Food Score: ${this.foodScore}`);
	}

	interact(jason, tosha) {
		const dialogue = ["Hi, I'm Tosha.", "How can I help you today?"];
		let currentDialogue = 0;
		
		const dialogueBox = this.add.rectangle(0, 0, 300, 60, 0x000000).setOrigin(0);
		const text = this.add.text(10, 10, dialogue[currentDialogue], { font: "20px Arial", fill: "#ffffff" });
		
		this.input.keyboard.once("keydown_SPACE", () => {
			currentDialogue++;
			
			if (currentDialogue >= dialogue.length) {
				dialogueBox.destroy();
				text.destroy();
				return;
			}
			
			text.setText(dialogue[currentDialogue]);
		});
	}


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
			// background_1
			mainmap.createLayer("Background", ["Serene_Village_48x48"], 0, 0);
			// mainLevel_1
			const mainLevel_1 = mainmap.createLayer("MainLevel", ["Serene_Village_48x48"], 0, 0);
			this.events.emit("scene-awake");

			//money layer
			const Money = mainmap.createFromObjects('Money', {key: 'Money', Frame:'items0000.png'});
			const food = mainmap.createFromObjects('food', {key: 'food'});
			const foodFrames = this.textures.get("food").getFrameNames("food", {start: 1, end: 13, zeroPad: 4, prefix: "items", suffix: ".png"});
			food.forEach((foodItem, index) => {
			  const randomIndex = Phaser.Math.Between(0, foodFrames.length - 1);
			  const randomFrame = foodFrames[randomIndex];
			  foodItem.setFrame(randomFrame);
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
			this.tosha = this.physics.add.sprite(120, 204, "toshasprite", "Tosha0000").setImmovable();
			this.tosha.scaleX = 3;
			this.tosha.scaleY = 3;
			this.tosha.body.setSize(16, 16, false);
			this.physics.add.collider(this.jason, this.tosha, this.interact, null, this);

			//money
			this.moneyScore = 0;
			this.Money = this.physics.add.staticGroup(Money)
			this.Money.scaleX = 3;
			this.Money.scaleX = 3;
			this.physics.add.collider(this.jason, this.Money, this.collectMoney, null, this);

			//items
			this.foodScore = 0;
			this.food = this.physics.add.staticGroup(food);
			this.food.scaleX = 3;
			this.food.scaleY = 3;
			this.physics.add.collider(this.jason, this.food, this.collectFood, null, this);



			//collisons
			this.physics.add.overlap(this.jason, this.Money);
			this.physics.add.overlap(this.jason, this.food);
			  		
			this.moneyText = this.add.text(16, 16, "Money: 0", { fontSize: "32px", fill: "#000" });
  			this.foodText = this.add.text(16, 48, "Food: 0", { fontSize: "32px", fill: "#000" });
			this.foodText.setScrollFactor(0);
			this.moneyText.setScrollFactor(0);

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


		//Music
		//var music;
		//var musicList = ['Happy Trails higher.wav', 'River 6-29.wav', 'Up a Tree.wav'];
		//var currentTrack = 0;
		//		this.music = audio('Happy Trails higher');
		//		this.music.volume = 0.5;
		//		this.music.play();
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

	//music 
	//	if (!music.isPlaying) {
	//		currentTrack++;
	//		if (currentTrack >= musicList.length) {
	//			currentTrack = 0;
	//		}
	//		music.destroy();
	//		music = add.audio(musicList[currentTrack].split('.')[0]);
	//		music.play();
	//	}

		this.physics.add.collider(this.jason, this.Money, this.collectMoney, null, this);
		this.physics.add.collider(this.jason, this.food, this.collectFood, null, this);
		this.moneyText.setText(`Money: ${this.moneyScore}`);
  		this.foodText.setText(`Food: ${this.foodScore}`);

	}
	
}