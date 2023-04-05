class Bonus extends Phaser.Physics.Arcade.Image {

    constructor(scene, x, y, bonusType) {
        super(scene, x, y, "bonuses", bonusType);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.bonusType = bonusType;
    }

}
