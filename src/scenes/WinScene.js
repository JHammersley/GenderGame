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
          const speechBubble = this.createSpeechBox("doc", "Thanks for the payment, your results are in and it's a...");
            this.input.keyboard.once('keydown-ENTER', () => {
              speechBubble.destroy();
                const glassesBubble = this.createSpeechBox("doc", "Hold on, let me grab my glasses.");
                  this.input.keyboard.once('keydown-ENTER', () => {
                    glassesBubble.destroy();
                      const finalBubble = this.createSpeechBox("doc", "Congrats, it's a boy!");
                        this.input.keyboard.once('keydown-ENTER', () => {
                          finalBubble.destroy();
                            const bubble1 = this.createSpeechBox('Toshaface', "Yay! I'm so happy Jason! What should we name him?");
                                this.input.keyboard.once('keydown-ENTER', () => {
                                  bubble1.destroy();
                                  const bubble2 = this.createSpeechBox("jasonface", "I'm so excited! His name will be Anakin Oliver Hammersley!");
              });
            });
          });
        });
      });
  }

        createSpeechBox(characterImage, quote,  boxWidth = 400, boxHeight = 150, boxPadding = 10) {
          const mainmap = this.add.tilemap("mainmap");
          mainmap.addTilesetImage("Serene_Village_48x48", "Village");
          mainmap.createLayer("Background", ["Serene_Village_48x48"], 0, 0);
          const mainLevel_1 = mainmap.createLayer("MainLevel", ["Serene_Village_48x48"], 0, 0);
          this.events.emit("scene-awake");

          const box = this.add.container(100, 300);

          const boxBg = this.add.graphics();
          boxBg.fillStyle("#FFFFFF", 0.5);
          boxBg.fillRect(0, 0, boxWidth, boxHeight);
          box.add(boxBg);

          if (characterImage) { // if characterImage is provided, add it to the container
            const charImg = this.add.sprite(50, 75, characterImage);
            charImg.setScale(3);
            box.add(charImg);
          }

          const boxContent = this.add.text(125, 20, '', {
            fontFamily: 'Retro',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            wordWrap: { width: boxWidth - (boxPadding * 12) }
          });
          box.add(boxContent);

          const boxArrow = this.add.graphics();
          boxArrow.lineStyle(2, 0x565656, 1);
          boxArrow.fillStyle(0xffffff, 1);
          boxArrow.beginPath();
          boxArrow.lineTo(0, 0);
          boxArrow.lineTo(20, 0);
          boxArrow.lineTo(10, 10);
          boxArrow.closePath();
          boxArrow.fillPath();
          boxArrow.x = 30;
          boxArrow.y = boxHeight - 10;
          box.add(boxArrow);

          // Add typewriter effect
          let i = 0;
          let quoteLength = quote.length;
          let delay = 50;

          const typeWriter = () => {
            if (i <= quoteLength) {
              boxContent.setText(quote.substr(0, i));
              i++;
              this.time.addEvent({
                delay: delay,
                callback: typeWriter,
                callbackScope: this
              });
            } else {
              this.time.removeAllEvents();
            }
          };

          typeWriter();
          return box;
        }
      }