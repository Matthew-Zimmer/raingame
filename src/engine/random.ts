
export namespace random {
    export function number(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
    
    export function int(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    export function prob() {
        return number(0, 1);
    }

    export function element<T>(arr: T[]) {
        return arr[int(0, arr.length)];
    }

    export const rest = -1;

    export function weighted_element<T>(arr: [number, T][]) {
        let weights = arr.map(x => x[0]);
        const has_rest = weights.includes(rest);
        weights = weights.filter(x => x !== rest);
        let sum = weights.reduce((x, y) => x + y, 0);
        if (has_rest)
            sum = 1;
        const num = number(0, sum);
        let tot = 0;
        for (const x of arr) {
            tot += x[0];
            if (tot >= num)
                return x[1];
        }
        return arr[0][1];
    }
    
    export function key<T>(obj: T): keyof T {
        return element(Object.keys(obj) as (keyof T)[]);
    }

    export function choice(choices: [number, () => void][]) {
        return weighted_element(choices)();
    }
}
