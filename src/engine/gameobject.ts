import { collider } from './collider.js'; 
import { engine } from './engine.js';
import { frame_executer } from './frame_executer.js';
import { global_events } from './global_events.js';
import { point, size } from './metric.js';

let gameobject_count = 0;

export type key_code = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '`' | '-' | '=' | '[' | ']' | '\\' | ';' | '\'' | ',' | '.' | '/' | 'Tab' | 'Shift' | 'Backspace' | 'Enter' | 'Control' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'Space';

export abstract class gameobject<T = any> {
    public collider: collider;

    private events: Map<keyof typeof global_events, number> = new Map();

    private timer_events: Set<number> = new Set();
    private key_down_events: Map<key_code, () => void> = new Map();

    private frame_executers: frame_executer[] = [];

    constructor(public kind: string, pt: point, size: size, public feature: T, public id: number = gameobject_count++) {
        this.collider = new collider(pt, size);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = 'green';
        ctx.strokeRect(this.collider.pos.x, this.collider.pos.y, this.collider.size.w, this.collider.size.h);
        ctx.restore();
    }
    
    update(dt: number) {
        for (const fe of this.frame_executers)
            fe.execute();
        if (this.frame_executers.length)
            this.frame_executers = this.frame_executers.filter(x => !x.is_done());
    }

    collided_with(other: gameobject) {}
    clicked(pt: point) {}
    start() {}
    end() {}

    private _start() {}
    private _end() {
        for (const key of this.events.keys())
            this.unsubscribe_from(key);
        for (const id of this.timer_events)
            this.unsubscribe_from_timer(id);
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

    subscribe_to_timer(dt: number, cb: () => void) {
        this.timer_events.add(setInterval(cb, dt));
    } 

    unsubscribe_from_timer(id: number) {
        if (!this.timer_events.has(id))
            throw `cannot removed timer event with id: ${id}`;
        clearInterval(id);
        this.timer_events.delete(id);
    }

    async execute(fe: frame_executer): Promise<void> {
        this.frame_executers.push(fe);
        return new Promise<void>((resolve, reject) => {
            fe.mark_done(resolve);
        });
    }

    notify_key_down(key: key_code) {
        if (this.key_down_events.has(key))
            this.key_down_events.get(key)!();
    }

    subscribe_to_key_down_event(key: key_code, cb: () => void) {
        if (this.key_down_events.has(key))
            throw `already subscribed to key down event with key: ${key}`;
        this.key_down_events.set(key, cb);
    }

    unsubscribe_from_key_down_event(key: key_code) {
        if (!this.key_down_events.has(key))
            throw `can not unsubscribed from key down event with key: ${key}`;
        this.key_down_events.delete(key);
    }
}