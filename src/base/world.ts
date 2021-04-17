import { engine } from "../engine/engine.js";
import { point } from "../engine/metric.js";
import { ground } from "./ground.js";
import { skybox } from "./skybox.js";

export function spawn_world() {
    engine.eng.add(new skybox());
    for (let i = 0; i < engine.eng.width / 64; i++)
        engine.eng.add(new ground(new point(i * 64, engine.eng.height - 64)));
}