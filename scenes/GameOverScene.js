class GameOverScene extends GameScene {
  constructor() {
    super("GameOverScene");
  }

  preload() {
    this.load.audio("game-over", ["assets/music/game-over.mp3"])
  }

  create() {
    const titleElement = this.createTitle("Marcelo desistiu de ir à escola definitivamente. Totalmente desmotivado, o seu futuro agora é incerto. \n\nEscolhas diferentes apresentam histórias alternativas.");
    const repeatText = this.ui.centralizedText("Você quer repetir a fase?").setY(250).setVisible(false);
    const yesFunction = () => {
      this.sceneTransition("Scene1");
    }
    const noFunction = () => {
      this.sceneTransition("CreditsScene");
    }
    const choiceButtons = this.createChoiceButtons("Sim", "Não", yesFunction, noFunction).setVisible(false)
    this.cameras.main.fadeIn(4000);
    const music = this.sound.add("game-over");
    music.play();
    music.on('complete', () => {
      repeatText.setVisible(true);
      choiceButtons.setVisible(true);
    })
  }

  update() {

  }
  createChoiceButtons(text1, text2, clickFunction1, clickFunction2){
    const button1 = this.ui.textButton(0, 350, text1).setWordWrapWidth(100);
    const button2 = this.ui.textButton(0, 350, text2).setWordWrapWidth(100);
    button1.on('pointerdown', clickFunction1);
    button2.on('pointerdown', clickFunction2);
    const freeWidth = 800 - (button1.displayWidth +  button2.displayWidth);
    const sizeDiff = Math.abs(button1.displayWidth - button2.displayWidth);
    button1.setX(freeWidth / 4 - sizeDiff);
    button2.setX(800 - freeWidth / 4);
    const buttonsGroup = this.add.group([button1, button2]);
    return buttonsGroup;
  }
  createTitle(text){
    const titleElement = this.add.text(0, 100, text, {
      align: "center",
      fontFamily: "RetroFont"
    }).setWordWrapWidth(780);
    const freeWidth = 800 - titleElement.displayWidth;
    titleElement.setX(freeWidth / 2);
    return titleElement;
  }
}