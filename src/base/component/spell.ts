
export type spell_kind = 'rain' | 'lightning';

export class spell {
    constructor(public kind: spell_kind, public mana_cost: number) {
    }
}

export const spell_book= {
    rain: new spell("rain", 0),
    lightning: new spell("lightning", 3) 
};