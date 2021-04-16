import { collider } from './collider'; 
import { point, size } from './metric';

let gameobject_count = 0;

export abstract class gameobject {
    public collider: collider;

    constructor(pt: point, size: size, private id: number = gameobject_count++) {
        this.collider = new collider(pt, size);
    }

    draw(ctx: CanvasRenderingContext2D) { }
    update(dt: number) {}
    collided_with(other: gameobject) {}
    clicked(pt: point) {}
    start() {}
    end() {}

    eq(other: gameobject) {
        return this.id == other.id;
    }
}