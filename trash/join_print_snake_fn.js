function print_snake_body_part_join(body_part, snake, index_body, game)
{
    const normalized_index = (Math.sqrt(Number(index_body) + 1)) / Math.sqrt(snake.body.length);
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