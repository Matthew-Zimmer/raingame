import { asset, assets } from "../asset";
import { gameobject } from "../gameobject";
import { point } from "../metric";

export class button extends gameobject {

    private texture: asset;

    constructor(asset_name: string, pos: point, private on_click: () => void) {
        super(`button:${asset_name}`, pos, { w: 0, h: 0 }, {});
        this.texture = assets.get(asset_name);
        this.collider.size = this.texture.size();
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.texture.draw(ctx, this.collider);
    }

    clicked() {
        this.on_click();
    }
}