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
    napple: 10,
    framerate: 70,
    end: false,
    colors: {
        grass: ['#5FD08C', '#4AC46F'],
        dirt: ['#c49f2dff', '#a47f10ff'],
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
	apples: new Array
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
    apple_summoning(apple, game);

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
		else
		{
            apple_destruction(apple, snake, game);
            apple_summoning(apple, game);
			snake.length++;
			snake.score++;
			update_score(snake);
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