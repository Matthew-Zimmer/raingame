import { asset } from '../../engine/asset.js';
import { engine } from '../../engine/engine.js';
import { gameobject } from '../../engine/gameobject.js';
import { point } from '../../engine/metric.js';
import { lightning_feature, lightning_stats } from '../feature/lightning.js';

export class lightning extends gameobject<lightning_feature> {

    private texture: asset;

    constructor(pt: point, stats: lightning_stats) {
        super('lightning_bolt', pt, { w: 16, h: 16 }, new lightning_feature(stats));
        this.texture = engine.eng.assets.get('lightning_bolt');   
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.texture.draw(ctx, this.collider);
    }

    // start() {
    //     this.feature.fall().execute();
    // }

    update(dt: number) {
        this.collider.pos = this.feature.fall(this.pos());
    }
}