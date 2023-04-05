class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
    }

    create() {
        this.add.image(400, 300, "background");
        this.add.image(400, 160, "title");

        let startText = this.add.text(400, 300, "Start", FontStyle.LARGE);
        startText.setOrigin(0.5, 0.5);
        startText.setInteractive();

        OnClick.addListener(startText, () => {
            this.scene.start("GameScene", { controlType: Settings.controlType, levels: [LEVEL_1, LEVEL_2], score: 0 });
        });

        let blue = "#0093ff";
        let white = "#ffffff";

        let pointerText = this.add.text(250, 400, "Pointer", FontStyle.MEDIUM);
        pointerText.setOrigin(0.5, 0.5);
        pointerText.setInteractive();

        let keyboardText = this.add.text(400, 400, "Keyboard", FontStyle.MEDIUM);
        keyboardText.setOrigin(0.5, 0.5);
        keyboardText.setInteractive();

        let gamepadText = this.add.text(550, 400, "Gamepad", FontStyle.MEDIUM);
        gamepadText.setOrigin(0.5, 0.5);
        gamepadText.setInteractive();

        if (Settings.controlType === ControlType.POINTER) pointerText.setFill(blue);
        else if (Settings.controlType === ControlType.KEYBOARD) keyboardText.setFill(blue);
        else if (Settings.controlType === ControlType.GAMEPAD) gamepadText.setFill(blue);

        OnClick.addListener(pointerText, () => {
            pointerText.setFill(blue);
            keyboardText.setFill(white);
            gamepadText.setFill(white);
            Settings.controlType = ControlType.POINTER;
        });

        OnClick.addListener(keyboardText, () => {
            pointerText.setFill(white);
            keyboardText.setFill(blue);
            gamepadText.setFill(white);
            Settings.controlType = ControlType.KEYBOARD;
        });

        OnClick.addListener(gamepadText, () => {
            pointerText.setFill(white);
            keyboardText.setFill(white);
            gamepadText.setFill(blue);
            Settings.controlType = ControlType.GAMEPAD;
        });

        let highscoreText = this.add.text(400, 500, "Highscore - " + Settings.highscore, FontStyle.SMALL);
        highscoreText.setOrigin(0.5, 0.5);
        highscoreText.setFill(blue);
    }

    update() {
        if (this.input.activePointer.isDown) console.log(this.input.activePointer.x);
    }

}
