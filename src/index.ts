import { engine } from "./engine/engine";

const asset_files: string[] = [
    'raindrop.png'
];

export async function main() {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const width = window.screen.width;
    const height = window.screen.height;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d')!;

    const eng = new engine(width, height, ctx);
    
    await eng.assets.load_images(asset_files.map(x => `assets/${x}`));

    eng.start();
}
