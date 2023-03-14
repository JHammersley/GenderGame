export default class TitleScene extends Phaser.Scene {
    constructor() {
      super({ key: "TitleScene" });
    }

    preload() {
      this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
  
    create() {
      WebFont.load({
        google: {
          families: ["VT323"]
        },
        active: () => {
          // Set the text style using the loaded font
          const textStyle = {
            fontFamily: "VT323",
          };
        }
      });

      // Set the background color to white
      this.cameras.main.setBackgroundColor("#ffffff");
  
      // Add the instructions text
      const instructions = this.add.text(this.game.config.width / 2, 100, "Instructions:\n\nUse arrow keys to move around!\nTalk to Tosha first then collect all the items\nand return to Tosha once you think you've collected them all!", { 
        font: "24px textStyle",
        fill: "#000000",
        align: "center"
      });
      instructions.setOrigin(0.5, 0.5);
  
      // Add the "Press Enter to Start" text
      const pressEnter = this.add.text(this.game.config.width / 2, this.game.config.height - 100, "Press Enter to Start", {
        font: "58px textStyle",
        fill: "#000000",
        align: "center"
      });
      pressEnter.setOrigin(0.5, 0.5);
  
      // Add the Enter key to start the level
      this.input.keyboard.on("keydown-ENTER", () => {
        this.scene.start("Level");
      });
    }
  }
  