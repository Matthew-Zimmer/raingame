import { collider } from './collider.js'; 
import { engine } from './engine.js';
import { global_events } from './global_events.js';
import { point, size } from './metric.js';

let gameobject_count = 0;

export abstract class gameobject<T = any> {
    public collider: collider;

    private events: Map<keyof typeof global_events, number> = new Map();

    constructor(public kind: string, pt: point, size: size, public feature: T, public id: number = gameobject_count++) {
        this.collider = new collider(pt, size);
    }

    draw(ctx: CanvasRenderingContext2D) { }
    update(dt: number) {}
    collided_with(other: gameobject) {}
    clicked(pt: point) {}
    start() {}
    end() {}

    private _start() {}
    private _end() {
        for (const key of this.events.keys())
            this.unsubscribe_from(key);
    }

    pos() {
        return this.collider.pos;
    }

    eq(other: gameobject) {
        return this.id == other.id;
    }

    subscribe_to<U extends keyof typeof global_events>(event: U, callback: (typeof global_events)[U][0][0], cond = () => true) {
        if (this.events.has(event))
            throw `already subscribed to ${event}`;
        this.events.set(event, engine.eng.subscribe_to(event, callback, cond));
    }

    unsubscribe_from<U extends keyof typeof global_events>(event: U) {
        if (!this.events.has(event))
            throw `not subscribed to ${event}`;
        engine.eng.unsubscribe_from(event, this.events.get(event)!);
    }

    notify_all<U extends keyof typeof global_events>(event: U, executer: (cb: (typeof global_events)[U][0][0]) => void) {
        engine.eng.notify_all(event, executer);
    }
}