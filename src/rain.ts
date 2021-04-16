import { engine } from './engine/engine';
import { gameobject } from './engine/gameobject';
import { point } from './engine/metric';

export class rain extends gameobject {
    constructor(pt: point) {
        super(pt, { w: 10, h: 10 });
    }

    draw(ctx: CanvasRenderingContext2D)
    {
        engine.eng.assets
    }

    update()
    {
        const speed: number = 0;
        const wind_speed: number = 0;
        this.x += wind_speed;
        this.y += speed;
    }
}