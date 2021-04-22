import { asset, assets } from '../../engine/asset.js';
import { engine } from '../../engine/engine.js';
import { gameobject } from '../../engine/gameobject.js';
import { point } from '../../engine/metric.js';
import { person_feature, person_stats } from '../feature/person.js';

export class person extends gameobject<person_feature> {
    private texture: asset;

    constructor(pt: point, stats: person_stats) {
        super('person', pt, { w: 48, h: 64 }, new person_feature(stats));
        this.texture = assets.get('the_guy');
    }    

    private die = () => {
        this.texture = assets.get('dead_the_guy');
    }

    private starve = () => {
        this.feature.starve(this.feature.passive_hunger_loss);
    }

    private start_praying = async () => {
        if (this.feature.current_action === 'idle') {
            await this.execute(this.feature.pray());
            this.feature.idle();
        }
    }

    private pray = (piety: number) => {
        this.notify_all('on_prayed', cb => cb(piety));
    }

    private get_set_pos = (curr?: point) => curr ? this.collider.pos = curr : this.pos();

    private pick_up_at = async (des: point) => {
        await this.execute(this.feature.walk_to(des, this.get_set_pos));
        this.feature.idle();
    }

    start() {
        this.subscribe_to_timer(30000, this.starve);
        this.subscribe_to_timer(10000, this.start_praying);

        this.feature.subscribe_to('on_death', this.die);
        this.feature.subscribe_to('on_praying', this.pray);

        this.subscribe_to('on_plant_matured', this.pick_up_at, () => this.feature.inv.has_space() && this.feature.is_idling());
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx, this.collider);
    }
}