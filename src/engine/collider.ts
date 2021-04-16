import { point, size } from './metric.js';

export class collider {
    constructor(public pos: point, public size: size) {
    }

    intersects_with(other: collider): boolean {
        const x1 = this.pos.x;
        const w1 = this.size.w;
        const y1 = this.pos.y;
        const h1 = this.size.h;
        const x2 = other.pos.x;
        const w2 = other.size.w;
        const y2 = other.pos.y;
        const h2 = other.size.h;
        return x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1;
    }

    contains(pt: point) {
        return  this.pos.x <= pt.x && 
                pt.x <= this.pos.x + this.size.w && 
                this.pos.y <= pt.y && 
                pt.y <= this.pos.y + this.size.h;
    }
}