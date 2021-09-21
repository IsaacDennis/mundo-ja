class ProgramsScene extends GameScene {
  constructor(){
    super("ProgramsScene");
  }
  preload(){
    this.loadGlobalAssets();
    this.load.image("lideranca-comunitaria", "assets/posters/programa1.jpg");
    this.load.image("conectados-com-o-amanha", "assets/posters/programa2.jpg");
    this.load.image("girl-for-it", "assets/posters/programa3.png");
  }
  create(){
    this.cameras.main.setBackgroundColor(0xfffb9d);
    this.add.text(400, 50, "Conheça outros programas da JA", {
      fontFamily: "RetroFont",
      color: "#000"
    }).setOrigin(0.5);
    this.createPoster(110, 250, 0.08, "lideranca-comunitaria", "Liderança Comunitária", "https://www.jabrasil.org.br/empreendedorismo/2019/10/30/lideranca-comunitaria");
    this.createPoster(400, 250, 0.08, "conectados-com-o-amanha", "Conectados com o Amanhã", "https://www.jabrasil.org.br/preparacao-para-o-mercado-de-trabalho/2019/10/30/conectado-com-o-amanha");
    this.createPoster(690, 250, 0.2, "girl-for-it", "Girl for IT", "https://www.jabrasil.org.br/preparacao-para-o-mercado-de-trabalho/2019/10/30/girl-for-it");
    this.ui.textButton(400, 480, "Todos os programas da JA").on('pointerdown', () => {
      window.open("https://www.jabrasil.org.br/nossos-programas");
    })
    const continuetButton = this.ui.textureButton(400, 550, "Continuar", () => {
      this.sceneTransition("MenuScene", {
        programs: true
      });
    });
  }
  update(){

  }
  createPoster(x, y, scale, key, text, link){
    const image = this.add.image(x, y, key).setInteractive().setScale(scale).setDepth(2);
    const hoverRectangle = this.add.rectangle(x, y, image.displayWidth + 10, image.displayHeight + 10, 0x000000).setVisible(false);
    const textElement = this.add.text(x, y + 170, text, {
      fontFamily: "RetroFont",
      align: "center",
      color: "#000"
    }).setOrigin(0.5).setWordWrapWidth(150).setVisible(false);
    image.on('pointerover', () => {
      textElement.setVisible(true);
      hoverRectangle.setVisible(true);
    }).on('pointerout', () => {
      textElement.setVisible(false);
      hoverRectangle.setVisible(false);
    });
    image.on('pointerdown', () => {
      window.open(link);
    })
  }
}