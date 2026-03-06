const game = {
    width: 20,
    height: 20,
    dcase: 10,
    screen: new Array,
    napple: 4,
    framerate: 60,
    end: false,
    colors: {
        grass: ['#5FD08C', '#4AC46F'],
        dirt: '#D7A47F',
        snake: ['#1f5457', '#0F7173'],
        apple: '#AF0B3F',
        text: '#1A122A'
    },
    offset: 2
}

const snake = {
    x: Math.max(game.width / 4 - 1, 0),
    y: Math.max(game.height / 2 - 1, 0),
    velx: 0,
    vely: 0,
    length: 3,
    body: [],
    score: 0
}

const canvas = document.getElementById('game_screen')
const ctx = canvas.getContext('2d');

game.dcase = Math.min(window.innerWidth / (game.width + 2), window.innerHeight / (game.height + 2));
console.log(game.dcase);

canvas.width = game.width * game.dcase;
canvas.height = game.height * game.dcase;

print_game(game, snake, null, ctx, canvas)

function print_grass(game, ctx)
{
    let colorIndex = 0;
    for (let y = 0; y < game.height; y++)
    {
        for (let x = 0; x < game.width; x++)
        {
            if (colorIndex % 2 == 0)
            {
                ctx.fillStyle = game.colors.grass[0];
            }
            else
            {
                ctx.fillStyle = game.colors.grass[1];
            }
            ctx.fillRect(x*game.dcase, y*game.dcase, game.dcase + 1, game.dcase + 4);
            colorIndex++;
        }
        colorIndex++
    }
}

function print_snake(game, snake, ctx)
{
    ctx.fillStyle = game.colors.snake[0];
    ctx.fillRect(snake.x*game.dcase + game.offset, snake.y*game.dcase + game.offset, game.dcase - 2 * game.offset, game.dcase - 2 * game.offset);
    ctx.fillStyle = game.colors.snake[1];
    for (let i in snake.body)
    {
        ctx.fillRect(snake.body[i][0]*game.dcase + game.offset, snake.body[i][1]*game.dcase + game.offset, game.dcase - 2 * game.offset, game.dcase - 2 * game.offset);
    }
}

function print_apple(game, apple, ctx)
{
    ctx.fillStyle = game.colors.apple
    for (let i in apple.apples)
    {
        ctx.fillRect(apple.apples[i][0]*game.dcase, apple.apples[i][1]*game.dcase, game.dcase, game.dcase);
    }
}

function print_game(game, snake, apple, ctx, canvas)
{
    print_grass(game, ctx);
    print_snake(game, snake, ctx);
    //print_apple(game, apple, ctx);
}