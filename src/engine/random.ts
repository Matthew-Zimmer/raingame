
export namespace random {
    export function number(min: number, max: number ) {
        return Math.random() * (max - min) + min;
    }
    
    export function int(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    export function element<T>(arr: T[]) {
        return arr[int(0, arr.length)];
    }
    
    export function key<T>(obj: T): keyof T {
        return element(Object.keys(obj) as (keyof T)[]);
    }
}
