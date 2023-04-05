class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    create(data) {
        this.controlType = data.controlType;

        let level = data.levels.splice(0, 1)[0];

        this.blocksCount = level.positions.length;

        this.multiplier = 1;
        this.score = data.score;
        this.change = 0;

        this.expandBonusTime = 0;
        this.fireBonusTime = 0;
        this.speedBonusTime = 0;

        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(400, 300, "background");

        let ballParticles = this.add.particles("fire-ball-particle");

        this.ball = new Ball(this, ballParticles);

        this.platform = new Platform(this);

        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.physics.add.collider(this.ball, this.platform, this.onPlatformCollision, null, this);

        let blockParticles = this.add.particles("block-particle");

        this.blocks = this.physics.add.staticGroup();

        this.bonuses = this.physics.add.group();

        for (let position of level.positions) {
            let block = new Block(this, blockParticles, position.x, position.y);

            block.depth = blockParticles.depth + 1;

            let bonus = block.bonus;

            if (bonus != null) {
                bonus.depth = block.depth + 1;

                this.bonuses.add(bonus);
            }

            this.blocks.add(block);
        }

        this.blockCollider = this.physics.add.collider(this.ball, this.blocks, this.onBlockCollision, null, this);

        this.physics.add.overlap(this.platform, this.bonuses, this.onBonusCollision, null, this);

        this.collisionSound = this.sound.add("collision");
        this.explosionSound = this.sound.add("explosion");
        this.powerupSound = this.sound.add("powerup");

        this.physics.world.on("worldbounds", () => {
            return this.collisionSound.play();
        });

        let homeText = this.add.text(10, 10, "Home", FontStyle.SMALL);
        homeText.setInteractive();

        OnClick.addListener(homeText, () => {
            return this.scene.start("TitleScene");
        });

        this.multiplierText = this.add.text(400, 8, "×1", FontStyle.MEDIUM);
        this.multiplierText.setOrigin(0.5, 0);

        this.scoreText = this.add.text(790, 6, "0", FontStyle.LARGE);
        this.scoreText.setOrigin(1, 0);

        this.changeText = this.add.text(790, 40, "", FontStyle.SMALL);
        this.changeText.setOrigin(1, 0);
        this.changeText.setVisible(false);

        this.changeShowTime = 0;
    }

    update(time, delta) {
        if (this.controlType === ControlType.POINTER) {
            this.platform.moveTo(this.input.activePointer.x);
        }
        if (this.controlType === ControlType.KEYBOARD) {
            if (this.left.isDown) this.platform.moveLeft();
            else if (this.right.isDown) this.platform.moveRight();
            else this.platform.stop();
        }
        else if (this.controlType === ControlType.GAMEPAD) {
            let gamepad = this.input.gamepad.pad1;

            if (gamepad) {
                if (gamepad.left) this.platform.moveLeft();
                else if (gamepad.right) this.platform.moveRight();
                else this.platform.stop();
            }
        }

        if (this.ball.y > 800) {
            if (this.controlType === ControlType.POINTER) {
                this.ball.resetTo(this.platform.x);
            }
            else {
                this.ball.reset();
                this.platform.reset();
            }

            this.multiplier = 1;

            this.updateMultiplier();

            if (this.score > 0) {
                this.change = -Math.min(this.score, 100);

                this.score += this.change;

                this.updateScore();
                this.updateChange();
            }
        }

        for (let bonus of this.bonuses.children.entries) {
            if (bonus.active && bonus.y > 610) bonus.disableBody(true, true);
        }

        if (this.expandBonusTime !== 0) {
            this.expandBonusTime -= delta;

            if (this.expandBonusTime <= 0) {
                this.expandBonusTime = 0;
                this.platform.narrow();
            }
        }

        if (this.fireBonusTime !== 0) {
            this.fireBonusTime -= delta;

            if (this.fireBonusTime <= 0) {
                this.fireBonusTime = 0;
                this.ball.disableFire();
                this.blockCollider.overlapOnly = false;
            }
        }

        if (this.speedBonusTime !== 0) {
            this.speedBonusTime -= delta;

            if (this.speedBonusTime <= 0) {
                this.speedBonusTime = 0;
                this.ball.decreaseSpeed();
            }
        }

        if (this.changeShowTime !== 0) {
            this.changeShowTime -= delta;

            if (this.changeShowTime <= 0) {
                this.changeText.setVisible(false);
            }
        }
    }

    onPlatformCollision(ball, platform) {
        ball.x -= ball.body.overlapX;
        ball.y -= ball.body.overlapY;

        let angle = (ball.x - platform.x) / this.platform.displayWidth * Math.PI / 2;

        ball.setVelocity(ball.speed * Math.sin(angle), -ball.speed * Math.cos(angle));

        this.collisionSound.play();

        this.multiplier = 1;

        this.updateMultiplier();
    }

    onBlockCollision(ball, block) {
        if (this.blockCollider.overlapOnly) {
            block.explode();

            this.explosionSound.play();
        }
        else {
            block.disappear();

            this.collisionSound.play();
        }

        let bonus = block.bonus;

        if (bonus != null) {
            bonus.enableBody(false, 0, 0, true, true);
            bonus.setVelocityY(100);
        }

        this.blocksCount--;

        if (this.blocksCount === 0) {
            this.scene.start("ScoreScene", { score: this.score, levels: this.scene.settings.data.levels });
        }

        this.change = this.multiplier * 10;

        this.score += this.change;

        this.multiplier += 1;

        this.updateMultiplier();
        this.updateScore();
        this.updateChange();
    }

    onBonusCollision(platform, bonus) {
        bonus.disableBody(true, true);

        if (bonus.bonusType === BonusType.EXPAND) {
            this.expandBonusTime = GameScene.EXPAND_BONUS_TIME;
            this.platform.expand();
        }
        else if (bonus.bonusType === BonusType.FIRE) {
            this.fireBonusTime = GameScene.FIRE_BONUS_TIME;
            this.ball.enableFire();
            this.blockCollider.overlapOnly = true;
        }
        else if (bonus.bonusType === BonusType.SPEED) {
            this.speedBonusTime = GameScene.SPEED_BONUS_TIME;
            this.ball.increaseSpeed();
        }
        
        this.powerupSound.play();
    }

    updateMultiplier() {
        this.multiplierText.setText("×" + this.multiplier);
    }

    updateScore() {
        this.scoreText.setText(this.score);
    }

    updateChange() {
        this.changeText.setText(this.change > 0 ? "+" + this.change : this.change);
        this.changeText.setVisible(true);

        this.changeShowTime = GameScene.CHANGE_SHOW_TIME;
    }

}

GameScene.EXPAND_BONUS_TIME = 10000;

GameScene.FIRE_BONUS_TIME = 10000;

GameScene.SPEED_BONUS_TIME = 10000;

GameScene.CHANGE_SHOW_TIME = 1000;
