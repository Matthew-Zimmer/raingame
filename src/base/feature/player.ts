import { event } from "../../engine/event";
import { feature } from "../../engine/feature";
import { point } from "../../engine/metric";
import { spell, spell_book, spell_kind } from "../component/spell";
import { rain } from "../gameobject/rain";

export class player_feature extends feature({
    on_spell_gained: event<(spell: spell) => void>(),
    on_mana_change: event<(mana: number) => void>(),
    activate_spell_at: event<(spell: spell, pt: point) => void>(),
})
{
    spells: spell[] = [spell_book.rain];

    constructor(public mana: number){
        super();
    }

    private gain_spell(spell: spell) {
        this.spells.push(spell);
        this.notify_all('on_spell_gained',cb => cb(spell));
    }

    use_spell_at(spell: spell, pt: point) {
        if (this.mana >= spell.mana_cost) {
            this.use_mana(spell.mana_cost);
            this.notify_all('activate_spell_at', cb => cb(spell, pt));
        }
    }

    private change_mana(mana: number) {
        this.mana = mana;
        this.notify_all('on_mana_change', cb => cb(this.mana));
    }

    use_mana(mana: number) {
        this.change_mana(this.mana - mana);
    }

    gain_mana(mana: number) {
        this.change_mana(this.mana + mana);
    }

    get_spell(kind: spell_kind) {
        return this.spells.find(x => x.kind === kind);
    }
}
