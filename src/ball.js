class Ball extends Phaser.Physics.Arcade.Image {

    constructor(scene, particles) {
        super(scene, 400, 300, "ball", 0);

        this.emitter = particles.createEmitter({
            frequency: -1,
            speed: 20,
            scale: {
                start: 1,
                end: 0
            },
            alpha: {
                start: 1,
                end: 0
            }
        });

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        this.speed = Ball.LOW_SPEED;

        this.setVelocity(0, this.speed);

        this.emitter.startFollow(this);
    }

    reset() {
        this.x = 400;
        this.y = 300;

        this.setVelocity(0, this.speed);
    }

    resetTo(x) {
        this.x = x;
        this.y = 300;

        this.setVelocity(0, this.speed);
    }

    updateVelocity() {
        this.setVelocity(this.speed * Math.cos(this.body.angle), this.speed * Math.sin(this.body.angle));
    }

    decreaseSpeed() {
        this.speed = Ball.LOW_SPEED;
        this.updateVelocity();
    }

    increaseSpeed() {
        this.speed = Ball.HIGH_SPEED;
        this.updateVelocity();
    }

    disableFire() {
        this.setTexture("ball");
        this.emitter.frequency = -1;
    }

    enableFire() {
        this.setTexture("fire-ball");
        this.emitter.frequency = 0;
    }

}

Ball.LOW_SPEED = 200;

Ball.HIGH_SPEED = 300;
