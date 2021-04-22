import { feature } from "../../engine/feature";
import { spell, spell_book, spell_kind } from "../component/spell";
import { rain } from "../gameobject/rain";




export class player_feature extends feature({}) 
{
    active: number = 0;
    spells: spell[] = [spell_book.rain];

    constructor(public mana: number){
        super();
    }

    // active_spell() {
    //     return this.spells[this.active];
    // }
    gain_spell(kind: spell_kind, mana_cost: number){
        this.spells.push(new spell(kind, mana_cost))
    }
    use_spell(spell: spell) {
        this.use_mana(spell.mana_cost);
    }

    change_spell(kind: spell_kind){
        for(let i = 0; i < this.spells.length; i++) {
            if(this.spells[i].name === kind) {
                this.active = i;
            }
        }
        return this.active;
    }

    use_mana(mana: number){
        this.mana -= mana;
    }
    gain_mana(mana: number){
        this.mana += mana;
    }

}
