import { engine } from "../../engine/engine.js";
import { gameobject } from "../../engine/gameobject.js";
import { point } from "../../engine/metric.js";
import { random_person_stats } from "../feature/person.js";
import { ground } from "./ground.js";
import { person } from "./person.js";
import { player } from "./player.js";

export class world extends gameobject {
    constructor() {
        super('world', new point(0, 0), {w:0,h:0}, {});

        const w = engine.eng.width;
        const h = engine.eng.height;
        const ground_height = 64;
        const person_height = 128;

        engine.eng.add(new player());
        for (let i = 0; i < w / 64; i++)
            engine.eng.add(new ground(new point(i * 64, h - ground_height)));
        this.subscribe_to_timer(5000, () => {
            engine.eng.add(new person(new point(64, h - ground_height - person_height), random_person_stats()));
        })
    }
}