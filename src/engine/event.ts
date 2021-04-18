
export function event<T>() {
    return [] as [T, number, (() => boolean)][];
}

export interface event_object {
    [x: string]: [any, number, () => boolean][];
}

export function event_server<E extends event_object>(events: E) {
    class _event_server {
        id_count: number = 0;
        private events = { ...events };
    
        subscribe_to<T extends keyof typeof events>(event: T, callback: E[T][0][0], cond = () => true) {
            const id = this.id_count++;
            this.events[event].push([callback, id, cond]);
            return id;
        }
    
        unsubscribe_from<T extends keyof typeof events>(event: T, id: number) {
            (this.events[event] as any) = this.events[event].filter(([cb, x, cond]) => id != x);
        }
    
        notify_all<T extends keyof typeof events>(event: T, executer: (cb: E[T][0][0]) => void) {
            for (const [cb, id, cond] of this.events[event])
                if (cond())
                    executer(cb);
        }
    }
    return _event_server;
}
