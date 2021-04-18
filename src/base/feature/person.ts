import { event } from "../../engine/event";
import { feature } from "../../engine/feature";
import { point } from "../../engine/metric";
import { inventory, item, item_kind } from "../component/inventory";

export interface person_stats {
    readonly speed: number;
    readonly strength: number;
    readonly passive_hunger_loss: number;
}

export function random_person_stats(): person_stats {
}

export class person_feature extends feature({
    'on_death': event<() => void>(),
    'on_hunger_changed': event<(x: number) => void>(),
    'on_health_changed': event<(x: number) => void>(),
    'on_equipped_item_changed': event<(it: item) => void>(),
}) implements person_stats {

    readonly speed: number;
    readonly strength: number;
    readonly passive_hunger_loss: number;

    hunger: number = 100;
    health: number = 100;
    
    inv: inventory;
    equipped?: item = undefined;

    constructor(stats: person_stats) {
        super();
        this.speed = stats.speed;
        this.strength = stats.strength;
        this.passive_hunger_loss = stats.passive_hunger_loss;

        this.inv = new inventory(this.strength);
    }
    

    walk_to(des: point) {
        return {};
    }

    is_dead() {
        return this.health <= 0;
    }

    is_starving() {
        return this.hunger <= 0;
    }

    die() {
        this.health = 0;
        this.hunger = 0;
        this.inv.drop_all();
        this.notify_all('on_death', cb => cb());
    }

    collect(resource: { harvest(): item | undefined }) {
        let it: item | undefined;
        if (it = resource.harvest())
            if (it = this.inv.add(it))
                world.add_item(it);
    }

    eat(val: number) {
        this.hunger += val;
        this.notify_all('on_hunger_changed', cb => cb(val));
    }

    starve(val: number) {
        this.hunger -= val;
        this.notify_all('on_hunger_changed', cb => cb(-val));
        if (this.is_starving())
            this.injure(Math.abs(this.hunger));
    }

    regen(val: number) {
        this.health += val;
        this.notify_all('on_health_changed', cb => cb(val));
    }

    injure(val: number) {
        this.health -= val;
        this.notify_all('on_health_changed', cb => cb(-val));
        if (this.is_dead())
            this.die();
    }

    equip(kind: item_kind) {
        let it: item | undefined;
        if (it = this.inv.get(kind)) {
            this.equipped = it;
            this.notify_all('on_equipped_item_changed', cb => cb(it));
        }
    }
}