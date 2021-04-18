import { item, item_kind } from './item.js';

export class slot {
    constructor(public max_amount: number, public item?: item){

    }

    can_add(it?: item): it is item {
        if (it === undefined)
            return false;
        else
            return false;
    }

    add(it: item) {
        return undefined;
    }

    has_space(): boolean {
        return this.item === undefined;
    }

    get(kind: item_kind): item | undefined {
        if (this.item === undefined)
            return undefined;
        if (this.item.kind === kind) {
            const it = this.item;
            this.item = undefined;
            return it;
        }
    }

    drop() {
        if (this.item !== undefined) {
            throw 'drop not implemented yet';
            //world.add_item(this.item);
        }
    }
}

export class inventory {

    slots: slot[];

    constructor(public size: number) {
        this.slots = [];
        for (let i = 0; i < size; i++){
            this.slots.push(new slot(100));
        }
    }

    add(it: item) {
        let i: item | undefined = it;
        for (const slot of this.slots)
            if (slot.can_add(i))
                i = slot.add(i);
        return i;
    }

    has_space(): boolean {
        return this.slots.some(x => x.has_space());
    }

    get(kind: item_kind): item | undefined {
        let it: item | undefined;
        for (const slot of this.slots)
            if (it = slot.get(kind))
                return it;
        return undefined;
    }

    drop_all() {
        for (const slot of this.slots)
            slot.drop();
    }
}