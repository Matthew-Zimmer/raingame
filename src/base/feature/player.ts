import { feature } from "../../engine/feature";
import { spell, spell_book, spell_kind } from "../component/spell";
import { rain } from "../gameobject/rain";

export class player_feature extends feature({}) 
{
    spells: spell[] = [spell_book.rain];

    constructor(public mana: number){
        super();
    }

    
    gain_spell(kind: spell_kind, mana_cost: number){
        this.spells.push(new spell(kind, mana_cost))
    }
    use_spell(spell: spell) {
        this.use_mana(spell.mana_cost);
    }

    use_mana(mana: number){
        this.mana -= mana;
    }
    gain_mana(mana: number){
        this.mana += mana;
    }

}
