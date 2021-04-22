import { world } from "./base/gameobject/world.js";
import { engine } from "./engine/engine.js";

const asset_files: string[] = [
    'raindrop',
    'ground',
    'wheat_1',
    'wheat_2',
    'wheat_3',
    'cabbage_1',
    'cabbage_2',
    'cabbage_3',
    'the_guy',
    'dead_the_guy'
];

export async function start() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    const eng = new engine(width, height, canvas);
    
    await eng.assets.load_images(asset_files.map(x => `assets/${x}.png`));

    eng.add(new world());

    eng.start();
}

start().catch(e => console.error(e));