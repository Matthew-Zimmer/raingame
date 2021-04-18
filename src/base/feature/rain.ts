import { event } from "../../engine/event.js";
import { feature } from "../../engine/feature.js";
import { point } from "../../engine/metric.js";
import { random } from "../../engine/random.js";

export interface rain_stats {
    readonly speed: number;
}

export function random_rain_stats(): rain_stats {
    return {
        speed: random.number(10, 20),
    };
}

export class rain_feature extends feature({
    
}) implements rain_stats {
    readonly speed: number;

    constructor(stats: rain_stats) {
        super();

        this.speed = stats.speed;
    }

    fall(pt: point) {
        return pt.add(new point(0, 1).mul(this.speed));
    }
}