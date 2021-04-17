import { engine } from "../engine/engine.js";
import { ground } from "./ground.js";
import { skybox } from "./skybox.js";

export function spawn_world() {
    engine.eng.add(new skybox());
    for (let i = 0; i < engine.eng.width / 64; i++)
        engine.eng.add(new ground({ x: i * 64, y: engine.eng.height - 64 }));
}