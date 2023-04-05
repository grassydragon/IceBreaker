let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0xffffff,
    input: {
        gamepad: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    scene: [LoadScene, TitleScene, GameScene, ScoreScene]
};

let game = new Phaser.Game(config);
