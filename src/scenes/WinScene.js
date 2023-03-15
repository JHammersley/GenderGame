export default class WinScene extends Phaser.Scene {

   /** @type {Phaser.Tilemaps.TilemapLayer} */
	mainLevel_1;
	/** @type {Phaser.Physics.Arcade.Sprite} */
	jason;
	/** @type {Phaser.Tilemaps.Tilemap} */
	mainmap;
	/** @type {Phaser.Tilemaps.Tilemap} */
	mainmap_1;
	/** @type {Phaser.Physics.Arcade.Sprite} */
    tosha;
	/** @type {Phaser.Sound.WebAudioSoundManager#play} */
	backgroundMusic;

  
    constructor() {
      super({ key: 'WinScene' });
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

      
          // create doc animation
          var doc = this.physics.add.sprite(192, 576, 'Doc', 6).setScale(2);

          this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('Doc', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
          });

          this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('Doc', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
          });

          this.physics.moveTo(doc, 48, 192, 100);

          doc.anims.play('right', true);

          doc.body.onCollide = true;

          this.physics.world.on('collide', function () {
            doc.setVelocity(0);
            doc.anims.play('up', true);
          }, this);
      
          // set up doc animation and speech bubbles to play after delay
          this.time.delayedCall(5000, () => {
            doc.anims.play('stop');
            this.time.delayedCall(5000, () => {
              const speechBubble = this.createSpeechBubble(doc.x - 50, doc.y - 100, 250, 150, "Thanks for the payment, your results are in and it's a...");
              this.input.keyboard.once('keydown-ENTER', () => {
                speechBubble.destroy();
                const glassesBubble = this.createSpeechBubble(doc.x - 50, doc.y - 100, 250, 150, "Hold on, let me grab my glasses.");
                this.input.keyboard.once('keydown-ENTER', () => {
                  glassesBubble.destroy();
                  const finalBubble = this.createSpeechBubble(doc.x - 50, doc.y - 100, 250, 150, "Congrats, it's a boy!");
                  this.input.keyboard.once('keydown-ENTER', () => {
                    const bubble1 = this.createSpeechBubble(tosha.x + 30, tosha.y - 100, 250, 150, "Yay! I'm so happy Jason! What should we name him?");
                    this.input.keyboard.once('keydown-ENTER', () => {
                      const bubble2 = this.createSpeechBubble(jason.x - 80, jason.y - 100, 250, 150, "I'm so excited! His name will be Anakin Oliver Hammersley!");
                  });
                });
              });
            });
          });
        });
      }
      
        createSpeechBubble(x, y, width, height, text) {
          const bubble = this.add.graphics({ x: x, y: y });
      
          // set bubble color and stroke
          bubble.fillStyle(0xffffff, 1);
          bubble.lineStyle(4, 0x000000, 1);
      
          // draw bubble shape
          bubble.beginPath();
          bubble.moveTo(0, 20);
          bubble.lineTo(0, height);
          bubble.lineTo(width, height);
          bubble.lineTo(width, 20);
          bubble.lineTo(width / 2 + 20, 20);
          bubble.lineTo(width / 2, 0);
          bubble.lineTo(width / 2 - 20, 20);
          bubble.lineTo(0, 20);
          bubble.closePath();
          bubble.strokePath();
          bubble.fillPath();
      
          // add text to bubble
          const content = this.add.text(x + 10, y + 30, text, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#000000'
          });
          content.setWordWrapWidth(width - 20);
      
          return bubble;
        }
      }