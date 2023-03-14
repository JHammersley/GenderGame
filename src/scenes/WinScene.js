export default class WinScene extends Phaser.Scene {
    constructor() {
      super({ key: 'WinScene' });
    }
  
    create() {
      // create background
      this.add.image(0, 0, 'background').setOrigin(0);
  
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
  
      // create Tosha and Jason sprites
      const tosha = this.add.sprite(200, 200, 'tosha');
      const jason = this.add.sprite(400, 200, 'jason');
  
      // add chat bubbles
      const bubble1 = this.createSpeechBubble(tosha.x + 30, tosha.y - 100, 250, 150, "Yay! I'm so happy Jason! What should we name him?");
      const bubble2 = this.createSpeechBubble(jason.x - 80, jason.y - 100, 250, 150, "I'm so excited! His name will be Anakin Oliver Hammersley!");
  
      // set up doc animation and speech bubbles to play after delay
      this.time.delayedCall(5000, () => {
        doc.anims.play('stop');
        this.time.delayedCall(2000, () => {
          const speechBubble = this.createSpeechBubble(doc.x - 50, doc.y - 100, 250, 150, "Thanks for the payment, your results are in and it's a...");
          this.time.delayedCall(3000, () => {
            speechBubble.destroy();
            const glassesBubble = this.createSpeechBubble(doc.x - 50, doc.y - 100, 250, 150, "Hold on, let me grab my glasses.");
            this.time.delayedCall(10000, () => {
              glassesBubble.destroy();
              const finalBubble = this.createSpeechBubble(doc.x - 50, doc.y - 100, 250, 150, "Congrats, it's a boy!");
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
  