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
    x: game.width - 3, // Math.max(game.width / 4 - 1, 0),
    y: Math.max(game.height / 2 - 1, 0),
    velx: 0,
    vely: 0,
    length: 3,
    body: [],
    score: 0,
    max_offset: 5,
}

const canvas = document.getElementById('game_screen')
const ctx = canvas.getContext('2d');

game.dcase = Math.min(window.innerWidth / (game.width + 2), window.innerHeight / (game.height + 2));

canvas.width = game.width * game.dcase;
canvas.height = game.height * game.dcase;

snake.body = [
    [snake.x, snake.y + 1],
    [snake.x, snake.y + 2],
    [snake.x+1, snake.y + 2],
    [snake.x+1, snake.y + 1],
]

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
            ctx.fillRect(x*game.dcase, y*game.dcase, game.dcase + 1, game.dcase + 1);
            colorIndex++;
        }
        colorIndex++
    }
}

function print_snake_body_part(body_part, snake, index_body, game)
{
    const normalized_index = (Number(index_body) + 1) / snake.body.length;
    const offset = Math.floor(snake.max_offset * normalized_index);
    const dbase = game.dcase - 2 * offset;
    ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase + offset, dbase, dbase);
    if (index_body < snake.body.length - 1)
    {
        if (snake.body[Number(index_body) + 1][0] < body_part[0])
        {
            ctx.fillRect(body_part[0]*game.dcase, body_part[1]*game.dcase + offset, offset + 1, dbase);
        }
        else if (snake.body[Number(index_body) + 1][0] > body_part[0])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset + dbase - 1, body_part[1]*game.dcase + offset, offset + 1, dbase);
        }
        else if (snake.body[Number(index_body) + 1][1] < body_part[1])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase, dbase, offset + 1);
        }
        else if (snake.body[Number(index_body) + 1][1] > body_part[1])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase + offset + dbase - 1, dbase, offset + 1);
        }
    }
    if (0 < index_body)
    {
        if (snake.body[Number(index_body) - 1][0] < body_part[0])
        {
            ctx.fillRect(body_part[0]*game.dcase, body_part[1]*game.dcase + offset, offset + 1, dbase);
        }
        else if (snake.body[Number(index_body) - 1][0] > body_part[0])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset + dbase - 1, body_part[1]*game.dcase + offset, offset + 1, dbase);
        }
        else if (snake.body[Number(index_body) - 1][1] < body_part[1])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase, dbase, offset + 1);
        }
        else if (snake.body[Number(index_body) - 1][1] > body_part[1])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase + offset + dbase - 1, dbase, offset + 1);
        }
    }
    else
    {
        if (snake.x < body_part[0])
        {
            ctx.fillRect(body_part[0]*game.dcase, body_part[1]*game.dcase + offset, offset + 1, dbase);
        }
        else if (snake.x > body_part[0])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset + dbase - 1, body_part[1]*game.dcase + offset, offset + 1, dbase);
        }
        else if (snake.y < body_part[1])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase, dbase, offset + 1);
        }
        else if (snake.y > body_part[1])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase + offset + dbase - 1, dbase, offset + 1);
        }
    }
}

function print_snake(game, snake, ctx)
{
    ctx.fillStyle = game.colors.snake[0];
    ctx.fillRect(snake.x*game.dcase, snake.y*game.dcase, game.dcase, game.dcase);
    ctx.fillStyle = game.colors.snake[1];
    for (let i in snake.body)
    {
        print_snake_body_part(snake.body[i], snake, i, game);
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