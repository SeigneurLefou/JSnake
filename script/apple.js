function apple_summoning(apple, game) {
    let freeCase = [];
    let luckyCase;
    for (let y = 0; y < game.height; y++)
    {
        for (let x = 0; x < game.width; x++)
        {
            if (game['screen'][y * game.width + x].is_apple == false
                    && game['screen'][y * game.width + x].is_snake == false)
                freeCase.push([x, y]);
        }
    }
    if (freeCase.length > 0) {
        luckyCase = freeCase[Math.floor(Math.random() * freeCase.length)];
        apple.apples.push(luckyCase);
        game.screen[luckyCase[1] * game.width + luckyCase[0]].is_apple = true;
    }
}
function apple_destruction(apple, snake, game) {
    let eating_apple;
    for (let i = apple.apples.length - 1; i >= 0; i--) {
        if (apple.apples[i][0] === snake.x && apple.apples[i][1] === snake.y) {
            eating_apple = apple.apples.splice(i, 1)[0];
            game.screen[eating_apple[1] * game.width + eating_apple[0]].is_apple = false;
        }
    }
}