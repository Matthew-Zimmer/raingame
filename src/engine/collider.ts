import { point, size } from './metric.js';

export class collider {
    constructor(public pos: point, public size: size) {
    }

    intersects_with(other: collider): boolean {
        const {x, y} = this.pos;
        const {w, h} = this.size;
        return [this.pos, { x: x+y, y }, { x, y: y+h }, { x:x+w, y:y+h }].some(x => other.contains(x));
    }

    contains(pt: point) {
        return  this.pos.x <= pt.x && 
                pt.x <= this.pos.x + this.size.w && 
                this.pos.y <= pt.y && 
                pt.y <= this.pos.y + this.size.h;
    }
}