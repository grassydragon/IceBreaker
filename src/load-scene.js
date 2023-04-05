class LoadScene extends Phaser.Scene {

    constructor() {
        super("LoadScene");
    }

    preload() {
        const x = 100;
        const y = 295;

        const width = 600;
        const height = 10;

        let background = this.add.graphics();

        background.fillStyle(0xbbffff);
        background.fillRect(x, y, width, height);

        let progressBar = this.add.graphics();

        this.load.on("progress", (progress) => {
            progressBar.clear();
            progressBar.fillStyle(0x0093ff);
            progressBar.fillRect(x, y, progress * width, height);
        });

        this.load.image("background", "res/img/background.png");

        this.load.image("title", "res/img/title.png");

        this.load.image("ball", "res/img/ball.png");
        this.load.image("fire-ball", "res/img/fire-ball.png");
        this.load.image("fire-ball-particle", "res/img/fire-ball-particle.png");

        this.load.image("platform-center", "res/img/platform-center.png");
        this.load.image("platform-edge", "res/img/platform-edge.png");

        this.load.spritesheet("blocks", "res/img/blocks.png", { frameWidth: 80, frameHeight: 40 });
        this.load.image("block-particle", "res/img/block-particle.png");

        this.load.spritesheet("bonuses", "res/img/bonuses.png", { frameWidth: 20, frameHeight: 20 });

        this.load.audio("collision", "res/sfx/collision.wav");
        this.load.audio("explosion", "res/sfx/explosion.wav");
        this.load.audio("powerup", "res/sfx/powerup.wav");
    }

    create() {
        this.scene.start("TitleScene");
    }

}
