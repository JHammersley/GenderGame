export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
  }

  preload() {
  }

  create() {

    // Set the background color to white
    this.cameras.main.setBackgroundColor("#ffffff");

    // Add the instructions text
    const instructions = this.add.text(this.game.config.width / 2, 100, "Instructions:\n\nUse arrow keys to move around!\nTalk to Tosha first then collect all the items\nand return to Tosha once you think you've collected them all!", { 
      fontFamily: "Retro",
      fontSize: "24px",
      color: "#000000",
      align: "center"
    });
    instructions.setOrigin(0.5, 0.5);

    // Add the "Press Enter to Start" text
    const pressEnter = this.add.text(this.game.config.width / 2, this.game.config.height - 100, "Press Enter to Start", {
      fontFamily: "Retro",
      fontSize: "58px",
      color: "#000000",
      align: "center"
    });
    pressEnter.setOrigin(0.5, 0.5);

    // Add the Enter key to start the level
    this.input.keyboard.on("keydown-ENTER", () => {
      this.scene.start("Level");
    });
  }
}