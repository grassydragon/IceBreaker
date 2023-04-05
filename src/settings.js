let  Settings = {
    CONTROL_TYPE_KEY: "control-type",
    HIGHSCORE_KEY: "highscore",

    get controlType() {
        let value = localStorage.getItem(Settings.CONTROL_TYPE_KEY);

        if (value == null) return ControlType.POINTER;

        return Number.parseInt(value);
    },

    set controlType(value) {
        localStorage.setItem(Settings.CONTROL_TYPE_KEY, value);
    },

    get highscore() {
        let value = localStorage.getItem(Settings.HIGHSCORE_KEY);

        if (value == null) return 0;

        return Number.parseInt(value);
    },

    set highscore(value) {
        localStorage.setItem(Settings.HIGHSCORE_KEY, value);
    }

};
