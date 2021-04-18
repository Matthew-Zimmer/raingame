import { event } from "../../engine/event";
import { feature } from "../../engine/feature";
import { point } from "../../engine/metric";

export interface rain_stats {
    readonly speed: number;
}

export function random_rain_stats(): rain_stats {
}

export class rain_feature extends feature({
    
}) implements rain_stats {
    readonly speed: number;

    constructor(stats: rain_stats) {
        super();

        this.speed = stats.speed;
    }

    fall(pt: point) {
        return pt.add(new point(0, this.speed).unit());
    }
}