import { asset } from '../engine/asset.js';
import { engine } from '../engine/engine.js';
import { gameobject } from '../engine/gameobject.js';
import { point } from '../engine/metric.js';
import { plant_feature, plant_stats } from './feature/plant.js';


export class plant extends gameobject<plant_feature> {
    private texture: asset;

    constructor(pt: point, stats: plant_stats) {
        super('plant',pt,{ w: 16, h: 16 }, new plant_feature(stats));
        this.texture = engine.eng.assets.get('plant');   
    }

    private update_plant_texture = (stage: number) => {
        if(stage == 0)
        {
            this.texture = engine.eng.assets.get('seed');
        }
        else if(stage == 1)
        {
            this.texture = engine.eng.assets.get('plant_bud');
        }
        else if(stage == 2)
        {
            this.texture = engine.eng.assets.get('plant_ripe');
        }
        
    }

    start(){
        this.feature.subscribe_to("on_grow", this.update_plant_texture);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx, this.collider);
    }

    collided_with(g: gameobject) {
        if (g.kind === 'raindrop')
            this.feature.wateredd();
    }
}