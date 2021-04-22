import { event } from "../../engine/event.js";
import { feature } from "../../engine/feature.js";
import { item } from '../component/item.js';
import { random } from '../../engine/random.js';

const tree_resources= {
    oak: new item('oak logs', 4)
}

export interface tree_stats {
    readonly maturity : number;
    readonly water: number;
    readonly kind: keyof typeof tree_resources;
    readonly health: number;
}

export function random_tree_stats(): tree_stats {
    return {
        health: random.number(2, 4),
        maturity : 3,
        water: 3,//random_number(100, 200),
        kind: random.key(tree_resources),
    }
}

export class tree_feature extends feature({
    'on_grow': event<(stage: number) => void>(),
    'on_matured': event<() => void>(),
}) implements tree_stats
{

    growth: number = 0;
    wetness: number = 0;
    
    readonly maturity: number;
    readonly water: number;
    readonly kind: 'oak';
    readonly health: number;

    constructor(stats: tree_stats) {
        super();

        this.maturity = stats.maturity;
        this.water = stats.water;
        this.kind = stats.kind;
        this.health = stats.health;
    }
    

    private set_growth(val: number) {
        this.growth = val;
        this.notify_all('on_grow', cb => cb(this.growth));
        if (this.growth === this.maturity)
            this.notify_all('on_matured', cb => cb());
    }

    hydrate() {
        if (++this.wetness === this.water) {
            this.grow();
            this.wetness = 0;
        }
    }

    grow() {
        if (this.growth < this.maturity) {
            this.set_growth(++this.growth);
        }
    }
    
    harvest(): item | undefined {
        if (this.growth === this.maturity) {
            this.set_growth(0);
            this.wetness = 0;
            const it = tree_resources[this.kind];
            return { ...it, amount: it.amount * this.health };
        }
        return undefined;
    }
}