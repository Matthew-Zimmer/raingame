class rain {
    constructor(public x: number, public y: number) {
    }

    draw(ctx: CanvasRenderingContext2D)
    {
        ctx.drawImage(assets, this.x,this.y)
    }
    update(speed: number, wind_speed: number)
    {
        this.x -= wind_speed;
        this.y -= speed;
    }
}