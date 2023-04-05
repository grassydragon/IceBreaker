class Platform extends Phaser.Physics.Arcade.Image {

    constructor(scene) {
        super(scene, 400, 500, "platform-center");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
        this.setCollideWorldBounds(true);

        this.body.checkCollision = {
            up: true,
            down: false,
            left: false,
            right: false
        };

        this.body.customSeparateX = true;
        this.body.customSeparateY = true;

        this.body.setSize(200, 20);

        this.leftEdge = scene.add.image(this.x - 95, this.y, "platform-edge");
        this.rightEdge = scene.add.image(this.x + 95, this.y, "platform-edge");

        this.rightEdge.flipX = true;

        scene.events.on("postupdate", this.postUpdate, this);
    }

    postUpdate() {
        let offset = this.displayWidth / 2 + 5;

        this.leftEdge.setX(this.x - offset);
        this.rightEdge.setX(this.x + offset);
    }

    reset() {
        this.x = 400;
        this.y = 500;
    }

    stop() {
        this.setVelocityX(0);
    }

    moveLeft() {
        this.setVelocityX(-400);
    }

    moveRight() {
        this.setVelocityX(400);
    }

    moveTo(x) {
        this.body.x = Phaser.Math.Clamp(x - this.body.halfWidth, 0, 800 - this.body.width);
    }

    updateBody() {
        this.body.setSize(180 + 20 / this.scaleX, 20);
        this.body.setOffset(-10 / this.scaleX, 0);
    }

    narrow() {
        this.scene.add.tween({
            targets: this,
            duration: 500,
            displayWidth: 180,
            onUpdate: this.updateBody,
            onUpdateScope: this
        });
    }

    expand() {
        this.scene.add.tween({
            targets: this,
            duration: 500,
            displayWidth: 280,
            onUpdate: this.updateBody,
            onUpdateScope: this
        });
    }

}
