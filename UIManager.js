class UIManager {
  constructor(scene){
    this.scene = scene;
  }
  // Cria um botão com texto centralizado utilizando a forma retângulo
  shapeButton(rectX, rectY, rectWidth, rectHeight,  rectColor, content){
    const buttonRect = this.scene.add.rectangle(rectX, rectY, rectWidth, rectHeight, rectColor).setInteractive();
    // Insere o botão no início (lado esquerdo e em cima) do retângulo
    let text = this.scene.add.text(rectX - rectWidth / 2, rectY - rectHeight / 2, content, {
      fontFamily: "RetroFont"
    });
    const freeWidth = rectWidth - text.displayWidth;
    const freeHeight = rectHeight - text.displayHeight;
    text.setX(text.x + freeWidth / 2);
    text.setY(text.y + freeHeight / 2);

    const buttonGroup = this.scene.add.group([buttonRect, text]);
    return buttonGroup;
  }
  startDialog(sequence, startedFunction, completedFunction) {
    const graphics = this.scene.graphics; // Referência ao objeto 'graphics' da cena atual
    if (graphics == undefined){
      console.error("ERRO startDialog(): O objeto 'graphics' da cena não existe. ");
      return;
    }
    if(startedFunction != null){
      startedFunction();
    }
    // Retângulo do personagem
    graphics.fillStyle(0x783c00, 1);
    const characterRect = graphics.fillRoundedRect(20, 390, 200, 40, {
      tl: 0,
      tr: 20,
      bl: 0,
      br: 0
    }).setDepth(1);
    let characterName = this.scene.add.text(20, 390, sequence[0].characterName, {
      fontFamily: "RetroFont",
      fontSize: 24
    }).setDepth(2);
    const freeWidth = 200 - characterName.displayWidth;
    const freeHeight = 40 - characterName.displayHeight;
    characterName.setX(characterName.x + freeWidth / 2);
    characterName.setY(characterName.y + freeHeight / 2);
    // ----
    // Retângulo da conversa
    graphics.fillStyle(0x964b00, 1);
    const dialogRect = graphics.fillRoundedRect(20, 430, 760, 150, { tl: 0, tr: 20, bl: 0, br: 0 }).setDepth(1);
    // -----
    // Botão pular/próximo/fim
    const hoverRectangle = this.scene.add.rectangle(710, 560, 130, 35, 0xffffff).setVisible(false).setDepth(3);
    const nextButton = this.shapeButton(710, 560, 125, 30, 0x783c00, "Próximo").setDepth(3);
    const [nextButtonRect, nextButtonText] = nextButton.getChildren();
    nextButtonRect.on('pointerover', () => {
      hoverRectangle.setVisible(true);
    }).on('pointerout', () => {
      hoverRectangle.setVisible(false);
    });
    
    // ---
    // Lógica do diálogo
    nextButton.setVisible(false);
    let dialogText = this.animatedText(30, 440, 740, sequence[0].text, "animation-completed").setDepth(2);
    const dialogGroup = this.scene.add.group([characterName, dialogText, nextButton]);

    dialogText.on("animation-completed", () => {
      nextButton.setVisible(true);
    });
    // Código para exibir a próxima fala do diálogo
    let currentDialogIndex = 1; // Diálogo já se inicia com o primeiro elemento (isto é, indice 0)  do objeto "sequence"
    nextButtonRect.on('pointerdown', () => {
      if (currentDialogIndex < sequence.length){
        dialogText.destroy();
        nextButton.setVisible(false);
        dialogText = this.animatedText(30, 440, 740, sequence[currentDialogIndex].text, "animation-completed").setDepth(2);
        dialogGroup.add(dialogText);
        dialogText.on("animation-completed", () => {
          nextButton.setVisible(true);
        });
        characterName.setText(sequence[currentDialogIndex].characterName);
        currentDialogIndex += 1;
        if (currentDialogIndex == sequence.length){
          nextButtonText.setText("Sair");
          nextButtonRect.on('pointerdown', () => {
            nextButton.setVisible(false);
            dialogGroup.destroy(true);
            graphics.clear();
            completedFunction();
          })
        }
      }
    });

    
    return dialogGroup;
  }
  explanationBox(text, completedFunction){
    const borderRectangle = this.scene.add.rectangle(400, 80, 785, 115, 0x783c00);
    const mainRectangle = this.scene.add.rectangle(400, 80, 770,100, 0x964b00); 
    const explanationText = this.animatedText(20, 35, 760, text, "explanation-completed");
    explanationText.on('explanation-completed', completedFunction);
    const explanationGroup = this.scene.add.group([borderRectangle, mainRectangle, explanationText]);
    return explanationGroup;
  }
  animatedText(x, y, wordWrap, text, eventName) {
    const textElement = this.scene.add.text(x, y, "", {
      fontFamily: "RetroFont"
    }).setWordWrapWidth(wordWrap);
    const characterArray = text.split("");
    let currentCharacterIndex = 0;
    const animationTimer = this.scene.time.addEvent({
      callback: () => {
        if (currentCharacterIndex < characterArray.length) {
          const currentDisplayText = textElement.text;
          textElement.setText(currentDisplayText + characterArray[currentCharacterIndex]);
          currentCharacterIndex += 1;
          if (currentCharacterIndex == characterArray.length){
            
            if (eventName != ""){
              textElement.emit(eventName);
            }
          }
        }
      },
      delay: 40,
      loop: true
    });
    return textElement;
  }
  createKeyIndicator(text, textColor){
    const eKey = this.scene.add.image(400, 530, "e-key").setScale(0.5);
    const actionText = this.scene.add.text(0, 550, text, {
      fontFamily: "RetroFont",
      color: textColor
    });
    const freeWidth = 800 - actionText.displayWidth;
    actionText.setX(freeWidth / 2);

    const indicatorGroup = this.scene.add.group([eKey, actionText]);
    return indicatorGroup.setVisible(false);
  }
  centralizedText(text){
    const textElement = this.scene.add.text(0, 0, text, {
      fontFamily: "RetroFont"
    }).setWordWrapWidth(800);
    const freeWidth = 800 - textElement.displayWidth;
    textElement.setX(freeWidth / 2);
    return textElement;
  }
  centralizeTextInScreen(textElement){
    const displayWidth = textElement.displayWidth;
    const freeWidth = 800 - displayWidth;
    textElement.setX(freeWidth / 2);
  }
  textButton(x, y, text){
    const textButton = this.scene.add.text(x, y, text, {
      color: "#ff0000",
      fontFamily: "RetroFont",
      align: "center"
    }).setInteractive({ useHandCursor: true }).setOrigin(0.5);
    textButton.on('pointerover', () => {
      textButton.setColor("#00ff00");
    }).on('pointerout', () => {
      textButton.setColor("#ff0000");
    })
    return textButton;
  }
  textureButton(x, y, text, clickFunction){
    const texture = this.scene.add.sprite(x, y, "button-texture", 0).setInteractive();
    texture.on('pointerover', () => {
      texture.setFrame(1);
    }).on('pointerout', () => {
      texture.setFrame(0);
    });
    texture.once('pointerdown', clickFunction);
    const label = this.scene.add.text(x, y, text, {
      fontFamily: "RetroFont"
    }).setOrigin(0.5);

    const buttonGroup = this.scene.add.group([texture, label]);
    return buttonGroup;
  }
}