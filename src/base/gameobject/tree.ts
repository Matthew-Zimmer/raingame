import { asset } from '../../engine/asset.js';
import { engine } from '../../engine/engine.js';
import { gameobject } from '../../engine/gameobject.js';
import { point } from '../../engine/metric.js';
import { tree_feature, tree_stats } from '../feature/tree.js';

export class tree extends gameobject<tree_feature> {
    private texture: asset;

    constructor(pt: point, stats: tree_stats) {
        super('plant',pt,{ w: 32, h: 32 }, new tree_feature(stats));
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

    private matured = () => {
        this.notify_all('on_tree_matured', cb => cb(this.pos()));
    }

    start() {
        this.feature.subscribe_to("on_grow", this.update_plant_texture);
        this.feature.subscribe_to('on_matured', this.matured);
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.texture.draw(ctx, this.collider);
    }

    collided_with(g: gameobject) {
        if (g.kind === 'rain_drop') {
            this.feature.hydrate();
            engine.eng.remove(g);
        }
    }
}