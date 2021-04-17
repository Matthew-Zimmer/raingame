import { event } from './event';

export const global_events = {
    dummy: event<() => void>(),
};