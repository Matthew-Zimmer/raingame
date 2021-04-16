import { asset } from '../engine/asset.js';
import { engine } from '../engine/engine.js';
import { gameobject } from '../engine/gameobject.js';
import { point } from '../engine/metric.js';

export class ground extends gameobject {

    private texture: asset;

    constructor(pt: point) {
        super('ground', pt, { w: 16, h: 16 });
        this.texture = engine.eng.assets.get('raindrop');
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx, this.collider);
    }

    collided_with(other: gameobject) {
        if (other.kind == 'rain_drop') {
            engine.eng.remove(other);
        }
    }
}