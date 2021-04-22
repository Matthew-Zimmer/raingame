import { event } from './event.js';
import { point } from './metric.js';

export const global_events = {
    on_plant_matured: event<(pt: point) => Promise<void>>(),
};