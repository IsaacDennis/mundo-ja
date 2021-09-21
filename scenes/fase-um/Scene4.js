class Scene4 extends GameScene {
  dialog = [{characterName: "Sérgio", text: "Chegou o burrão da sala..."}, {characterName: "Marcelo", text: "Para com isso..."}];
  constructor() {
    super("Scene4");
  }
  preload() {
    this.loadGlobalAssets();
    this.load.image("sala-de-aula", "assets/fase-um/sala-de-aula.png");
  }

  create() {
    this.arrows = this.input.keyboard.createCursorKeys();
    this.graphics = this.add.graphics();
    this.add.image(400, 300, "sala-de-aula");
    const arrowAnimation = {
      key: 'arrowAnimation',
      frames: this.anims.generateFrameNumbers('arrow', {
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    }
    const marceloAnimation = {
      key: 'marceloAnimation',
      frames: this.anims.generateFrameNumbers('marcelo', {
        start: 3,
        end: 0
      }),
      frameRate: 8,
      repeat: 0
    };
    this.anims.create(arrowAnimation);
    this.anims.create(marceloAnimation);
    this.add.sprite(382, 257, "arrow-indicator").play("arrowAnimation");
    this.player = this.physics.add.sprite(255, 510, "marcelo");
    this.player.setSize(60, 10);
    this.player.setOffset(10, 165);
    this.player.setCollideWorldBounds(true);
    const felipe = this.add.sprite(500, 510, "felipe").setFlipX(true);
    // Áreas de colisão
    const frontWall = this.addCollisionArea(0, 0, 800, 255);
    const desk1 = this.addCollisionArea(57, 255, 128, 173);
    const desk2 = this.addCollisionArea(318, 288, 130, 108);
    const desk3 = this.addCollisionArea(568, 288, 130, 108);
    const desk4 = this.addCollisionArea(60, 428, 130, 108);
    const desk5 = this.addCollisionArea(324, 428, 130, 108);
    const desk6 = this.addCollisionArea(568, 428, 130, 108);
    const collisionGroup = this.physics.add.staticGroup([frontWall, desk1, desk2, desk3, desk4, desk5, desk6]);
    this.physics.add.collider(this.player, collisionGroup);
    // == 
    // Áreas de ação 
    const actionFunction = () => {
      this.sceneTransition("ChoiceScene", {
        title: "Chegando em casa, Marcelo se depara com duas possibilidades: ir para a escola amanhã e participar do programa oferecido pela JA, ou desistir, como pensou na noite anterior.",
        question: "O que Marcelo vai fazer?",
      });
    }
    const actionArea1 = this.createIndicatorArea(184, 312, 135, 93, "Sentar-se", "#000", actionFunction);
    const actionArea2 = this.createIndicatorArea(448, 312, 120, 95, "Sentar-se", "#000", actionFunction);
    this.actionAreas = this.add.group([actionArea1, actionArea2]);
    this.cameras.main.fadeIn();
  }

  update() {
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    if (!this.isOverlapping){
      this.physics.overlap(this.player, this.actionAreas, (o1, o2) => {
        this.isOverlapping = true;
        this.currentActionArea = o2;
        if (!this.dialogStarted){
          this.ui.startDialog(this.dialog, () => {
            this.dialogStarted = true;
            this.player.body.moves = false;
          }, () => {
            this.player.body.moves = true;
          });
        }
        this.currentActionArea.keyIndicator.setVisible(true);
        this.input.keyboard.once('keydown-E', this.currentActionArea.actionFunction);
      })
    } else {
      const continuesOverlapping = this.physics.overlap(this.player, this.actionAreas);
      if (!continuesOverlapping){
        this.isOverlapping = false;
        this.currentActionArea.keyIndicator.setVisible(false);
        this.input.keyboard.off('keydown-E');
      }
    }
    const left = this.arrows.left.isDown;
    const right = this.arrows.right.isDown;
    const up = this.arrows.up.isDown;
    const down = this.arrows.down.isDown;
    const shouldMove = left | right | up | down;
    //=======================================
    if (shouldMove){
      this.player.play('marceloAnimation');
    }
    if (left){
        this.player.setFlipX(true);
        this.player.setVelocityX(-200);
    } else if (right){
        this.player.setFlipX(false);
        this.player.setVelocityX(200);
    }
    if (up){
        this.player.setVelocityY(-200);
    } else if (down){
        this.player.setVelocityY(200);
    }
  }
}