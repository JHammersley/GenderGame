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
          this.tosha = this.physics.add.sprite(120, 204, "toshasprite", "Tosha0000").setImmovable();


      
          // create doc animation
          var doc = this.physics.add.sprite(mainmap.getTileAt(2, 14).getCenterX(), mainmap.getTileAt(2, 14).getCenterY(), 'Doc', 6);
          doc.scaleX = 3;
          doc.scaleY = 3;

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

          this.physics.moveTo(doc, mainmap.getTileAt(2, 5).getCenterX(), mainmap.getTileAt(2, 5).getCenterY(), 100);

          doc.anims.play('up', true);

          doc.body.onCollide = true;

          this.physics.world.on('collide', function () {
            doc.setVelocity(0);
            doc.anims.play('up', true);
          }, this);
      
          // set up doc animation and speech bubbles to play after delay
          this.physics.add.collider(doc, this.tosha, () => {
              const speechBubble = this.createSpeechBubble(doc.x - 50, doc.y - 100, 250, 150, "Thanks for the payment, your results are in and it's a...");
              this.input.keyboard.once('keydown-ENTER', () => {
                speechBubble.destroy();
                const glassesBubble = this.createSpeechBubble(doc.x - 50, doc.y - 100, 250, 150, "Hold on, let me grab my glasses.");
                this.input.keyboard.once('keydown-ENTER', () => {
                  glassesBubble.destroy();
                  const finalBubble = this.createSpeechBubble(doc.x - 50, doc.y - 100, 250, 150, "Congrats, it's a boy!");
                  this.input.keyboard.once('keydown-ENTER', () => {
                    const bubble1 = this.createSpeechBubble(this.tosha.x + 30, this.tosha.y - 100, 250, 150, "Yay! I'm so happy Jason! What should we name him?");
                      bubble1.destroy();
                    this.input.keyboard.once('keydown-ENTER', () => {
                      const bubble2 = this.createSpeechBubble(this.jason.x - 80, this.jason.y - 100, 250, 150, "I'm so excited! His name will be Anakin Oliver Hammersley!");
                        bubble2.destroy();
                  });
                });
              });
            });
          });
      }
      
      createSpeechBubble (x, y, width, height, quote)
      {
          const mainmap = this.add.tilemap("mainmap");
          mainmap.addTilesetImage("Serene_Village_48x48", "Village");
          // background_1
          mainmap.createLayer("Background", ["Serene_Village_48x48"], 0, 0);
          // mainLevel_1
          const mainLevel_1 = mainmap.createLayer("MainLevel", ["Serene_Village_48x48"], 0, 0);
          this.events.emit("scene-awake");

          var bubbleWidth = width;
          var bubbleHeight = height;
          var bubblePadding = 10;
      
          var centerX1 = mainmap.getTileAt(0, 7).getCenterX();
          var centerX2 = mainmap.getTileAt(9, 7).getCenterX();
          var centerY1 = mainmap.getTileAt(0, 9).getCenterY();
          var centerY2 = mainmap.getTileAt(9, 9).getCenterY();
          
          var bubble = this.add.graphics({ centerX1 : centerX2, centerY1 : centerY2 });
          
              // Create character image sprite
          var charImage = this.add.sprite(-60, -80, "doc");
          charImage.setScale(0.8);

      
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
      
  
          //  Bubble arrow shadow
          bubble.lineStyle(4, 0x222222, 0.5);
      
          //  Bubble arrow fill
          bubble.lineStyle(2, 0x565656, 1);
      
          // Create text object
          var content = this.add.text(0, 0, '', { fontFamily: 'Arial', fontSize: 20, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });
      
          var b = content.getBounds();
      
          // Set position of text object
          content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
      
          // Add typewriter effect
          var i = 0;
          this.time.addEvent({
              delay: 50,
              callback: function() {
                  content.setText(quote.substr(0, i));
                  i++;
      
                  if (i > quote.length) {
                      this.time.removeAllEvents();
                  }
              },
              callbackScope: this,
              loop: true
          });
      
          return bubble;
      }
    }      