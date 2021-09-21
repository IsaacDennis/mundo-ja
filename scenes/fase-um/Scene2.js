class Scene2 extends GameScene {
  constructor() {
    super("Scene2");
    this.ui = new UIManager(this);
  }
  dialog1 = [{characterName: "Felipe", text: "Bom dia. E aí, como vai?"}, {characterName: "Marcelo", text: "É, vou bem."}, {characterName: "Felipe", text: "Tem certeza? Tá com cara de preocupado."}, {characterName: "Marcelo", text: "Sim, sim. Tá tudo bem."}, {characterName: "Felipe", text: "Vamos para a aula de história, faltam só cinco minutos para começar."}];

  dialog2 = [{characterName: "Marcelo", text: "O que é isso?"}, {characterName: "Felipe", text: "Tão convidando os alunos da escola pra participarem desse programa da JA."}, {characterName: "Marcelo", text: "JA?"}, {characterName: "Felipe", text: "Isso. É uma organização que ajuda os jovens a se preparem para o futuro, pelo que eu entendi."}, {characterName: "Marcelo", text: "Como assim?"}, {characterName: "Felipe", text: "Eles fazem programas para incentivarem os jovens a crescerem profissionalmente."}, {characterName: "Marcelo", text: "Entendi..."}, {characterName: "Marcelo", text: "Quando vai ser esse programa?"}, {characterName: "Felipe", text: "Já vai ser amanhã."}, {characterName: "Marcelo", text: "Acho que vou participar..."}]
  

  preload() {
    this.arrows = this.input.keyboard.createCursorKeys();
    this.load.image("poster", "assets/fase-um/poster.jpg")
    this.loadGlobalAssets();
    this.load.image("escola", "assets/fase-um/escola.png");
  }

  create() {
    this.actionAreas = this.add.group();
    this.add.image(400, 300, "escola");
    const eKeyGroup = this.ui.createKeyIndicator("Ver o pôster", "#000")
    // Adição de personagens e animações
    const marceloAnimation = {
      key: 'marceloAnimation',
      frames: this.anims.generateFrameNumbers('marcelo', {
        start: 3,
        end: 0
      }),
      frameRate: 8,
      repeat: 0
    };
    const interrogationAnimation = {
      key: 'interrogationAnimation',
      frames: this.anims.generateFrameNumbers('interrogation', {
        start: 0,
        end: 9
      }),
      frameRate: 10,
      repeat: -1
    }
    const arrowAnimation = {
      key: 'arrowAnimation',
      frames: this.anims.generateFrameNumbers('arrow', {
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    }
    this.anims.create(interrogationAnimation);
    this.anims.create(marceloAnimation);
    this.anims.create(arrowAnimation);
    // Adição do Felipe e balão de interrogação
    const felipe = this.physics.add.staticSprite(360, 200, 'felipe').setFlipX(true);
    const felipeInterrogation = this.add.sprite(360, 80, 'interrogation').play('interrogationAnimation');
    const posterInterrogation = this.add.sprite(525, 120, 'interrogation').play('interrogationAnimation').setVisible(false);
    const stairsIndicator = this.add.sprite(674, 105, 'arrow').play('arrowAnimation').setVisible(false);
    felipe.setSize(150, 90);
    felipe.setOffset(-50, 150);
    // ====
    // Adição do jogador à cena
    this.player = this.physics.add.sprite(100, 210, 'marcelo');
    this.player.setSize(70, 10);
    this.player.setOffset(10, 165);
    this.player.setCollideWorldBounds(true);
    // ====
    
    const tablesArea = this.addCollisionArea(16, 400, 353, 199);
    const doorWallArea = this.addCollisionArea(0, 0, 400, 256);
    // this.add.triangle não funcionou. Foi necessário criar vários retângulos para cobrir a parte "transversal" da parede.
    const transversalWall1 = this.addCollisionArea(403, 255, 73, 17);
    const transversalWall2 = this.addCollisionArea(412, 272, 64, 20);
    const transversalWall3 = this.addCollisionArea(428, 293, 48, 16);
    const transversalWall4 = this.addCollisionArea(440, 309, 37, 18);
    const tranversalWall5 = this.addCollisionArea(451, 327, 27, 27);
    //==========
    const posterArea = this.addCollisionArea(476, 0, 324, 361);

    const collisionGroup = this.physics.add.staticGroup([tablesArea, doorWallArea, transversalWall1, transversalWall2, transversalWall3, transversalWall4, tranversalWall5, posterArea]);
    this.graphics = this.add.graphics();
    this.physics.add.collider(this.player, collisionGroup);
    this.physics.add.collider(this.player, felipe, () => {
      if (!this.dialogStarted){
        const startedFunction = () => {
          this.player.body.moves = false;
          felipeInterrogation.destroy();
        };
        const completedFunction = () => {          
          this.player.body.moves = true;
          felipe.setSize(0, 0);
          posterInterrogation.setVisible(true);
          const posterActionArea = this.createIndicatorArea(476, 361, 100, 48, "Ver o pôster", "#000", () => {
            this.cameras.main.fadeOut();
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.cameras.main.fadeIn(0);
                const posterScreen = this.showPosterScreen();
                this.ui.startDialog(this.dialog2, null, () => {
                  this.cameras.main.fadeOut();
                  this.cameras.main.once('camerafadeoutcomplete', () => {
                    posterScreen.destroy(true);
                    this.currentActionArea.destroy();
                    posterInterrogation.destroy();
                    stairsIndicator.setVisible(true);
                    this.cameras.main.fadeIn(0);
                    const stairsActionArea = this.createIndicatorArea(575, 360, 190, 64, "Subir a escadaria", "#000", () => {
                        this.sceneTransition("Scene3");
                    });
                    this.actionAreas.add(stairsActionArea);
                  });
              });
            })
          });
          this.actionAreas.add(posterActionArea);
        };

        const dialogBox = this.ui.startDialog(this.dialog1, startedFunction, completedFunction);
      }
      this.dialogStarted = true;
    });
    this.cameras.main.fadeIn();
  }

  update() {
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    if (!this.isOverlapping){
      this.physics.overlap(this.player, this.actionAreas, (o1, o2) => {
        this.isOverlapping = true;
        this.currentActionArea = o2;
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
  showPosterScreen(){
    const wallOverlay = this.add.rectangle(400, 300, 800, 600, 0xfffb9d);
    const poster = this.add.image(400, 300, "poster").setScale(0.1);
    const posterScreen = this.add.group([wallOverlay, poster]);
    return posterScreen;
  }
}