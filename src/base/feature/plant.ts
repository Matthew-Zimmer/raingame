import { event } from "../../engine/event";
import { feature } from "../../engine/feature";
import { item } from './item.js';

const plant_resouces= {
    wheat: new item("wheat", 2),
    cabbage: new item("cabbage", 2)
}

export interface plant_stats {
    ripe: number;
    kind: keyof typeof plant_resouces;
}

export function random_plant_stats(): plant_stats {
    
}

export class plant_feature extends feature({
    'on_grow': event<(stage: number) => void>()
}) implements plant_stats
{
    ripe: number;
    growth = 0;
    kind: keyof typeof plant_resouces;

    constructor(stats: plant_stats) {
        super();
        this.ripe = stats.ripe;
        this.kind = stats.kind;
    }

    private set_growth(val: number){
        this.growth = val;
        this.notify_all('on_grow', cb => cb(this.growth));
    }

    grow()
    {
        if (this.growth + 1 < this.ripe)
            this.set_growth(++this.growth);
    }
    
    harvest()
    {
        if (this.growth == this.ripe) {
            this.set_growth(0);
            return plant_resouces[this.kind];
        }
        return undefined;
    }
}