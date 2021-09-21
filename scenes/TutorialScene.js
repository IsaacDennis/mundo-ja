class TutorialScene extends GameScene {
  constructor(){
    super("TutorialScene");
    this.ui = new UIManager(this);
  }
  preload(){
    this.loadGlobalAssets();
    
  }
  create(){
    this.add.image(400, 120, "cursors");
    this.add.text(400, 230, "Use as setas do teclado para se movimentar", {
      fontFamily: "RetroFont"
    }).setOrigin(0.5);
    this.add.image(400, 300, "e-key");
    this.add.text(400, 360, "Pressione a tecla E quando uma ação aparecer na tela", {
      fontFamily: "RetroFont"
    }).setOrigin(0.5);
    this.add.sprite(200, 410, "interrogation", 0);
    this.add.text(200, 440, "Interação disponível", {
      fontFamily: "RetroFont"
    }).setOrigin(0.5);
    this.add.sprite(600, 410, "arrow", 0);
    this.add.text(600, 440, "Mova-se nesta direção", {
      fontFamily: "RetroFont"
    }).setOrigin(0.5);
    const continueFunction = () => {
      this.sceneTransition("Scene1");
    }
    const startButton = this.ui.textureButton(400, 550, "Continuar", continueFunction);
  }
  update(){

  }
}