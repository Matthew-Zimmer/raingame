import { collider } from './collider.js';
import { engine } from './engine.js';
import { point, size } from './metric.js';

export class asset {
    constructor(private img: HTMLImageElement){
    }

    static async load(filename: string) {
        const img = new Image();
        img.src = filename;
        await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject();
        });
        return new asset(img);
    }

    draw(ctx: CanvasRenderingContext2D, collider: collider) {
        ctx.drawImage(this.img, collider.pos.x, collider.pos.y, collider.size.w, collider.size.h);
    }

    size(): size {
        return { w: this.img.width, h: this.img.height };
    }
}

export class assets {

    private assets: Map<string, asset> = new Map();

    async load_images(files: string[]) {
        await Promise.all(files.map(x => this.load_image(x)))
    }

    private async load_image(filename: string) {
        const regex = /assets\/(.*)\..*/;
        if (regex.test(filename))
        {
            const id = regex.exec(filename)![1];
            this.assets.set(id, await asset.load(filename));
        }
        else
            throw 'bad filename';
    }

    get(id: string): asset {
        if (!this.assets.has(id))
            throw `bad asset: ${id}`;
        return this.assets.get(id)!;
    }

    static get(id: string) {
        return engine.eng.assets.get(id);
    }
}