import { ctgo } from "../../engine/ctgo.js";
import { engine } from "../../engine/engine.js";
import { gameobject } from "../../engine/gameobject.js";
import { point } from "../../engine/metric.js";
import { button } from "../../engine/ui/button.js";
import { spell, spell_kind } from "../component/spell.js";
import { random_lightning_stats } from "../feature/lightning.js";
import { player_feature } from "../feature/player.js";
import { random_rain_stats } from "../feature/rain.js";
import { lightning } from "./lightning.js";
import { rain } from "./rain.js";

class spell_converter extends ctgo({
    rain: ({ pt }) => new rain(pt, random_rain_stats()),
    lightning: ({ pt }) => new lightning(pt, random_lightning_stats()),
}) {}


export class player extends gameobject<player_feature> {
    open: boolean = false;
    spell_buttons: button[] = [];
    active?: spell;

    constructor() {
        super('player', new point(0, 0), { w: engine.eng.width, h: engine.eng.height / 2 }, new player_feature(0));        
    }

    start() {
        this.subscribe_to_key_down_event('b', this.toggle_spells);
        this.feature.subscribe_to('on_spell_gained', this.add_spell_button);
        this.feature.subscribe_to('activate_spell_at', this.summon_spell_at);
    }
    
    private toggle_spells = () => {
        this.open = !this.open;
    }

    private add_spell_button = (spell: spell) => {
        this.spell_buttons.push(new button(`ui_${spell.kind}`, new point(this.spell_buttons.length * 60 + 50, 50), () => this.clicked_spell_ui(spell.kind)))
    }

    private clicked_spell_ui = (kind: spell_kind) => {
        this.active = this.feature.get_spell(kind);
    }

    private summon_spell_at = (spell: spell, pt: point) => {
        const converter = new spell_converter();
        engine.eng.add(converter.convert(spell, { pt }));
    }
    
    clicked(pt: point) {   
        if (this.active)
            this.feature.use_spell_at(this.active, pt);
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        if (this.open)
            this.draw_spells(ctx);
        ctx.save();
        ctx.fillStyle = 'gray';
        ctx.fillText(`mana: ${this.feature.mana}`, 20, 20);
        ctx.restore();
    }

    draw_spells(ctx: CanvasRenderingContext2D) {
        for (const button of this.spell_buttons)
            button.draw(ctx);
    }
}