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

function print_snake_body_part_join(body_part, snake, index_body, game)
{
	const offset = Math.floor(game.dcase / 6);
	const dbase = game.dcase - 2 * offset;
	const normalized_index = ((Number(index_body))**2) / ((snake.body.length)**2);
	const color_index = Math.floor((snake.colors.length - 1) * normalized_index) + 1;

	ctx.fillStyle = snake.colors[color_index];
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
            ctx.fillRect(body_part[0]*game.dcase - 1, body_part[1]*game.dcase + offset, offset + 2, dbase);
        }
        else if (snake.body[Number(index_body) - 1][0] > body_part[0])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset + dbase - 1, body_part[1]*game.dcase + offset, offset + 2, dbase);
        }
        else if (snake.body[Number(index_body) - 1][1] < body_part[1])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase - 1, dbase, offset + 2);
        }
        else if (snake.body[Number(index_body) - 1][1] > body_part[1])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase + offset + dbase - 1, dbase, offset + 2);
        }
    }
    else
    {
        if (snake.x < body_part[0])
        {
            ctx.fillRect(body_part[0]*game.dcase - 1, body_part[1]*game.dcase + offset, offset + 2, dbase);
        }
        else if (snake.x > body_part[0])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset + dbase - 1, body_part[1]*game.dcase + offset, offset + 2, dbase);
        }
        else if (snake.y < body_part[1])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase - 1, dbase, offset + 2);
        }
        else if (snake.y > body_part[1])
        {
            ctx.fillRect(body_part[0]*game.dcase + offset, body_part[1]*game.dcase + offset + dbase - 1, dbase, offset + 2);
        }
    }
}

function print_snake_head(snake, game)
{
	const offset = 0;
	const dbase = game.dcase - 2 * offset;

	ctx.fillStyle = snake.colors[0];
	ctx.fillRect(snake.x * game.dcase + offset, snake.y * game.dcase + offset, dbase, dbase);
}

function print_snake(game, snake, ctx)
{
    print_snake_head(snake, game);
	for (let i in snake.body)
		print_snake_body_part_join(snake.body[i], snake, i, game);
}

function print_apple(game, apple, ctx)
{
    // const random_offset = Math.floor(Math.random() * 3);   
	const offset = Math.floor(game.dcase / 5); // - random_offset;
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