import { asset, assets } from '../../engine/asset.js';
import { engine } from '../../engine/engine.js';
import { gameobject } from '../../engine/gameobject.js';
import { point } from '../../engine/metric.js';
import { person_feature, person_stats } from '../feature/person.js';

export class person extends gameobject<person_feature> {
    private texture: asset;

    constructor(pt: point, stats: person_stats) {
        super('person', pt, { w: 0, h: 0 }, new person_feature(stats));
        this.texture = assets.get('person');
    }    

    private die = () => {
        this.texture = assets.get('dead_person');
    }

    private starve = () => {
        this.feature.starve(this.feature.passive_hunger_loss);
    }

    private try_to_pick_up = (pos: point) => {
        this.feature.walk_to(pos).execute(() => this.pos());
    }

    start() {
        this.subscribe_to_timer(1000, this.starve);

        this.feature.subscribe_to('on_death', this.die);

        this.subscribe_to('on_plant_matured', this.try_to_pick_up, () => this.feature.inv.has_space());
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx, this.collider);
    }
}