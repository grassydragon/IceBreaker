class Block extends Phaser.Physics.Arcade.Image {

    constructor(scene, particles, x, y) {
        super(scene, x, y, "blocks", Phaser.Math.RND.integerInRange(0, 3));

        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.emitter = particles.createEmitter({
            frequency: -1,
            speed: 40,
            alpha: {
                start: 1,
                end: 0
            }
        });

        this.bonus = null;

        let bonusType = Phaser.Math.RND.integerInRange(0, 11);

        if (bonusType < 3) {
            this.bonus = new Bonus(scene, x, y, bonusType);
            this.bonus.disableBody(true, true);
        }
    }

    disappear() {
        this.disableBody();

        this.scene.add.tween({
            targets: this,
            duration: 500,
            alpha: 0,
            onComplete: () => {
                this.setActive(false);
                this.setVisible(false);
            }
        });
    }

    explode() {
        this.disableBody(true, true);

        let emitter = this.emitter;

        for (let i = 0; i < 10; i++) {
            let x = Phaser.Math.RND.integerInRange(-35, 35);
            let y = Phaser.Math.RND.integerInRange(-15, 15);

            let angle = Math.atan2(y, x) * Phaser.Math.RAD_TO_DEG;

            emitter.setAngle(angle);

            emitter.emitParticle(1, this.x + x, this.y + y);
        }
    }

}
