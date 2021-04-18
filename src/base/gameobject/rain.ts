import { asset } from '../../engine/asset.js';
import { engine } from '../../engine/engine.js';
import { gameobject } from '../../engine/gameobject.js';
import { point } from '../../engine/metric.js';
import { rain_feature, rain_stats } from '../feature/rain.js';

export class rain extends gameobject<rain_feature> {

    private texture: asset;

    constructor(pt: point, stats: rain_stats) {
        super('rain_drop', pt, { w: 16, h: 16 }, new rain_feature(stats));
        this.texture = engine.eng.assets.get('raindrop');   
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx, this.collider);
    }

    // start() {
    //     this.feature.fall().execute();
    // }

    update(dt: number) {
        this.collider.pos = this.feature.fall(this.pos());
    }
}