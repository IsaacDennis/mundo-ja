class CreditsScene extends GameScene {
  mentora = "Mentora \n\n Geovanna Sousa";
  voluntarios = "Voluntários \n\n Tiago Macedo\n Patrícia Teixeira";
  programador = "Programação \n\nIsaac Dennis";
  participantes = "Participantes \n\n Amanda Paixão\nIsaac Dennis\nRayanna Mirella\nNathalia Xavier";
  arte = "Arte \n\n Isaac Dennis \n Amanda Paixão"
  apresentacao = "Apresentação \n\nRayanna Mirella\n Nathalia Xavier"
  musicos = "Música \n\n\n Game Over - No Hope - Cleyton Kauffman \n\n Créditos - A Little Journey - shiru8bit \n\n As músicas presentes no jogo são livres para uso e foram obtidos de \n opengameart.org"
  constructor() {
    super("CreditsScene");
  }

  init() {

  }

  preload() {
    this.load.audio("credits", ["assets/music/credits.mp3"]);
  }

  create() {
    this.currentCredits = this.add.text(0, 0, "");
    const credits = [this.mentora, this.participantes, this.voluntarios, this.programador, this.arte, this.apresentacao, this.musicos];
    this.cameras.main.fadeOut(0);
    const music = this.sound.add("credits");
    music.play();
    let currentCreditsIndex = 0;
    const transitionEvent = this.time.addEvent({
        delay: 5500,
        callback: () => {
          if (currentCreditsIndex < credits.length){
            //this.cameras.main.fadeOut();
            const currentCreditsString = credits[currentCreditsIndex];
            this.creditsTransition(currentCreditsString);
          } else {
            music.on('complete', () => {
              this.scene.start("MenuScene");
            });
          }
          currentCreditsIndex += 1;
        },
        loop: true
    });
  }

  update() {

  }
  creditsTransition(text){
    this.cameras.main.fadeIn();
    this.currentCredits.destroy();
    this.currentCredits = this.ui.centralizedText(text).setAlign("center");
    const freeHeight = 600 - this.currentCredits.displayHeight;
    this.currentCredits.setY(freeHeight / 2);
  }
}