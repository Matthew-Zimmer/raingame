import { engine } from "../engine/engine";
import { gameobject } from "../engine/gameobject";
import { point } from "../engine/metric";
import { rain } from "./rain";

export class skybox extends gameobject {
    constructor() {
        super({x: 0, y: 0}, { w: engine.eng.width, h: engine.eng.height / 2 });
    }
    clicked(pt: point) {
        engine.eng.add(new rain(pt));
    }
}