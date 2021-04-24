import { asset } from "../../engine/asset";
import { ctgo } from "../../engine/ctgo";
import { engine } from "../../engine/engine";
import { gameobject } from "../../engine/gameobject";
import { point } from "../../engine/metric";
import { spell, spell_kind } from "../component/spell";
import { random_lightning_stats } from "../feature/lightning";
import { player_feature } from "../feature/player";
import { random_rain_stats } from "../feature/rain";
import { lightning } from "./lightning";
import { rain } from "./rain";

class spell_converter extends ctgo({
    rain: ({ pt }) => new rain(pt, random_rain_stats()),
    lightning: ({ pt }) => new lightning(pt, random_lightning_stats()),
}) {}


export class player extends gameobject<player_feature> {
    open: boolean = false;
    active: number = 0;
    constructor() {
        super('player', new point(0,0), { w: engine.eng.width, h: engine.eng.height / 2 }, new player_feature(0));        
    }

    start() {
        this.subscribe_to_key_down_event('b', this.toggle_spells);
    }
    
    private toggle_spells = () => {
            this.open = !this.open;
    }
    
    clicked(pt: point) {   
        const converter = new spell_converter(); 
        return converter.convert(this.active_spell(), { pt });
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        if (this.open)
            this.draw_spells(ctx);
    }
    //draw todo
    draw_spells(ctx: CanvasRenderingContext2D) {
        
    }

    active_spell() : spell{
        return this.feature.spells[this.active];
    }

    change_spell(kind: spell_kind){
        for (let i = 0; i < this.feature.spells.length; i++)
            if (this.feature.spells[i].kind === kind)
                this.active = i;
        return this.active;
    }

}