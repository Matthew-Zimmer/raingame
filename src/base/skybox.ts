import { engine } from "../engine/engine.js";
import { gameobject } from "../engine/gameobject.js";
import { point } from "../engine/metric.js";
import { rain } from "./rain.js";

export class skybox extends gameobject {
    constructor() {
        super('skybox', {x: 0, y: 0}, { w: engine.eng.width, h: engine.eng.height / 2 });
    }
    clicked(pt: point) {   
        engine.eng.add(new rain({ x: pt.x - 62, y: pt.y }));
    }
}