class GameFinishedScene extends GameScene {
  constructor(){
    super("GameFinishedScene");
  }
  preload(){

  }
  create(){
    this.add.text(400, 300, "Após a palestra e as atividades dinâmicas do programa oferecido pela JA, Marcelo recuperou seu ânimo e decidiu continuar com seus estudos, não abandonando a escola.", {
      fontFamily: "RetroFont",
      align: "center"
    }).setOrigin(0.5).setWordWrapWidth(760);
    this.cameras.main.fadeIn(4000).on('camerafadeincomplete', () => {
      const endTimer = this.time.addEvent({
        callback: () => {
          this.scene.start("ProgramsScene");
        },
        delay: 6000
      });
    });
  }
}