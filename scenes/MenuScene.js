class MenuScene extends GameScene {
  constructor(){
    super("MenuScene");
    this.ui = new UIManager(this);
  }
  preload(){
    this.loadGlobalAssets();
    this.load.image("game-title", "assets/title-screen.png");
  }
  create(data){

    this.cameras.main.setBackgroundColor(0xfffb9d).flash(2000);
    this.add.image(400, 150, "game-title");
    const startFunction = () => {
      this.sceneTransition("TutorialScene");
    }
    const creditsFunction = () => {
      this.sceneTransition("CreditsScene");
    }
    const programsFunction = () => {
      this.sceneTransition("ProgramsScene");
    }
    const startButton = this.ui.textureButton(400, 350, "Iniciar", startFunction);
    const creditsButton = this.ui.textureButton(400, 450, "Créditos", creditsFunction);
    const programsButton = this.ui.textureButton(400, 550, "Programas da JA", programsFunction).setVisible(data.programs);
   
  }
  update(){

  }
}