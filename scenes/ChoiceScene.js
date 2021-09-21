class ChoiceScene extends GameScene {
  constructor() {
    super("ChoiceScene");
  }

  preload() {
    
  }

  create(data) {
    const titleElement = this.createTitle(data.title);
    const questionElement = this.ui.centralizedText(data.question).setY(200);
    const clickFunction1 = () => {
      this.sceneTransition("Scene5");
    }

    const clickFunction2 = () => {
      this.scene.start("GameOverScene");
    }

    const choiceButtons = this.createChoiceButtons("Ir para a escola amanhã e participar do programa", "Desistir", clickFunction1, clickFunction2);
    
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