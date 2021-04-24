import { gameobject } from "./gameobject.js";
import { point } from "./metric.js";

export interface creation_args {
    pt: point
}

export type creation<T extends gameobject> = (args: creation_args) => T;

export interface creation_kinds {
    readonly [x: string]: creation<any>
}

export interface component<T> {
    kind: T
}

export function ctgo<K extends creation_kinds>(creations: K) {

    class _ctgo {

        private creations: K = creations;

        convert<T extends keyof K, U extends component<T>>(comp: U, args: creation_args): ReturnType<K[T]> {
            for (const ct in this.creations)
                if ((ct as any) === comp.kind)
                    return this.creations[ct](args);
            throw '';
        }
    }

    return _ctgo;
}