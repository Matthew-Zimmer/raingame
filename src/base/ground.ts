import { asset } from '../engine/asset.js';
import { engine } from '../engine/engine.js';
import { gameobject } from '../engine/gameobject.js';
import { point } from '../engine/metric.js';
import { random_plant_stats } from './feature/plant.js';
import { plant } from './plant.js';

export class ground extends gameobject {

    private texture: asset;

    private can_spawn_plant = true;

    constructor(pt: point) {
        super('ground', pt, { w: 64, h: 64 }, {});
        this.texture = engine.eng.assets.get('ground');
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.texture.draw(ctx, this.collider);
    }

    collided_with(other: gameobject) {
        if (other.kind === 'rain_drop') {
            engine.eng.remove(other);
            if (this.can_spawn_plant && Math.random() < 0.3) {
                engine.eng.add(new plant(other.pos().add(new point(0, -50)), random_plant_stats()));
                this.can_spawn_plant = false;
            }
        }
    }
}