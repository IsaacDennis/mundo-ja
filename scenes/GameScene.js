class GameScene extends Phaser.Scene {
  constructor(sceneId) {
    super(sceneId);
    this.ui = new UIManager(this);
  }
  sceneTransition(key, config){
    this.cameras.main.fadeOut().on('camerafadeoutcomplete', () => {
      this.scene.start(key, config);
    });
  }
  addCollisionArea(x, y, width, height){
    const area = this.add.rectangle(x, y, width, height, 0x000000, 0).setOrigin(0, 0);
    return area;
  }
  // Cria uma área (i.e., um retângulo invisível) num local específico. Quando o jogador entra em contato, um indicador de tecla é criado. (Ex.: Ver pôster)
  createIndicatorArea(x, y, width, height, text, textColor, actionFunction){
    const area = this.addCollisionArea(x, y, width, height);
    area.keyIndicator = this.ui.createKeyIndicator(text, textColor);
    area.actionFunction = actionFunction;
    this.physics.add.existing(area);
    return area;
  }
  loadGlobalAssets(){
    this.load.image("e-key", "assets/indicators/e-key.png");
    this.load.image("cursors", "assets/indicators/cursors.png");
    this.load.spritesheet({
      key: 'marcelo',
      url: 'assets/fase-um/personagens/marcelo.png',
      frameConfig: {
        frameWidth: 80,
        frameHeight: 183,
        startFrame: 0,
        endFrame: 3
      }
    });
    this.load.spritesheet({
      key: 'felipe',
      url: 'assets/fase-um/personagens/felipe.png',
      frameConfig: {
        frameWidth: 80,
        frameHeight: 183,
        startFrame: 0,
        endFrame: 3
      }
    });
    this.load.spritesheet({
      key: 'interrogation',
      url: 'assets/indicators/interrogation.png',
      frameConfig: {
        frameWidth: 45,
        frameHeight: 41,
        startFrame: 0,
        endFrame: 9
      }
    });
    this.load.spritesheet({
      key: 'arrow',
      url: 'assets/indicators/arrow.png',
      frameConfig: {
        frameWidth: 45,
        frameHeight: 45,
        startFrame: 0,
        endFrame: 1
      }
    });
    this.load.spritesheet({
      key: 'button-texture',
      url: 'assets/button-texture.png',
      frameConfig: {
        frameWidth: 200,
        frameHeight: 65,
        startFrame: 0,
        endFrame: 1
      }
    })
  }
}