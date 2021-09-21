class Scene3 extends GameScene {
  constructor() {
    super("Scene3");
  }

  preload() {
    this.loadGlobalAssets();
    this.load.image("corredor", "assets/fase-um/corredor.png");
  }

  create() {
    this.arrows = this.input.keyboard.createCursorKeys();
    this.add.image(400, 300, "corredor");
    const arrowAnimation = {
      key: 'arrowAnimation',
      frames: this.anims.generateFrameNumbers('arrow', {
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    }
    this.anims.create(arrowAnimation);
    const felipe = this.physics.add.sprite(100, 480, "felipe");
    const marcelo = this.physics.add.sprite(200, 480, "marcelo");
    const doorsWall = this.addCollisionArea(0, 0, 800, 425);
    this.add.sprite(645, 200, "arrow").play("arrowAnimation");
    const collisionGroup = this.physics.add.staticGroup([doorsWall]);
    this.characters = this.physics.add.group([felipe, marcelo]);
    this.characters.getChildren().forEach(sprite => {
      sprite.setSize(70, 10);
      sprite.setOffset(10, 165);
      sprite.setCollideWorldBounds(true);
    });
    this.physics.add.collider(marcelo, felipe);
    this.physics.add.collider(this.characters, collisionGroup);
    const marceloAnimation = {
      key: 'marceloAnimation',
      frames: this.anims.generateFrameNumbers('marcelo', {
        start: 3,
        end: 0
      }),
      frameRate: 8,
      repeat: 0
    };
    const felipeAnimation = {
      key: 'felipeAnimation',
      frames: this.anims.generateFrameNumbers('felipe', {
        start: 3,
        end: 0
      }),
      frameRate: 8,
      repeat: 0
    };
    
    this.anims.create(marceloAnimation);
    this.anims.create(felipeAnimation);

    const doorActionArea = this.createIndicatorArea(594, 400, 102, 68, "Entrar na sala", "#000", () => {
      this.sceneTransition("Scene4");
    });
    this.actionAreas = this.add.group([doorActionArea]);
    // Fade do início da cena
    this.cameras.main.fadeIn();
  }

  update() {
    this.characters.setVelocityX(0);
    const sprites = this.characters.getChildren();
    this.characters.setVelocityY(0);
    const left = this.arrows.left.isDown;
    const right = this.arrows.right.isDown;
    const up = this.arrows.up.isDown;
    const down = this.arrows.down.isDown;
    const shouldMove = left | right | up | down;
    //=======================================
    if (!this.isOverlapping){
      this.physics.overlap(this.characters, this.actionAreas, (o1, o2) => {
        this.isOverlapping = true;
        this.currentActionArea = o1;
        this.currentActionArea.keyIndicator.setVisible(true);
        this.input.keyboard.once('keydown-E', this.currentActionArea.actionFunction);
      })
    } else {
      const continuesOverlapping = this.physics.overlap(this.characters, this.actionAreas);
      if (!continuesOverlapping){
        this.isOverlapping = false;
        this.currentActionArea.keyIndicator.setVisible(false);
        this.input.keyboard.off('keydown-E');
      }
    }
    if (shouldMove){
      sprites[0].play('felipeAnimation');
      sprites[1].play('marceloAnimation');
    }
    if (left){
        sprites.forEach(character => character.setFlipX(true));
        this.characters.setVelocityX(-200);
    } else if (right){
        sprites.forEach(character => character.setFlipX(false));
        this.characters.setVelocityX(200);
    }
    if (up){
        this.characters.setVelocityY(-200);
    } else if (down){
        this.characters.setVelocityY(200);
    }
  }
}