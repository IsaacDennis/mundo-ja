class Scene5 extends GameScene {
  dialog = [{characterName: "Voluntário", text: "A escola permite que vocês convivam uns com os outros. Todos vocês ganham com isso, principalmente por causa das trocas de conhecimento e as lembranças que vão ser criadas."}, {characterName: "Voluntário", text: "Agora, vou explicar como vai ser o Jogo das Grandes Decisões..."}]
  constructor(){
    super("Scene5");
  }
  preload(){
    this.load.image("sala-de-aula2", "assets/fase-um/sala-de-aula2.png");
      this.load.spritesheet({
      key: 'mentor',
      url: 'assets/fase-um/personagens/mentor-ja.png',
      frameConfig: {
        frameWidth: 80,
        frameHeight: 183,
        startFrame: 0,
        endFrame: 3
      }
    });
  }
  create(){
    this.cameras.main.fadeIn().on('camerafadeincomplete', () => {
      this.ui.startDialog(this.dialog, () => {}, () => {
        this.sceneTransition("GameFinishedScene");
      });
    })
    this.graphics = this.add.graphics();
    this.add.image(400, 300, "sala-de-aula2");
    this.add.sprite(256, 236, "mentor");
  }
  update(){

  }
}
