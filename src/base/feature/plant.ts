import { event, event_server } from "../../engine/event.js";
import { feature } from "../../engine/feature.js";
import { item } from './item.js';

const plant_resouces= {
    wheat: new item("wheat", 4),
    cabbage: new item("cabbage", 2)
}

export interface plant_stats {
    maturity : number;
    water: number;
    kind: keyof typeof plant_resouces;
    health: number;
}

function random_number(min: number, max: number ) {
    return Math.random() * (max - min) + min;
}

function random_int(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function random_key<T>(obj: T): keyof T {
    const keys = Object.keys(obj);
    return keys[random_int(0, keys.length)] as keyof T;
}

export function random_plant_stats(): plant_stats {
   return {
        health: random_number(1, 2),
        maturity : 3,
        water: 3,//random_number(100, 200),
        kind: random_key(plant_resouces),  
    }
}

export class plant_feature extends feature({
    'on_grow': event<(stage: number) => void>()
}) implements plant_stats
{
    growth = 0;
    watered = 0;

    maturity: number;
    kind: keyof typeof plant_resouces;
    water: number;
    health: number;

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
    }

    wateredd() {
        console.log('wateredd');
        if (++this.watered == this.water) {
            this.grow();
            this.watered = 0;
        }
    }

    grow() {
        console.log('growing');
        if (this.growth < this.maturity) {
            this.set_growth(++this.growth);
        }
    }
    
    harvest(): item | undefined {
        if (this.growth == this.maturity) {
            this.set_growth(0);
            const it = plant_resouces[this.kind];
            return { ...it, amount: it.amount * this.health };
        }
        return undefined;
    }
}