import { collider } from './collider.js'; 
import { point, size } from './metric.js';

let gameobject_count = 0;

export abstract class gameobject {
    public collider: collider;

    constructor(public kind: string, pt: point, size: size, private id: number = gameobject_count++) {
        this.collider = new collider(pt, size);
    }

    draw(ctx: CanvasRenderingContext2D) { }
    update(dt: number) {}
    collided_with(other: gameobject) {}
    clicked(pt: point) {}
    start() {}
    end() {}

    pos(){
        return this.collider.pos;
    }

    eq(other: gameobject) {
        return this.id == other.id;
    }
}