import { linear } from "./ease";

const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick_handler")
const ANIMATIONS = Symbol("animations")
const START_TIME = Symbol('start_time')
const PAUSE_START = Symbol('pause_start')
const PAUSE_TIME = Symbol('pause_time')

export class Timeline {
    constructor() {
        this.state = 'Inited';
        this[ANIMATIONS] = new Set()
        this[START_TIME] = new Map()
    }
    start() {
        if(this.state !== 'Inited') {
            return
        }
        this.state = 'started';
        let startTime = Date.now().toString()
        this[PAUSE_TIME] = 0
        this[TICK] = () => {
            let now = Date.now()
            for(let animation of this[ANIMATIONS]) {
                let t0
                if(this[START_TIME].get(animation) < startTime) {
                    t0 = now - startTime - this[PAUSE_TIME] - animation.delay
                } else {
                    // console.log('animation',animation)
                    t0 = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay
                }

                if(animation.duration < t0) {
                    console.log('tttttttt')
                    this[ANIMATIONS].delete(animation)
                    t0 = animation.duration
                }
                if(t0 > 0) {
                    animation.receiveTime(t0)
                }
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
        }
        this[TICK]();
    }

    pause() {
        if (this.state !== 'started') {
            return;
        }
        this[PAUSE_START] = Date.now()
        this.state = 'paused';
        cancelAnimationFrame(this[TICK_HANDLER])
    }
    resume() {
        if (this.state !== 'paused') {
            return;
        }
        this.state = 'started';
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
        this[TICK]();
    }

    add(animation, startTime) {
        if(arguments.length < 2) {
            startTime = Date.now()
        }
        this[ANIMATIONS].add(animation)
        this[START_TIME].set(animation, startTime)
    }
    remove() {}

    reset() {
        this.state = "Inited"
        this.pause();
        // let startTime = Date.now().toString()
        this[PAUSE_TIME] = 0;
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
        this[TICK_HANDLER] = null;
        this[PAUSE_START] = 0;
    }
}

export class Animation {
    constructor(object, property, startValue, endValue, duration, delay, timingFunction, template = (v => v)) {
        timingFunction = timingFunction || (v => v)
        template = template || (v => v)
        this.object = object,
        this.property = property,
        this.startValue = startValue,
        this.endValue = endValue,
        this.duration = duration,
        this.timingFunction = timingFunction
        this.delay = delay
        this.template = template
    }
    receiveTime(time) {
        let range = this.endValue - this.startValue
        let progress = this.timingFunction(time / this.duration)
        this.object[this.property] = this.template(this.startValue + range * progress)
    }
}

/* let tick = () => {
    let handler = requestAnimationFrame(tick)
    console.log('tick')
    // cancelAnimationFrame(handler)
} */