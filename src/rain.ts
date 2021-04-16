import { asset } from './engine/asset';
import { engine } from './engine/engine';
import { gameobject } from './engine/gameobject';
import { point } from './engine/metric';

export class rain extends gameobject {

    private texture: asset;

    constructor(pt: point) {
        super(pt, { w: 10, h: 10 });
        this.texture = engine.eng.assets.get('raindrop');
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx, this.pos());
    }

    update() {
        const speed: number = 0;
        const wind_speed: number = 0;
        this.pos().x += wind_speed;
        this.pos().y += speed;
    }
}