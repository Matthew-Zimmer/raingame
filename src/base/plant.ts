import { asset } from '../engine/asset.js';
import { engine } from '../engine/engine.js';
import { gameobject } from '../engine/gameobject.js';
import { point } from '../engine/metric.js';
import { plant_feature, plant_stats } from './feature/plant.js';


export class plant extends gameobject<plant_feature> {
    private texture: asset;

    constructor(pt: point, stats: plant_stats) {
        super('plant',pt,{ w: 32, h: 32 }, new plant_feature(stats));
        this.texture = engine.eng.assets.get(`${this.feature.kind}_1`);   
    }

    private update_plant_texture = (stage: number) => {
        if (stage == 0) {
            this.texture = engine.eng.assets.get(`${this.feature.kind}_1`);
        }
        else if (stage == 1) {
            this.texture = engine.eng.assets.get(`${this.feature.kind}_2`);
        }
        else if (stage == 2) {
            this.texture = engine.eng.assets.get(`${this.feature.kind}_3`);
        }
    }

    start() {
        this.feature.subscribe_to("on_grow", this.update_plant_texture);
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.texture.draw(ctx, this.collider);
    }

    collided_with(g: gameobject) {
        if (g.kind === 'rain_drop') {
            this.feature.wateredd();
            engine.eng.remove(g);
        }
    }
}