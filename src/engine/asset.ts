import { point } from './metric';

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

    draw(ctx: CanvasRenderingContext2D, pt: point) {
        ctx.drawImage(this.img, pt.x, pt.y);
    }
}

export class assets {

    private assets: Map<string, asset> = new Map();

    async load_images(files: string[]) {
        await Promise.all(files.map(x => this.load_image(x)))
    }

    private async load_image(filename: string) {
        const id = filename.split('.')[0];
        this.assets.set(id, await asset.load(filename));
    }

    get(id: string): asset {
        if (!this.assets.has(id))
            throw 'bad asset';
        return this.assets.get(id)!;
    }
}