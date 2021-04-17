import { asset } from '../engine/asset.js';
import { engine } from '../engine/engine.js';
import { gameobject } from '../engine/gameobject.js';
import { point } from '../engine/metric.js';
import { random_plant_stats } from './feature/plant.js';
import { plant } from './plant.js';

export class ground extends gameobject {

    private texture: asset;

    constructor(pt: point) {
        super('ground', pt, { w: 64, h: 64 }, {});
        this.texture = engine.eng.assets.get('ground');
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx, this.collider);
    }

    collided_with(other: gameobject) {
        if (other.kind === 'rain_drop') {
            engine.eng.remove(other);
            if (Math.random() < 0.3) {
                engine.eng.add(new plant(new point(0,0), random_plant_stats()));
            }
        }
    }
}