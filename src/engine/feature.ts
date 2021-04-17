import { event_object, event_server } from "./event";

export function feature<E extends event_object>(events: E) {
    return event_server(events);
}