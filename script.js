class Case {
    constructor(iS = false, iA = false)
    {
        this.is_snake = iS;
        this.is_apple = iA;
    }
}

const game = {
    width: 20,
    height: 20,
    dcase: 10,
    screen: new Array,
    napple: 5,
    framerate: 120,
    end: false,
    colors: {
        grass: ['#5FD08C', '#4AC46F'],
        dirt: ['#c49f2dff', '#a47f10ff'],
        snake: ['#1f5457', '#0F7173'],
        apple: '#AF0B3F',
        text: '#1A122A'
    },
    offset: 2
}

const snake = {
    x:  Math.max(game.width / 4 - 1, 0),
    y: Math.max(game.height / 2 - 1, 0),
    velx: 1,
    vely: 0,
    nvelx: 1,
    nvely: 0,
    length: 3,
    body: new Array,
    colors: ['#1a585b', '#2b6c6f', '#3b8083', '#4c9497', '#5ca7ab'],
    score: 0,
}

const apple = {
	apples: [
		[Math.max((game.width / 4 - 1) * 3, 0), Math.max(game.height / 2 - 1, 0)],
		[Math.max((game.width / 4 - 1) * 3 - 2, 0), Math.max(game.height / 2 - 3, 0)],
		[Math.max((game.width / 4 - 1) * 3 - 2, 0), Math.max(game.height / 2 + 1, 0)],
		[Math.max((game.width / 4 - 1) * 3 + 2, 0), Math.max(game.height / 2 - 3, 0)],
		[Math.max((game.width / 4 - 1) * 3 + 2, 0), Math.max(game.height / 2 + 1, 0)],
	]
}

const canvas = document.getElementById('game_screen')
const ctx = canvas.getContext('2d');
const score_span = document.getElementById('score');

game.dcase = Math.min(window.innerWidth / (game.width + 4), window.innerHeight / (game.height + 6));

canvas.width = game.width * game.dcase;
canvas.height = game.height * game.dcase + game.dcase;

snake.body = [
    [snake.x - 1, snake.y],
    [snake.x - 2, snake.y],
];

for (let pos = 0; pos < (game.width * game.height); pos++)
	game.screen[pos] = new Case();

for (let i = 0; i < snake.length - 1; i++)
	game.screen[snake.body[i][1] * game.width + snake.body[i][0]].is_snake = true;

for (let i = 0; i < game.napple; i++)
	game.screen[apple.apples[i][1] * game.width + apple.apples[i][0]].is_apple = true;

function print_grass(game, ctx)
{
    let color_index = 0;
    for (let y = 0; y < game.height; y++)
    {
        for (let x = 0; x < game.width; x++)
        {
			ctx.fillStyle = game.colors.grass[color_index % 2];
            ctx.fillRect(x*game.dcase, y*game.dcase, game.dcase + 1, game.dcase + 1);
            color_index++;
        }
        color_index++;
    }
	color_index = 0;
	for (let x = 0; x < game.width; x++)
	{
		ctx.fillStyle = game.colors.dirt[color_index % 2];
		ctx.fillRect(x*game.dcase, game.height*game.dcase, game.dcase + 1, game.dcase + 1);
		color_index++;
	}

}

function print_snake_body_part(body_part, snake, index_body, game)
{
	const offset = Math.floor(game.dcase / 4);
	const dbase = game.dcase - 2 * offset;
	const normalized_index = ((Number(index_body))**2) / ((snake.body.length)**2);
	const color_index = Math.floor((snake.colors.length - 1) * normalized_index) + 1;

	ctx.fillStyle = snake.colors[color_index];
	ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase + offset, dbase, dbase);
}


function print_snake(game, snake, ctx)
{
	const offset = Math.floor(game.dcase / 7);
	const dbase = game.dcase - 2 * offset;

	ctx.fillStyle = snake.colors[0];
	ctx.fillRect(snake.x * game.dcase + offset, snake.y * game.dcase + offset, dbase, dbase);
	for (let i in snake.body)
		print_snake_body_part(snake.body[i], snake, i, game);
}

function print_apple(game, apple, ctx)
{
	const offset = Math.floor(game.dcase / 4);
	const dbase = game.dcase - 2 * offset;

	ctx.fillStyle = game.colors.apple
	for (let i = 0; i < apple.apples.length; i++)
		ctx.fillRect(apple.apples[i][0] * game.dcase + offset, apple.apples[i][1] * game.dcase + offset, dbase, dbase);
}

function print_game(game, snake, apple, ctx)
{
	print_grass(game, ctx);
	print_snake(game, snake, ctx);
	print_apple(game, apple, ctx);
}

function press_arrow(event)
{
    switch(event.key) {
        case "ArrowUp":
            event.preventDefault();
            if (snake.vely != 1)
            {
                snake.nvelx = 0;
                snake.nvely = -1;
            }
            break;
        case "ArrowRight":
            event.preventDefault();
            if (snake.velx != -1)
            {
                snake.nvelx = 1;
                snake.nvely = 0;
            }
            break;
        case "ArrowDown":
            event.preventDefault();
            if (snake.vely != -1)
            {
                snake.nvelx = 0;
                snake.nvely = 1;
            }
            break;
        case "ArrowLeft":
            event.preventDefault();
            if (snake.velx != 1)
            {
                snake.nvelx = -1;
                snake.nvely = 0;
            }
            break;
    }
}

function update_score(snake) {
    score_span.innerHTML = snake.score;
}

document.addEventListener('keydown', event => press_arrow(event))

function move_snake()
{
    snake.body.unshift([snake.x, snake.y]);
	game.screen[snake.y * game.width + snake.x].is_snake = true;
    snake.velx = snake.nvelx;
    snake.vely = snake.nvely;
    snake.x += snake.velx;
    snake.y += snake.vely;
	if (snake.x < 0 || game.width <= snake.x || snake.y < 0 || game.height <= snake.y || game.screen[(snake.y) * game.width + snake.x].is_snake)
		game.end = true;
	else
	{
		if (!game.screen[snake.y * game.width + snake.x].is_apple)
		{
			const queue = snake.body.pop();
			game.screen[queue[1] * game.width + queue[0]].is_snake = false;
		}
		print_game(game, snake, apple, ctx, canvas);
	}
}

function game_loop()
{
	if (!game.end)
		move_snake(snake, game);
	if (game.end)
		return (0);
}

setInterval(game_loop, game.framerate);