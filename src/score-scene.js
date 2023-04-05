class ScoreScene extends Phaser.Scene {

    constructor() {
        super("ScoreScene");
    }

    create(data) {
        this.add.image(400, 300, "background");

        let scoreText = this.add.text(400, 100, "Score - " + data.score, FontStyle.LARGE);
        scoreText.setOrigin(0.5, 0.5);

        if (data.score > Settings.highscore) {
            Settings.highscore = data.score;

            let highscoreText = this.add.text(400, 200, "New highscore!", FontStyle.MEDIUM);
            highscoreText.setOrigin(0.5, 0.5);
        }

        let continueText = this.add.text(400, 300, "Continue", FontStyle.LARGE);
        continueText.setOrigin(0.5, 0.5);
        continueText.setInteractive();

        if (data.levels.length > 0) {
            OnClick.addListener(continueText, () => {
                this.scene.start("GameScene", { controlType: Settings.controlType, levels: data.levels, score: data.score });
            });
        }
        else {
            continueText.setText("Home");

            OnClick.addListener(continueText, () => {
                this.scene.start("TitleScene");
            });
        }
    }

}
