import { assets } from './asset';
import { gameobject } from './gameobject';
import { point } from './metric';


export class engine {
    private timeStamp: number = 0;
    private oldTimeStamp: number = 0;

    static eng: engine;

    private gameobjects: gameobject[] = [];

    private to_add_gameobjects: gameobject[] = [];
    private to_remove_gameobjects: gameobject[] = [];

    public assets: assets = new assets();

    private ctx: CanvasRenderingContext2D;

    constructor(public readonly width: number, public readonly height: number, canvas: HTMLCanvasElement) {
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.onclick = this.handle_click;
        this.ctx = canvas.getContext('2d')!;
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
        for (const obj of this.gameobjects)
            obj.update(dt);
    }

    private clear() {
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
        this.gameobjects.concat(this.to_add_gameobjects);
        for (const g of this.to_add_gameobjects)
            g.start();
        this.to_add_gameobjects = [];
    }

    private remove_all() {
        this.gameobjects = this.gameobjects.filter(x => !this.to_remove_gameobjects.some(y => y.eq(x)));
        for (const g of this.to_remove_gameobjects)
            g.end();
        this.to_remove_gameobjects = [];
    }

    private check_collisions() {
        for (const g1 of this.gameobjects)
            for (const g2 of this.gameobjects)
                if (!g1.eq(g2))
                    if (g1.collider.intersects_with(g2.collider))
                        g1.collided_with(g2);
    }

    private handle_click(e: MouseEvent) {
        const pt: point = { x: e.x, y: e.y };
        if (e.button != 0)
            return;
        for (const obj of this.gameobjects)
            if (obj.collider.contains(pt))
            {
                obj.clicked(pt);
                break;
            }
    }
}