
export class point {
    constructor(public x: number, public y: number) {
    }

    add(pt: point) {
        return new point(this.x + pt.x, this.y + pt.y);
    } 

    sub(pt: point) {
        return new point(this.x - pt.x, this.y - pt.y);
    } 

    dot(pt: point) {
        return this.x * pt.x + this.y * pt.y;
    } 

    mul(r: number) {
        return new point(this.x * r, this.y * r);
    }
    
    div(r: number) {
        return new point(this.x / r, this.y / r);
    }

    norm() {
        return Math.sqrt(this.dot(this));
    }

    unit() {
        return this.div(this.norm());
    }
}

export class size {
    constructor(public w: number, public h: number) {
    }
}