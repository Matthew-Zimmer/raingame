import { point } from "./metric.js";

export class frame_executer {
    protected fc = 0;
    protected resolver?: () => void;

    constructor(protected total_frames: number, private cb: () => void){
    }

    execute() {
        this.cb();
        this.fc++;
    }

    is_done() {
        return this.fc >= this.total_frames ? (this.resolver?.(), true) : false;
    }

    mark_done(resolver: () => void) {
        this.resolver = resolver;
    }
}

export class lerp_executer extends frame_executer {
    constructor(des: point, pos: (curr?: point) => point, speed: number, cb?: (dis: number) => void) {
        const delta = des.sub(pos());
        const dis = delta.norm();
        const frames = Math.floor(dis / speed);
        const step = delta.unit().mul(speed);
        const step_size = step.norm();
        super(frames, () => {
            if (this.fc + 1 === this.total_frames) {
                cb?.(des.sub(pos()).norm());
                pos(des);
            }
            else {
                cb?.(step_size);
                pos(pos().add(step));
            }
        });
    }
}