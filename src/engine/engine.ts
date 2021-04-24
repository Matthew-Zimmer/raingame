import { assets } from './asset.js';
import { event_server } from './event.js';
import { gameobject } from './gameobject.js';
import { global_events } from './global_events.js';
import { point } from './metric.js';

export class engine extends event_server(global_events) {
    private timeStamp: number = 0;
    private oldTimeStamp: number = 0;

    static eng: engine;

    private gameobjects: gameobject[] = [];

    private to_add_gameobjects: gameobject[] = [];
    private to_remove_gameobjects: gameobject[] = [];

    public assets: assets = new assets();

    private ctx: CanvasRenderingContext2D;

    constructor(public readonly width: number, public readonly height: number, canvas: HTMLCanvasElement) {
        super();
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.onclick = (e) => this.handle_click(e);
        canvas.onkeydown = (e) => this.handle_key_down(e);
        this.ctx = canvas.getContext('2d')!;
        engine.eng = this;
    }

    start() {
        window.requestAnimationFrame(() => this.loop());
    }

    private loop() {
        const secondsPassed = (this.timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = this.timeStamp;
        this.update(secondsPassed);
        this.check_collisions();
        if (this.to_remove_gameobjects.length)
            this.remove_all();
        if (this.to_add_gameobjects.length)
            this.add_all();
        this.clear();
        this.draw();
        window.requestAnimationFrame(() => this.loop());
    }

    private update(dt: number) {
        for (const obj of this.gameobjects)
            obj.update(dt);
    }

    private clear() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fill();
    }

    private draw() {
        for (const obj of this.gameobjects)
            obj.draw(this.ctx);
    }
    
    add(g: gameobject) {
        this.to_add_gameobjects.push(g);
    }

    remove(g: gameobject) {
        this.to_remove_gameobjects.push(g);
    }

    private add_all() {
        this.gameobjects = this.gameobjects.concat(this.to_add_gameobjects);
        for (const g of this.to_add_gameobjects) {
            g.start();
            (g as any)._start();
        }
        this.to_add_gameobjects = [];
    }

    private remove_all() {
        this.gameobjects = this.gameobjects.filter(x => !this.to_remove_gameobjects.some(y => y.eq(x)));
        for (const g of this.to_remove_gameobjects) {
            g.end();
            (g as any)._end();
        }
        this.to_remove_gameobjects = [];
    }

    private check_collisions() {
        const pairs: Map<number, Set<number>> = new Map(new Set());
        for (const g1 of this.gameobjects)
            for (const g2 of this.gameobjects)
                if (!g1.eq(g2))
                    if (g1.collider.intersects_with(g2.collider) && !pairs.get(g1.id)?.has(g2.id))
                    {
                        g1.collided_with(g2);
                        g2.collided_with(g1);
                        
                        if (pairs.has(g1.id))
                            pairs.get(g1.id)!.add(g2.id);
                        else
                            pairs.set(g1.id, new Set([g2.id]));

                        if (pairs.has(g2.id))
                            pairs.get(g2.id)!.add(g1.id);
                        else
                            pairs.set(g2.id, new Set([g1.id]));
                    }
    }

    private handle_click(e: MouseEvent) {
        const pt = new point(e.x, e.y);
        if (e.button != 0)
            return;
        for (const obj of this.gameobjects)
        {
            if (obj.collider.contains(pt))
            {
                obj.clicked(pt);
                break;
            }
        }
    }

    private handle_key_down(e: KeyboardEvent) {
    }
}