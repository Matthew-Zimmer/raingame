import { feature } from "../../engine/feature.js";
import { point } from "../../engine/metric.js";
import { random } from "../../engine/random.js";

export interface lightning_stats {
    readonly speed: number;
    readonly power: number;
}

export function random_lightning_stats(): lightning_stats {
    return {
        speed: random.number(15, 23),
        power: random.number(30, 44),
    };
}

export class lightning_feature extends feature({
    
}) implements lightning_stats {
    readonly speed: number;
    readonly power: number;

    constructor(stats: lightning_stats) {
        super();

        this.speed = stats.speed;
        this.power = stats.power;
    }

    fall(pt: point) {
        return pt.add(new point(0, 1).mul(this.speed));
    }

    damage() {
        return this.power;
    }
}