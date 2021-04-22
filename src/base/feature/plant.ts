import { event, event_server } from "../../engine/event.js";
import { feature } from "../../engine/feature.js";
import { item } from '../component/item.js';
import { random } from '../../engine/random.js';

const plant_resouces= {
    wheat: new item("wheat", 4),
    cabbage: new item("cabbage", 2)
}

export interface plant_stats {
    readonly maturity : number;
    readonly water: number;
    readonly kind: keyof typeof plant_resouces;
    readonly health: number;
}

export function random_plant_stats(): plant_stats {
    return {
        health: random.number(1, 2),
        maturity : 3,
        water: 3,//random_number(100, 200),
        kind: random.key(plant_resouces),
    }
}

export class plant_feature extends feature({
    'on_grow': event<(stage: number) => void>(),
    'on_matured': event<() => void>(),
}) implements plant_stats
{
    growth = 0;
    watered = 0;

    readonly maturity: number;
    readonly kind: keyof typeof plant_resouces;
    readonly water: number;
    readonly health: number;

    constructor(stats: plant_stats) {
        super();
        this.maturity = stats.maturity;
        this.kind = stats.kind;
        this.water = stats.water;
        this.health = stats.health;
    }
    

    private set_growth(val: number){
        this.growth = val;
        this.notify_all('on_grow', cb => cb(this.growth));
        if (this.growth === this.maturity)
            this.notify_all('on_matured', cb => cb());
    }

    wateredd() {
        if (++this.watered === this.water) {
            this.grow();
            this.watered = 0;
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
            const it = plant_resouces[this.kind];
            return { ...it, amount: it.amount * this.health };
        }
        return undefined;
    }
}