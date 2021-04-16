import { spawn_world } from "./base/world.js";
import { engine } from "./engine/engine.js";

const asset_files: string[] = [
    'raindrop.png'
];

export async function start() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const width = window.screen.width;
    const height = window.screen.height;

    const eng = new engine(width, height, canvas);
    
    await eng.assets.load_images(asset_files.map(x => `assets/${x}`));

    spawn_world();

    eng.start();
}

start();