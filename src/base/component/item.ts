export type item_kind = 'wheat' | 'cabbage' | 'oak logs';

export class item {
    constructor(public kind: item_kind, public amount: number ){
    }
}