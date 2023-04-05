class OnClick {

    static addListener(gameObject, callback) {
        let pressed = false;

        gameObject.on("pointerdown", () => {
            return pressed = true;
        });

        gameObject.on("pointerup", () => {
            if (pressed) callback();
        });

        gameObject.scene.input.on("pointerup", () => {
            return pressed = false;
        });
    }

}
