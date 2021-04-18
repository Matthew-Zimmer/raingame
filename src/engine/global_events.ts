import { event } from './event.js';

export const global_events = {
    dummy: event<() => void>(),
};