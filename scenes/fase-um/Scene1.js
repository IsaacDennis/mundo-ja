class Scene1 extends GameScene {
  constructor() {
    super("Scene1");
  }
  preload() {
    this.load.image("quarto", "assets/fase-um/quarto.jpeg");
  }

  create() {
    this.add.image(400, 300, "quarto");
    const continueIndicator = this.ui.createKeyIndicator("Continuar", "#fff");
    const currentExplanation = this.ui.explanationBox("Marcelo é um estudante do Ensino Fundamental. Após vários desentendimentos entre ele e seus professores, sofrer bullying e não tirar boas notas, Marcelo perde a motivação de ir para a escola.", () => {
      continueIndicator.setVisible(true);
      this.input.keyboard.once('keydown-E', () => {
        continueIndicator.setVisible(false);
        currentExplanation.destroy();
        this.ui.explanationBox("Amanhã, ele pensa em ir pela última vez, para então abandonar a escola.", () => {
          continueIndicator.setVisible(true);
          this.input.keyboard.once('keydown-E', () => {
            continueIndicator.setVisible(false);
            this.sceneTransition("Scene2");
          });
        });
      })
    })
  }

  update() {

  }
}