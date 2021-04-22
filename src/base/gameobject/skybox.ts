import { engine } from "../../engine/engine.js";
import { gameobject } from "../../engine/gameobject.js";
import { point } from "../../engine/metric.js";
import { random_rain_stats } from "../feature/rain.js";
import { rain } from "./rain.js";

export class skybox extends gameobject {
    constructor() {
        super('skybox', new point(0, 0), { w: engine.eng.width, h: engine.eng.height / 2 }, {});
    }

    start() {
        console.log('skybox added');
    }

    clicked(pt: point) {   
        engine.eng.add(new rain(new point(pt.x - 62, pt.y), random_rain_stats()));
    }
}