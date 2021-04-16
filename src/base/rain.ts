import { asset } from '../engine/asset.js';
import { engine } from '../engine/engine.js';
import { gameobject } from '../engine/gameobject.js';
import { point } from '../engine/metric.js';

export class rain extends gameobject {

    private texture: asset;

    constructor(pt: point) {
        super('rain_drop', pt, { w: 16, h: 16 });
        this.texture = engine.eng.assets.get('raindrop');   
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx, this.collider);
    }

    update() {
        const speed: number = 10;
        const wind_speed: number = 0;
        this.pos().x += wind_speed;
        this.pos().y += speed;
    }
}