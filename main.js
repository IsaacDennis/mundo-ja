let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [MenuScene, ProgramsScene, GameFinishedScene, Scene5, Scene2,  ChoiceScene, GameOverScene, Scene4, Scene3, Scene1, CreditsScene, TutorialScene],
  parent: "phaser-div",
  dom: {
    createContainer: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  }
};



const game = new Phaser.Game(config);

