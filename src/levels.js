let LEVEL_1 = {
    positions: []
};

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 4; j++) {
        let x = 120 + i * 80;
        let y = 100 + j * 40;

        LEVEL_1.positions.push({ x, y });
    }
}

let LEVEL_2 = {
    positions: []
};

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 3; j++) {
        let x = 40 + i * 80;
        let y = 100 + j * 80;

        LEVEL_2.positions.push({ x, y });
    }
}
