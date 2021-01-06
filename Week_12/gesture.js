// listening => recongnize => dispatch
// new Listener( new Recoginzer(dispatch))

export class Listener {
    constructor(element, recoginzer) {
        let isListeningMouse = false
        let contentMap = new Map

        element.addEventListener("mousedown", event => {
            // event.button 左键 0；右键 2；中键 1；
            console.log('mousedown')

            let content = Object.create(null)
            contentMap.set("mouse" + (1 << event.button), content)
            recoginzer.start(event, content)

            let mousemove = event => {
                let button = 1;
                while(button <= event.buttons) {
                    if(button & event.button) {
                        // order of buttons and button property is not same
                        let key
                        if(button === 2) {
                            key = 4
                        } else if (button === 4) {
                            key = 2
                        } else {
                            key = button
                        }
                        let content = contentMap.get("mouse" + key)
                        recoginzer.move(event, content)
                    }
                    button = button << 1
                }
            }
            let mouseup = event => {
                let content = contentMap.get("mouse" + (1 << event.button))
                recoginzer.end(event, content)
                contentMap.delete("mouse" + (1 << event.button))
                if(event.buttons === 0) {

                    document.removeEventListener("mousemove", mousemove)
                    document.removeEventListener("mouseup", mouseup)
                    isListeningMouse = false
                }
            }

            if(!isListeningMouse) {
                document.addEventListener("mousemove", mousemove)
                document.addEventListener("mouseup", mouseup)
                isListeningMouse = true
            }
        })

        element.addEventListener("touchstart", event => {
            console.log('touchstart')
            for(let touch of event.changedTouches) {
                let content = Object.create(null)
                contentMap.set(touch.identifier, content)
                recoginzer.start(touch, content)
            }
        })

        element.addEventListener("touchmove", event => {
            for(let touch of event.changedTouches) {
                let content = contentMap.get(touch.identifier)
                recoginzer.move(touch, content)
            }
        })

        element.addEventListener("touchend", event => {
            for(let touch of event.changedTouches) {
                let content = contentMap.get(touch.identifier)
                recoginzer.end(touch, content)
                contentMap.delete(touch.identifier)
            }
        })

        element.addEventListener("touchcancel", event => {
            for(let touch of event.changedTouches) {
                let content = contentMap.get(touch.identifier)
                recoginzer.cancel(touch, content)
                contentMap.delete(touch.identifier)
            }
        })
    }
}

export class Recoginzer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher
    }
    start(point, content) {
        content.startX = point.clientX
        content.startY = point.clientY
    
        content.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        }];
    
    
        content.isPan = false
        content.isTap = true
        content.isPress = false

        this.dispatcher.dispatch("start", {
            clientX: point.clientX,
            clientY: point.clientY,
        });
    
        content.handler = setTimeout(() => {
            content.handler = null
            content.isPress = true
            content.isTap = false
            content.isPan = false
            this.dispatcher.dispatch("press", {});
        }, 500)
    }
    move (point, content){
        console.log('move', content)
        let dx = point.clientX - content.startX,
        dy = point.clientY - content.startY
        
        if(!content.isPan && dx**2 + dy**2 > 100) {
            content.isTap = false
            content.isPress = false
            content.isPan = true
            content.isVertical = Math.abs(dx) < Math.abs(dy)
            this.dispatcher.dispatch("panstart", {
                startX: content.startX,
                startY: content.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: content.isVertical
            })
            clearTimeout(content.handler)
        }
    
        if(content.isPan) {
            content.isPress = false
            content.isTap = false
            content.isPan = true
            this.dispatcher.dispatch("pan", {
                startX: content.startX,
                startY: content.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: Math.abs(dx) < Math.abs(dy)
            })
        }
    
        content.points = content.points.filter(point => Date.now() - point.t < 500)
        content.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        })
    }
    end(point, content) {
        if(content.isTap) {
            this.dispatcher.dispatch("tap", {})
            console.log('isTap')
            clearTimeout(content.handler)
        }
        
        if(content.isPress) {
            console.log('isPress')
            this.dispatcher.dispatch("press", {})
        }
    
        content.points = content.points.filter(point => Date.now() - point.t < 500)

        let d, v
        if(!content.points.length) {
            v = 0
        } else {
            d = Math.sqrt(( point.clientX - content.points[0].x ) ** 2 + (point.clientY - content.points[0].y) ** 2);
            v = d / (Date.now() - content.points[0].t)
        }
    
        if(v > 1.5) {
            content.isFlick = true
            console.log('isFlick')
            this.dispatcher.dispatch("flick", {
                startX: content.startX,
                startY: content.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: content.isVertical,
                isFlick: content.isFlick,
                velocity: v
            })
        } else {
            content.isFlick = false
        }

        if(content.isPan) {
            console.log('panend')
            this.dispatcher.dispatch("panend", {
                startX: content.startX,
                startY: content.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: content.isVertical,
                isFlick: content.isFlick,
                velocity: v
            })
        }
        this.dispatcher.dispatch("end", {
            startX: content.startX,
            startY: content.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            isVertical: content.isVertical,
            isFlick: content.isFlick,
            velocity: v
        })
    }
    cancel(point, content) {
        clearTimeout(content.handler)
        this.dispatcher.dispatch("cancel", {})
    }
}

export class dispatcher{
    constructor(element) {
        this.element = element
    }
    dispatch(type, properties) {
        let event = new Event(type)
        for(let name in properties) {
            event[name] = properties[name];
        }
        this.element.dispatchEvent(event);
    }
}

export function enableGesture(element) {
    new Listener(element, new Recoginzer(new dispatcher(element)));
}