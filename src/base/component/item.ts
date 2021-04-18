export type item_kind = 'wheat' | 'cabbage';

export class item {
    constructor(public kind: item_kind, public amount: number ){
    }
}