import { assets } from './asset';
import { gameobject } from './gameobject';


export class engine {
    private timeStamp: number = 0;
    private oldTimeStamp: number = 0;

    static eng: engine;

    private gameobjects: Map<number, gameobject> = new Map();

    private to_add_gameobjects: Map<number, gameobject> = new Map();
    private to_remove_gameobjects: Map<number, gameobject> = new Map();

    public assets: assets = new assets();

    constructor(private width: number, private height: number, private ctx: CanvasRenderingContext2D) {
        engine.eng = this;
    }

    start() {
        window.requestAnimationFrame(this.loop);
    }

    private loop() {
        const secondsPassed = (this.timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = this.timeStamp;
        this.update(secondsPassed);
        this.check_collisions();
        this.remove_all();
        this.add_all();
        this.clear();
        this.draw();
        window.requestAnimationFrame(this.loop);
    }

    private update(dt: number) {
        for (const obj of this.gameobjects.values())
            obj.update(dt);
    }

    private clear() {
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fill();
    }

    private draw() {
        for (const obj of this.gameobjects.values())
            obj.draw(this.ctx);
    }

    add(obj: gameobject) {
        const key = obj.id;
        if (this.gameobjects.has(key) || this.to_add_gameobjects.has(key))
            throw 'cannot add dup gameobject';
        if (this.to_remove_gameobjects.has(key))
            this.to_remove_gameobjects.delete(key);
        else
            this.to_add_gameobjects.set(key, obj);
    }

    remove(obj: gameobject) {
        const key = obj.id;
        if (!this.gameobjects.has(key) || this.to_remove_gameobjects.has(key))
            throw 'cannot remove non existing gameobject';
        if (this.to_add_gameobjects.has(key))
            this.to_add_gameobjects.delete(key);
        else
            this.to_remove_gameobjects.set(key, obj);
    }

    private add_all() {
        for (const [key, obj] of this.to_add_gameobjects) {
            this.gameobjects.set(key, obj);
            obj.start();
        }
        this.to_add_gameobjects.clear();
    }

    private remove_all() {
        for (const [key, obj] of this.to_remove_gameobjects) {
            this.gameobjects.delete(key);
            obj.end();
        }
        this.to_remove_gameobjects.clear();
    }

    private check_collisions() {
        for (const [key1, obj1] of this.gameobjects)
            for (const [key2, obj2] of this.gameobjects)
                if (key1 != key2)
                    if (obj1.collider.intersects_with(obj2.collider))
                        obj1.collided_with(obj2);
    }
}