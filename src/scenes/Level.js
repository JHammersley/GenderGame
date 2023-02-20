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
	/** @type {Phaser.Sound.WebAudioSoundManager#play} */
	backgroundMusic;

	collectMoney(jason, money) {
		money.destroy();
		this.moneyScore ++;
		this.fixedToCamera = true;
		console.log(`Money Score: ${this.moneyScore}`);
	}
	
	collectFood(jason, food) {
		food.destroy();
		this.foodScore += 1;
		this.fixedToCamera = true;
		console.log(`Food Score: ${this.foodScore}`);
	}

	checkWinCondition() {
		const totalCollected = this.moneyScore + this.foodScore;
		if (totalCollected === this.totalItems) {
		  console.log("You win!");
		}
	}

	createSpeechBubble (x, y, width, height, quote)
{
    var bubbleWidth = width;
    var bubbleHeight = height;
    var bubblePadding = 10;
    var arrowHeight = bubbleHeight / 3;

    var bubble = this.add.graphics({ x: x, y: y });

    //  Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    var point1X = Math.floor(bubbleWidth / 4);
    var point1Y = bubbleHeight;
    var point2X = Math.floor((bubbleWidth / 4) * 1.4);
    var point2Y = bubbleHeight;
    var point3X = Math.floor(bubbleWidth / 4);
    var point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  Bubble arrow shadow
    bubble.lineStyle(4, 0x222222, 0.5);
    bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0x565656, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);

    var content = this.add.text(0, 0, quote, { fontFamily: 'Arial', fontSize: 20, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });

    var b = content.getBounds();

    content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));

    var container = this.add.container();

    container.add([ bubble, content ]);

    return container;
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
			this.cameras.main.setBounds(0, 0, mainmap.widthInPixels, mainmap.heightInPixels);
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
			this.physics.add.collider(this.jason, this.tosha, this.bubble1, null, this);

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
			// Check for collisions between jason and tosha
			this.physics.add.collider(this.jason, this.tosha, () => {
				// When they collide, create a speech bubble with the quote "Hi, Tosha!"
				this.createSpeechBubble(this.tosha.x, this.tosha.y - 50, 200, 100, "Hi, Tosha!"),null,this
			});

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

			var musicFiles = [    'Song1',    'Song2',    'Song3'];

			var currentMusicIndex = 0;

			var playNextSong = function(game) {
				if (currentMusicIndex >= musicFiles.length) {
					return; // Stop playing when all songs have been played
				}

				var music = game.sound.add(musicFiles[currentMusicIndex], {
					volume: 0.1
				});

				music.once('ended', function() {
					music.destroy();
					currentMusicIndex++;
					playNextSong(this);
				});

				music.play();
			}

			playNextSong(this);


			var bubble1 = this.createSpeechBubble(128, 128, 220, 80, "Global Handler!");
			var bubble2 = this.createSpeechBubble(290, 180, 220, 80, "Global Key Code!");
			var bubble3 = this.createSpeechBubble(560, 180, 220, 80, "Local Handler!");

			bubble1.setVisible(false);
			bubble2.setVisible(false);
			bubble3.setVisible(false);

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

		this.physics.add.collider(this.jason, this.Money, this.collectMoney, null, this);
		this.physics.add.collider(this.jason, this.food, this.collectFood, null, this);
		this.moneyText.setText(`Money: ${this.moneyScore}`);
  		this.foodText.setText(`Food: ${this.foodScore}`);
		this.checkWinCondition();

	}
	
}