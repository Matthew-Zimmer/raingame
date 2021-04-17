import { asset } from '../engine/asset.js';
import { engine } from '../engine/engine.js';
import { gameobject } from '../engine/gameobject.js';
import { point } from '../engine/metric.js';
import { item } from './item.js';




const plant_resouces= {
    wheat: new item("wheat", 2),
    cabbage: new item("cabbage", 2)
}

export class plant extends gameobject {
    private texture: asset;
    growth: number = 0;
    constructor(pt: point, public type: keyof typeof plant_resouces, public ripe: number) {
        super('plant', pt, { w: 16, h: 16 });
        this.texture = engine.eng.assets.get('plant');   
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx, this.collider);
    }

    grow()
    {
        if(this.growth + 1 < this.ripe)
        {
            this.growth++;
        }
    }
    
    harvest()
    {
        if(this.growth == this.ripe)
        {
            this.growth = 0;
            return plant_resouces[this.type];
        }
        return undefined;
    }
}