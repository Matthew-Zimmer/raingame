import { asset } from '../../engine/asset.js';
import { engine } from '../../engine/engine.js';
import { gameobject } from '../../engine/gameobject.js';
import { point } from '../../engine/metric.js';
import { random } from '../../engine/random.js';
import { random_plant_stats } from '../feature/plant.js';
import { random_tree_stats } from '../feature/tree.js';
import { plant } from './plant.js';
import { tree } from './tree.js';

export class ground extends gameobject {

    private texture: asset;

    private can_spawn = true;

    constructor(pt: point) {
        super('ground', pt, { w: 64, h: 64 }, {});
        this.texture = engine.eng.assets.get('ground');
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.texture.draw(ctx, this.collider);
    }

    private spawn = (g: gameobject) => {
        return () => { 
            engine.eng.add(g); 
            this.can_spawn = false;
        };
    }

    collided_with(other: gameobject) {
        if (other.kind === 'rain_drop') {
            engine.eng.remove(other);
            if (this.can_spawn) {
                random.choice([
                    [0.25, this.spawn(new plant(other.pos().add(new point(0, -50)), random_plant_stats()))],
                    [0.20, this.spawn(new tree(other.pos().add(new point(0, -50)), random_tree_stats()))],
                    [random.rest, () => {}],
                ])
            }
        }
    }
}
